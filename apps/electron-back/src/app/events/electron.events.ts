/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { app, ipcMain } from 'electron';
const SerialPort = require('serialport');
const CCTalk = require('@serialport/parser-cctalk');
import { environment } from '../../environments/environment';

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

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
