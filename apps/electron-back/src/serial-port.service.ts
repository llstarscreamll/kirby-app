// const SerialPort = require('serialport');
// const CCTalk = require('@serialport/parser-cctalk');
import { CCTalk } from '@serialport/parser-cctalk';
import { SerialPort } from 'serialport';
import { ipcRenderer } from 'electron';

const defaultOptions = {
  autoOpen: true,
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
};

export class SerialPortService {
  private openConnections = {};

  constructor() {}

  openConnection(portPath: string, options = defaultOptions) {
    const port = new SerialPort(portPath, options);
    port.on('open', () => console.log(`Open port ${portPath} success`));
    port.on('error', (err) => console.error(`Open port ${portPath} error`, err));
    // con solo este parser obtenemos los datos únicamente del momento en que
    // se estabiliza el peso o cuando se quita el pesos de la báscula, depende
    // de como esté configurada a báscula
    const parser = port.pipe(new CCTalk());
    parser.on('data', (d: Buffer) => {
      console.warn(d.toString('utf-8'));
      ipcRenderer.send('port-data-available', d.toString('utf-8'));
    });

    this.openConnections[portPath] = port;
  }
}
