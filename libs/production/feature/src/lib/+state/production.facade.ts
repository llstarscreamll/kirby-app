import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as reducer from './production.reducer';
import * as actions from './production.actions';
import * as selectors from './production.selectors';
import { PrinterService } from '../printer.service';
import { IProductionLog } from './production.models';
import { LoadStatus } from '@kirby/shared';

@Injectable()
export class ProductionFacade {
  loaded$ = this.store.pipe(select(selectors.getProductionLoaded));
  creationStatus$ = this.store.pipe(select(selectors.getCreationStatus));
  productionLogs$ = this.store.pipe(select(selectors.getProductionLogs));
  selectedProductionLog$ = this.store.pipe(select(selectors.getSelected));
  selectedProductionLogId$ = this.store.pipe(select(selectors.getSelectedId));
  products$ = this.store.pipe(select(selectors.getProducts));
  machines$ = this.store.pipe(select(selectors.getMachines));
  customers$ = this.store.pipe(select(selectors.getCustomers));
  errors$ = this.store.pipe(select(selectors.getProductionError));

  constructor(private store: Store<reducer.ProductionPartialState>, private printerService: PrinterService) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  setCreationStatus(status: LoadStatus) {
    this.store.dispatch(actions.setCreationStatus({ status }));
  }

  createProductionLog(data: any) {
    this.store.dispatch(actions.createLog({ data }));
  }

  createAndPrintProductionLog(data: any) {
    this.store.dispatch(actions.createAndPrintLog({ data }));
  }

  printProductionLogTicket(productionLog: IProductionLog) {
    this.store.dispatch(actions.printProductionLogTicket({ productionLog }));
  }

  searchProductionLogs(query: any) {
    this.store.dispatch(actions.searchLogs({ query }));
  }

  searchProducts(query: any) {
    this.store.dispatch(actions.searchProducts({ query }));
  }

  searchMachines(query: any) {
    this.store.dispatch(actions.searchMachines({ query }));
  }

  searchCustomers(query: any) {
    this.store.dispatch(actions.searchCustomers({ query }));
  }

  isPrinterAvailable(): boolean {
    return this.printerService.isAvailable;
  }
}
