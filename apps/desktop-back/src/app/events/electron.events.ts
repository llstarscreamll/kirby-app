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

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

// Retrieve app version
ipcMain.handle('get-app-version', (event: any) => environment.version);

// list serial ports
ipcMain.handle('get-serial-ports', async (_) => {
  return await SerialPort.list()
    .then((ports) => {
      return ports;
    })
    .catch((err) => console.error('Error reading serial ports', err));
});

/**
 * Read data from a serial port
 * Note for Linux, add the user to this groups to avoid permission errors
 * reading the ports:
 *  sudo usermod -a -G tty $USER
 *  sudo usermod -a -G dialout $USER
 */
ipcMain.handle('open-connection-and-read-data', (event, portPath, options) => {
  const port = new SerialPort({ ...options, path: portPath });

  port.on('open', () => console.log(`Port ${portPath} opened`));
  port.on('error', (err) => console.log(`Port ${portPath} errored:`, err));

  const onData = (d: Buffer) => {
    console.log('Port data coming:', d.toString('utf-8'));

    event.sender.send('port-data-available', d.toString('utf-8'));
  };

  options.ccTalkEnable === true ? port.pipe(new CCTalkParser()).on('data', onData) : port.on('data', onData);
});

ipcMain.handle('close-port-connection', (_, portPath, options) => {
  const port = new SerialPort({ path: portPath, autoOpen: false, ...options });

  if (port.isOpen) {
    console.warn(`closing ${portPath} connection`);

    port.close();
  }
});

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
      PrinterWindow.window.close();
    }

    PrinterWindow.window = new BrowserWindow({
      show: true,
      width: 840,
      height: 540,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        backgroundThrottling: false,
      },
    });

    PrinterWindow.window.setMenu(null);
    PrinterWindow.window.center();
    PrinterWindow.window.webContents.openDevTools({ mode: 'detach' });

    PrinterWindow.window.on('closed', () => {
      console.warn('destroying window');

      PrinterWindow.window = null;
    });
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

ipcMain.handle('print', (_, data, ops, company = defaultCompany) => {
  console.log('print data', data, company, ops);

  PrinterWindow.setParams(data, ops, company);
  PrinterWindow.initWindow();
  PrinterWindow.loadMainWindow();
  PrinterWindow.sendEvents();
});

ipcMain.on('close-window', () => {
  console.warn('closing window');

  PrinterWindow.window.close();
});

ipcMain.on('ticket-ready', () => {
  console.log('ticket ready');
  const ops =
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
      ...ops,
    } as WebContentsPrintOptions,
    (success, failureReason) => {
      console.log('print operation:', success, failureReason);
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
