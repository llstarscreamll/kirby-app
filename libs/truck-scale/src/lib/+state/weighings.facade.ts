import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { actions } from './weighings.actions';

@Injectable()
export class WeighingsFacade {
  constructor(private store: Store) {}

  searchVehicles(term: string) {
    this.store.dispatch(actions.searchVehicles(term));
  }
}
