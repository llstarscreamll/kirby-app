import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as sel from './weighings.selectors';
import { actions } from './weighings.actions';

@Injectable()
export class WeighingsFacade {
  error$ = this.store.select(sel.selectError);
  vehicles$ = this.store.select(sel.selectVehicles);
  drivers$ = this.store.select(sel.selectDrivers);
  weighings$ = this.store.select(sel.selectWeighings);
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

  searchVehicles(term: string) {
    this.store.dispatch(actions.searchVehicles(term));
  }

  searchDrivers(term: string) {
    this.store.dispatch(actions.searchDrivers(term));
  }
}
