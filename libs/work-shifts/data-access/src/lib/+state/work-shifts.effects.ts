import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/nx';
import { Effect, Actions } from '@ngrx/effects';

import { emptyPagination } from '@llstarscreamll/shared';
import { WorkShiftsPartialState } from './work-shifts.reducer';
import { PaginateWorkShifts, WorkShiftsLoaded, WorkShiftsLoadError, WorkShiftsActionTypes } from './work-shifts.actions';

@Injectable()
export class WorkShiftsEffects {
  @Effect() loadWorkShifts$ = this.dataPersistence.fetch(
    WorkShiftsActionTypes.LoadWorkShifts,
    {
      run: (action: PaginateWorkShifts, state: WorkShiftsPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new WorkShiftsLoaded(emptyPagination());
      },

      onError: (action: PaginateWorkShifts, error) => {
        console.error('Error', error);
        return new WorkShiftsLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<WorkShiftsPartialState>
  ) { }
}
