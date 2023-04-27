import { Injectable } from '@angular/core';

declare let window: any;

@Injectable()
export class PrinterService {
  private _electron: any;

  get electron(): any {
    if (!this._electron && window && window.electron) {
      this._electron = window.electron;
    }

    return this._electron;
  }

  get isAvailable(): boolean {
    return typeof this.electron !== 'undefined';
  }

  print(productionLog, ops: any = {}) {
    this.electron.printProductionLogTicket(productionLog, ops);
  }
}
