import { map } from 'rxjs/operators';
import { fetch } from '@nrwl/angular';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CostCentersService } from '../cost-centers.service';
import { costCentersActions as actions } from './cost-centers.actions';

@Injectable()
export class CostCentersEffects {
  searchCostCenters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.search),
      fetch({
        run: (action) => this.costCenterService.search(action.payload).pipe(map((result) => actions.searchOk(result))),
        onError: (_, error) => actions.searchError(error),
      })
    )
  );

  constructor(private actions$: Actions, private costCenterService: CostCentersService) {}
}
