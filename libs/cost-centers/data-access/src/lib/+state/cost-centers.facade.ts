import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { SearchCostCenters } from './cost-centers.actions';
import { costCentersQuery } from './cost-centers.selectors';
import { CostCentersPartialState } from './cost-centers.reducer';

@Injectable()
export class CostCentersFacade {
  paginatedList$ = this.store.pipe(select(costCentersQuery.getPaginated));

  constructor(private store: Store<CostCentersPartialState>) {}

  search(query: any) {
    this.store.dispatch(new SearchCostCenters(query));
  }
}
