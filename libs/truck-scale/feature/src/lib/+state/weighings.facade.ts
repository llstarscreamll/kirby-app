import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as sel from './weighings.selectors';
import { actions } from './weighings.actions';

@Injectable()
export class WeighingsFacade {
  error$ = this.store.select(sel.selectError);
  clients$ = this.store.select(sel.selectClients);
  drivers$ = this.store.select(sel.selectDrivers);
  vehicles$ = this.store.select(sel.selectVehicles);
  weighings$ = this.store.select(sel.selectWeighings);
  selectedWeighing$ = this.store.select(sel.selectSelectedWeighing);
  weighingsPaginationMeta$ = this.store.select(sel.selectWeighingsPaginationMeta);

  constructor(private store: Store) {}

  searchWeighings(query = {}) {
    this.store.dispatch(actions.searchWeighings(query));
  }

  exportWeighings(query = {}) {
    this.store.dispatch(actions.exportWeighings(query));
  }

  createWeighing(data: any) {
    this.store.dispatch(actions.createWeighing(data));
  }

  updateWeighing(data: any) {
    this.store.dispatch(actions.updateWeighing(data));
  }

  searchVehicles(term: string) {
    this.store.dispatch(actions.searchVehicles(term));
  }

  searchDrivers(term: string) {
    this.store.dispatch(actions.searchDrivers(term));
  }

  searchClients(term: string) {
    this.store.dispatch(actions.searchClients(term));
  }

  cleanSelected() {
    this.store.dispatch(actions.cleanSelected());
  }

  cleanErrors() {
    this.store.dispatch(actions.cleanErrors());
  }
}
