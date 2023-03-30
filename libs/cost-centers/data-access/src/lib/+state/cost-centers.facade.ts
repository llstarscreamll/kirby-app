import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { CostCentersState } from './cost-centers.reducer';
import * as query from './cost-centers.selectors';
import { costCentersActions as actions } from './cost-centers.actions';

@Injectable()
export class CostCentersFacade {
  paginatedList$ = this.store.pipe(select(query.getPaginated));

  constructor(private store: Store<CostCentersState>) {}

  search(query: any) {
    this.store.dispatch(actions.search({ query }));
  }
}
