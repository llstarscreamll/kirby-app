import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { LoadStatus } from '@kirby/shared';

import * as reducer from './production.reducer';
import * as actions from './production.actions';
import * as selectors from './production.selectors';
import { PrinterService } from '@kirby/shared';
import { IProductionLog } from './production.models';

@Injectable()
export class ProductionFacade {
  loaded$ = this.store.pipe(select(selectors.getProductionLoaded));
  creationStatus$ = this.store.pipe(select(selectors.getCreateStatus));
  updateStatus$ = this.store.pipe(select(selectors.getUpdateStatus));
  productionLogs$ = this.store.pipe(select(selectors.getProductionLogs));
  selectedProductionLog$ = this.store.pipe(select(selectors.getSelected));
  selectedProductionLogId$ = this.store.pipe(select(selectors.getSelectedId));
  products$ = this.store.pipe(select(selectors.getProducts));
  machines$ = this.store.pipe(select(selectors.getMachines));
  customers$ = this.store.pipe(select(selectors.getCustomers));
  costCenters$ = this.store.pipe(select(selectors.getCostCenters));
  errors$ = this.store.pipe(select(selectors.getProductionError));
  pagination$ = this.store.pipe(select(selectors.getPagination));
  productionReport$ = this.store.pipe(select(selectors.getProductionReport));

  constructor(private store: Store<reducer.ProductionPartialState>, private printerService: PrinterService) {}

  dispatch(action) {
    this.store.dispatch(action);
  }

  setCreateStatus(status: LoadStatus) {
    this.store.dispatch(actions.setCreateStatus({ status }));
  }

  createProductionLog(data: any) {
    this.store.dispatch(actions.createLog({ data }));
  }

  setUpdateStatus(status: LoadStatus) {
    this.store.dispatch(actions.setUpdateStatus({ status }));
  }

  updateProductionLog(id: string, data: any) {
    this.store.dispatch(actions.updateLog({ id, data }));
  }

  updateAndPrintProductionLog(id: string, data: any) {
    this.store.dispatch(actions.updateAndPrintLog({ id, data }));
  }

  clearSelectedProductionLog() {
    this.store.dispatch(actions.getLogOk({ data: null }));
  }

  exportToCsv(data: any) {
    this.store.dispatch(actions.exportLogs({ query: data }));
  }

  createAndPrintProductionLog(data: any) {
    this.store.dispatch(actions.createAndPrintLog({ data }));
  }

  printProductionLogTicket(productionLog: IProductionLog, ops: any = {}) {
    this.store.dispatch(actions.printProductionLogTicket({ productionLog, ops }));
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

  searchCostCenters(query: any) {
    this.store.dispatch(actions.searchCostCenters({ query }));
  }

  getProductionReport(query: any) {
    this.store.dispatch(actions.getProductionReport({ query }));
  }

  isPrinterAvailable(): boolean {
    return this.printerService.isAvailable;
  }
}
