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

  constructor(private store: Store) {}

  searchWeighings() {
    this.store.dispatch(actions.searchWeighings());
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
