import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { CostCentersPartialState } from './cost-centers.reducer';
import { costCentersQuery } from './cost-centers.selectors';
import { LoadCostCenters, SearchCostCenters } from './cost-centers.actions';

@Injectable()
export class CostCentersFacade {
  loaded$ = this.store.pipe(select(costCentersQuery.getLoaded));
  allCostCenters$ = this.store.pipe(select(costCentersQuery.getAllCostCenters));
  selectedCostCenters$ = this.store.pipe(
    select(costCentersQuery.getSelectedCostCenters)
  );

  paginatedList$ = this.store.pipe(select(costCentersQuery.getPaginated));

  constructor(private store: Store<CostCentersPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadCostCenters());
  }

  search (query: any) {
    this.store.dispatch(new SearchCostCenters(query));
  }
}
