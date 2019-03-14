import { Injectable } from '@angular/core';
import { LogService, WindowService } from '@llstarscreamll/core';
import { isElectron } from '@llstarscreamll/utils';
import * as serialPort from 'serialport';

@Injectable()
export class SerialPortService {

  private connection: typeof serialPort;

  private serialPort: typeof serialPort;

  private baudRate = 9600;

  private port = '/dev/ttyUSB0';

  private connectionValue;

  public constructor(private _log: LogService, private _win: WindowService) {
    if (isElectron()) {
      this.serialPort = this._win.require('serialport');
      this._log.debug('SerialPortService ready');
    }
  }

  public initConnection() {
    this.connection = new this.serialPort(this.port, { baudRate: this.baudRate });
    let parser = this.connection.pipe(new this.serialPort.ReadLine({ delimiter: '=', encoding: 'ascii' }));
    parser.on('data', data => this.connectionValue = data);
  }

  public portsList() {
    let portsFound = [];
    this.serialPort.list((error, ports) => {
      if (error) {
        console.error(error.message);
        return;
      }

      if (ports.length === 0) {
        console.warn('No ports discovered');
      }

      portsFound = ports.filter(port => port.productId != undefined && port.vendorId != undefined);
    });

    return portsFound;
  }

  public get value(): string {
    return this.connectionValue;
  }
}
