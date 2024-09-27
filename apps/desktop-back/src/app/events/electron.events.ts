/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { join } from 'path';
import { format } from 'url';
import { SerialPort } from 'serialport';
import { CCTalkParser } from '@serialport/parser-cctalk';
import { app, ipcMain, BrowserWindow, WebContentsPrintOptions } from 'electron';

import { environment } from '../../environments/environment';

const defaultCompany = {
  name: 'GRAPAS Y PUNTILLAS EL CABALLO S.A.',
  address: 'Carrera 10A #30-07, Sogamoso - Boyacá',
  phone: '(578) 7701882',
  nit: '890203224-4',
  logoUrl: './logo-grapas-y-puntillas-el-caballo.png',
};

/**
 * This object stores the serial port connections, keys are the port and values
 * the connection instantiated objects.
 */
const connectionsMap = {};

class PrinterWindow {
  static ops: any;
  static company: any;
  static data: any;
  static window: Electron.BrowserWindow;

  static setParams(data, ops, company) {
    PrinterWindow.company = company;
    PrinterWindow.data = data;
    PrinterWindow.ops = ops;
  }

  static initWindow() {
    if (PrinterWindow.window) {
      PrinterWindow.window.removeAllListeners();
      PrinterWindow.window.close();
    }

    PrinterWindow.window = new BrowserWindow({
      alwaysOnTop: true,
      center: true,
      show: true,
      width: 840,
      height: 650,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        backgroundThrottling: false,
      },
    });

    PrinterWindow.window.setMenu(null);
    PrinterWindow.window.center();
    // PrinterWindow.window.webContents.openDevTools({ mode: 'detach' });

    PrinterWindow.window.on('closed', () => (PrinterWindow.window = null));
  }

  static loadMainWindow() {
    const template = PrinterWindow.ops?.template || 'print';

    PrinterWindow.window.loadURL(
      format({
        slashes: true,
        protocol: 'file:',
        pathname: join(__dirname, 'assets', `${template}.html`),
      })
    );
  }

  static sendEvents() {
    PrinterWindow.window.webContents.on('did-finish-load', (_) => {
      PrinterWindow.window.webContents.send('draw-data', {
        data: PrinterWindow.data,
        ops: PrinterWindow.ops,
        company: PrinterWindow.company,
      });
    });
  }
}

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle('get-app-version', (event: any) => environment.version);

// list serial ports
ipcMain.handle('get-serial-ports', async (_) => {
  return await SerialPort.list().catch((err) => console.error('Error reading serial ports', err));
});

/**
 * Read data from a serial port
 * Note for Linux, add the user to this groups to avoid permission errors
 * reading the ports:
 *  sudo usermod -a -G tty $USER
 *  sudo usermod -a -G dialout $USER
 */
ipcMain.handle('open-connection-and-read-data', (event, portPath, options) => {
  if (connectionsMap[portPath] && connectionsMap[portPath].isOpen) {
    return;
  }

  let buffer = '';
  let port = new SerialPort({ ...options, path: portPath });

  port.on('open', () => console.warn(`Port ${portPath} opened`));
  port.on('error', (err) => console.warn(`Port ${portPath} errored:`, err));

  const onData = (d: Buffer) => {
    buffer += d.toString('utf-8');

    if (buffer.includes('\n')) {
      console.warn('Incoming port data buffer:', buffer);

      event.sender.send('port-data-available', buffer);
      buffer = buffer.slice(0, 0);
    }
  };

  options.ccTalkEnable === true ? port.pipe(new CCTalkParser()).on('data', onData) : port.on('data', onData);

  connectionsMap[portPath] = port;
});

ipcMain.handle('close-port-connection', (_, portPath, options) => {
  const port = connectionsMap[portPath];

  if (port && port.isOpen) {
    console.warn(`closing ${portPath} connection`);

    port.close(() => delete connectionsMap[portPath]);
  }
});

ipcMain.handle('print', (_, data, ops, company = defaultCompany) => {
  PrinterWindow.setParams(data, ops, company);
  PrinterWindow.initWindow();
  PrinterWindow.loadMainWindow();
  PrinterWindow.sendEvents();
});

ipcMain.on('close-window', () => {
  PrinterWindow.window.close();
});

ipcMain.on('ticket-ready', () => {
  console.warn('ticket ready, printing!');
  const printOptions =
    PrinterWindow.ops?.template === 'weighing'
      ? {}
      : {
          pageSize: { height: 10 * 10000, width: 10 * 10000 },
          margins: { marginType: 'custom', top: 1, bottom: 1, right: 1, left: 1 },
        };

  PrinterWindow.window.webContents.print(
    {
      silent: true,
      color: false,
      scaleFactor: 100,
      printBackground: false,
      ...printOptions,
    } as WebContentsPrintOptions,
    (success, failureReason) => {
      console.warn('print operation:', success, failureReason);
    }
  );
});

ipcMain.handle('old-print', (event, productionLog: any, company = defaultCompany) => {
  const win = new BrowserWindow({
    show: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false,
    },
  });

  win.loadURL(
    format({
      slashes: true,
      protocol: 'file:',
      pathname: join(__dirname, 'assets', 'print.html'),
    })
  );

  ipcMain.on('ticket-ready', () => {
    win.webContents.print(
      {
        silent: true,
        color: false,
        scaleFactor: 100,
        printBackground: false,
        margins: { marginType: 'custom', top: 5, bottom: 5, right: 5, left: 5 },
        pageSize: { height: 10 * 10000, width: 10 * 10000 },
      },
      () => {
        win.removeAllListeners();
        win.destroy();
      }
    );
  });

  win.webContents.on('did-finish-load', (event) => {
    win.webContents.send('draw-data', { productionLog, company });
  });
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
