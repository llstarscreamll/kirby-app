import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { EmployeesPartialState } from './employees.reducer';
import {
  LoadEmployees,
  EmployeesLoaded,
  EmployeesLoadError,
  EmployeesActionTypes
} from './employees.actions';

@Injectable()
export class EmployeesEffects {
  @Effect() loadEmployees$ = this.dataPersistence.fetch(
    EmployeesActionTypes.LoadEmployees,
    {
      run: (action: LoadEmployees, state: EmployeesPartialState) => {
        // Your custom REST 'load' logic goes here. For now just return an empty list...
        return new EmployeesLoaded([]);
      },

      onError: (action: LoadEmployees, error) => {
        console.error('Error', error);
        return new EmployeesLoadError(error);
      }
    }
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<EmployeesPartialState>
  ) {}
}
