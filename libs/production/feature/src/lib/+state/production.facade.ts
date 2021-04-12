import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as reducer from './production.reducer';
import * as selectors from './production.selectors';
import * as actions from './production.actions';

@Injectable()
export class ProductionFacade {
  loaded$ = this.store.pipe(select(selectors.getProductionLoaded));
  creationStatus$ = this.store.pipe(select(selectors.getCreationStatus));
  productionLogs$ = this.store.pipe(select(selectors.getAllProductionLogs));
  selectedProductionLogId$ = this.store.pipe(select(selectors.getSelected));
  products$ = this.store.pipe(select(selectors.getProducts));
  machines$ = this.store.pipe(select(selectors.getMachines));
  customers$ = this.store.pipe(select(selectors.getCustomers));
  errors$ = this.store.pipe(select(selectors.getProductionError));

  constructor(private store: Store<reducer.ProductionPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
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

  createProductionLog(data: any) {
    this.store.dispatch(actions.createLog({ data }));
  }
}
