import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { WorkShiftsPartialState } from './work-shifts.reducer';
import {
  LoadWorkShifts,
  WorkShiftsLoaded,
  WorkShiftsLoadError,
  WorkShiftsActionTypes
} from './work-shifts.actions';

@Injectable()
export class WorkShiftsEffects {
  @Effect() loadWorkShifts$ = this.dataPersistence.fetch(
    WorkShiftsActionTypes.LoadWorkShifts,
    {
      run: (action: LoadWorkShifts, state: WorkShiftsPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new WorkShiftsLoaded([]);
      },

      onError: (action: LoadWorkShifts, error) => {
        console.error('Error', error);
        return new WorkShiftsLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<WorkShiftsPartialState>
  ) {}
}
