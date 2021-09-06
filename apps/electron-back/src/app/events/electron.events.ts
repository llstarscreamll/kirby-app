/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { join } from 'path';
import { format } from 'url';
const SerialPort = require('serialport');
const CCTalk = require('@serialport/parser-cctalk');
import { app, ipcMain, BrowserWindow } from 'electron';
import { environment } from '../../environments/environment';

const defaultCompany = {
  name: 'Grapas y Puntillas el Caballo S.A.S',
  address: 'Sogamoso Carrera 10A #30-07',
  phone: '(578) 7701882 Fax (570) 7704666',
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

  return await SerialPort.list().then((ports, err) => {
    if (err) {
      console.error('Error reading serial ports');
      return err;
    }

    return ports;
  });
});

/**
 * Read data from a serial port
 * Note for Linux, add the user to this groups to avoid permission errors
 * reading the ports:
 *  sudo usermod -a -G tty $USER
 *  sudo usermod -a -G dialout $USER
 */
ipcMain.handle('open-connection-and-read-data', (event, portPath, options) => {
  const port = new SerialPort(portPath, options);

  port.on('open', () => console.log(`Port ${portPath} open`));
  port.on('error', (err) => console.log(`Port ${portPath} error:`, err));
  port.pipe(new CCTalk()).on('data', (d: Buffer) => {
    console.log('Port data available:', d.toString('utf-8'));

    event.sender.send('port-data-available', d.toString('utf-8'));
  });
});

class PrinterWindow {
  static company: any;
  static productionLog: any;
  static window: Electron.BrowserWindow;

  static setParams(productionLog, company) {
    PrinterWindow.company = company;
    PrinterWindow.productionLog = productionLog;
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
        enableRemoteModule: false,
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
    // PrinterWindow.window.webContents.removeAllListeners();
    PrinterWindow.window.webContents.on('did-finish-load', (event) => {
      PrinterWindow.window.webContents.send('draw-data', {
        productionLog: PrinterWindow.productionLog,
        company: PrinterWindow.company,
      });
    });
  }
}

ipcMain.handle('print', (event, productionLog, company = defaultCompany) => {
  PrinterWindow.setParams(productionLog, company);
  PrinterWindow.initWindow();
  PrinterWindow.loadMainWindow();
  PrinterWindow.sendEvents();
});

ipcMain.on('ticket-ready', () => {
  console.log('ticket ready');

  PrinterWindow.window.webContents.print(
    {
      silent: true,
      color: false,
      scaleFactor: 100,
      printBackground: false,
      margins: { marginType: 'custom', top: 5, bottom: 5, right: 5, left: 5 },
      pageSize: { height: 10 * 10000, width: 10 * 10000 },
    },
    () => {
      console.log('print ok');
    }
  );
});

ipcMain.handle('old-print', (event, productionLog: any, company = defaultCompany) => {
  const win = new BrowserWindow({
    show: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: false,
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
