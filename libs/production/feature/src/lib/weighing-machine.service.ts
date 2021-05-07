import { from, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

declare let window: any;

interface SerialPort {
  vendorId?: string;
  productId?: string;
  path: string;
}

@Injectable()
export class WeighingMachineService {
  private _electron: any;
  data$ = new Subject();

  get electron(): any {
    if (!this._electron && window && window.electron) {
      this._electron = window.electron;
      return this._electron;
    }

    return this._electron;
  }

  get isAvailable(): boolean {
    return typeof this.electron !== 'undefined';
  }

  /**
   * List non empty serial ports.
   */
  listSerialPorts() {
    return from(this.electron.getSerialPorts()).pipe(
      map((ports: SerialPort[]) => ports.filter((p) => p.vendorId && p.productId))
    );
  }

  openConnection(portPath, func) {
    // @todo: la opciones de conexión deberían ser dinámicas, otorgadas por el
    // usuario según como tenga configurado el dispositivo
    this.electron.readData(portPath, {
      autoOpen: true,
      baudRate: 9600,
      dataBits: 8,
      stopBits: 1,
      parity: 'none',
    });
    this.electron.onPortData((data) => func(cleanData(data)));
  }
}

function cleanData(data = '') {
  return data
    .trim()
    .split('\n')
    .map((line) =>
      line
        .trim()
        .split(' ')
        .filter((p) => p !== '')
        .join('')
    )[1];
}
