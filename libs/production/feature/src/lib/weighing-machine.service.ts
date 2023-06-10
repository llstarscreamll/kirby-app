import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from '@kirby/shared';

declare let window: any;

interface SerialPort {
  path: string;
  vendorId?: string;
  productId?: string;
}

@Injectable()
export class WeighingMachineService {
  private _electron: any;
  private localStorage = Inject(LocalStorageService);

  get electron(): any {
    if (!this._electron && window && window.electron) {
      this._electron = window.electron;
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

  setSelectedPort(port: string) {
    this.localStorage.setItem('SerialPortConfig', { selected: port });
  }

  getSelectedPort(): string {
    const config = this.localStorage.getItem('SerialPortConfig');

    return config.selected || '';
  }

  isPortSelected(): boolean {
    return this.getSelectedPort() !== '';
  }

  /**
   * Opens a connection to the current selected port.
   */
  openConnection(func) {
    // @todo: la opciones de conexión deberían ser dinámicas, otorgadas por el
    // usuario según como tenga configurado el dispositivo
    this.electron.readData(this.getSelectedPort(), {
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
