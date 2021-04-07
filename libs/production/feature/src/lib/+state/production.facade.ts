import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromProduction from './production.reducer';
import * as ProductionSelectors from './production.selectors';

@Injectable()
export class ProductionFacade {
  loaded$ = this.store.pipe(select(ProductionSelectors.getProductionLoaded));
  allProduction$ = this.store.pipe(select(ProductionSelectors.getAllProduction));
  selectedProduction$ = this.store.pipe(select(ProductionSelectors.getSelected));

  constructor(private store: Store<fromProduction.ProductionPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
