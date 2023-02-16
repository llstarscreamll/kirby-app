import { map } from 'rxjs/operators';
import { fetch } from '@nrwl/angular';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  CostCentersActionTypes,
  SearchCostCenters,
  SearchCostCentersError,
  SearchCostCentersOk,
} from './cost-centers.actions';
import { CostCentersService } from '../cost-centers.service';
import { CostCentersPartialState } from './cost-centers.reducer';

@Injectable()
export class CostCentersEffects {
  searchCostCenters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CostCentersActionTypes.SearchCostCenters),
      fetch({
        run: (action: SearchCostCenters, state: CostCentersPartialState) =>
          this.costCenterService.search(action.payload).pipe(map((result) => new SearchCostCentersOk(result))),

        onError: (action: SearchCostCenters, error) => new SearchCostCentersError(error),
      })
    )
  );

  constructor(private actions$: Actions, private costCenterService: CostCentersService) {}
}
