/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { join } from 'path';
import { format } from 'url';
import { SerialPort } from 'serialport';
import { app, ipcMain, BrowserWindow } from 'electron';
import { CCTalkParser } from '@serialport/parser-cctalk';
import { environment } from '../../environments/environment';

const defaultCompany = {
  name: 'GRAPAS Y PUNTILLAS EL CABALLO S.A.',
  address: 'Sogamoso Carrera 10A #30-07',
  phone: '(578) 7701882',
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
  console.log('Listing serial ports');

  return await SerialPort.list()
    .then((ports) => {
      console.log('ports available', ports);
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

class PrinterWindow {
  static ops: any;
  static company: any;
  static productionLog: any;
  static window: Electron.BrowserWindow;

  static setParams(productionLog, ops, company) {
    PrinterWindow.company = company;
    PrinterWindow.productionLog = productionLog;
    PrinterWindow.ops = ops;
  }

  static initWindow() {
    if (PrinterWindow.window) {
      PrinterWindow.window.close();
    }

    PrinterWindow.window = new BrowserWindow({
      show: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        backgroundThrottling: false,
      },
    });

    PrinterWindow.window.setMenu(null);
    PrinterWindow.window.center();
    // PrinterWindow.window.webContents.openDevTools();

    PrinterWindow.window.on('closed', () => {
      console.warn('destroying window');

      PrinterWindow.window = null;
    });
  }

  static loadMainWindow() {
    PrinterWindow.window.loadURL(
      format({
        slashes: true,
        protocol: 'file:',
        pathname: join(__dirname, 'assets', 'print.html'),
      })
    );
  }

  static sendEvents() {
    PrinterWindow.window.webContents.on('did-finish-load', (event) => {
      PrinterWindow.window.webContents.send('draw-data', {
        productionLog: PrinterWindow.productionLog,
        ops: PrinterWindow.ops,
        company: PrinterWindow.company,
      });
    });
  }
}

ipcMain.handle('print', (event, productionLog, ops, company = defaultCompany) => {
  console.warn('log', productionLog, company, ops);

  PrinterWindow.setParams(productionLog, ops, company);
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

  PrinterWindow.window.webContents.print(
    {
      silent: true,
      color: false,
      scaleFactor: 100,
      printBackground: false,
      pageSize: { height: 10 * 10000, width: 10 * 10000 },
      margins: { marginType: 'custom', top: 1, bottom: 1, right: 1, left: 1 },
    },
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
