import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { CostCentersPartialState } from './cost-centers.reducer';
import {
  LoadCostCenters,
  CostCentersLoaded,
  CostCentersLoadError,
  CostCentersActionTypes,
  SearchCostCenters,
  SearchCostCentersError,
  SearchCostCentersOk
} from './cost-centers.actions';
import { CostCentersService } from '../cost-centers.service';

@Injectable()
export class CostCentersEffects {
  @Effect() loadCostCenters$ = this.dataPersistence.fetch(
    CostCentersActionTypes.LoadCostCenters,
    {
      run: (action: LoadCostCenters, state: CostCentersPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new CostCentersLoaded([]);
      },

      onError: (action: LoadCostCenters, error) => {
        console.error('Error', error);
        return new CostCentersLoadError(error);
      }
    }
  );

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
