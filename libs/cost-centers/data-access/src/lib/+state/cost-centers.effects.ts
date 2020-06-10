import { map } from 'rxjs/operators';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';

import { CostCentersPartialState } from './cost-centers.reducer';
import {
  CostCentersActionTypes,
  SearchCostCenters,
  SearchCostCentersError,
  SearchCostCentersOk
} from './cost-centers.actions';
import { CostCentersService } from '../cost-centers.service';

@Injectable()
export class CostCentersEffects {
  @Effect() searchCostCenters$ = this.dataPersistence.fetch(
    CostCentersActionTypes.SearchCostCenters,
    {
      run: (action: SearchCostCenters, state: CostCentersPartialState) =>
        this.costCenterService
          .search(action.payload)
          .pipe(map(result => new SearchCostCentersOk(result))),

      onError: (action: SearchCostCenters, error) =>
        new SearchCostCentersError(error)
    }
  );

  constructor(
    private costCenterService: CostCentersService,
    private dataPersistence: DataPersistence<CostCentersPartialState>
  ) {}
}
