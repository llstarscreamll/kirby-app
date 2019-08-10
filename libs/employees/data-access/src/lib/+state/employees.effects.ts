import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/nx';
import { Effect, Actions } from '@ngrx/effects';
import { map } from "rxjs/internal/operators/map";
import { tap } from "rxjs/internal/operators/tap";

import { EmployeesPartialState } from './employees.reducer';
import {
  LoadEmployees,
  EmployeesLoaded,
  EmployeesLoadError,
  EmployeesActionTypes,
  SyncEmployeesByCsvFile,
  SyncEmployeesByCsvFileOk,
  SyncEmployeesByCsvFileError
} from './employees.actions';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EmployeesEffects {
  @Effect()
  public loadEmployees$ = this.dataPersistence.fetch(
    EmployeesActionTypes.LoadEmployees,
    {
      run: (action: LoadEmployees, state: EmployeesPartialState) => {
        return new EmployeesLoaded([]);
      },

      onError: (action: LoadEmployees, error) => {
        console.error('Error', error);
        return new EmployeesLoadError(error);
      }
    }
  );

  /**
   * @todo move the snack bar stuff to the feature lib
   */
  @Effect()
  public syncEmployeesByCsvFile$ = this.dataPersistence.fetch(
    EmployeesActionTypes.SyncEmployeesByCsvFile,
    {
      run: (action: SyncEmployeesByCsvFile, state: EmployeesPartialState) => {
        return this.employeeService.syncEmployeesByCsvFile(action.payload)
          .pipe(
            map(response => new SyncEmployeesByCsvFileOk),
            tap(() => this.snackBar.open('Sincronización programada correctamente', "Ok", { duration: 2000, }))
          );
      },
      onError: (action: SyncEmployeesByCsvFile, error) => {
        this.snackBar.open('Error programando sincronización', "Ok", { duration: 2000, })
        return new SyncEmployeesByCsvFileError(error.message || 'Error desconocido');
      }
    }
  );

  constructor(
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private dataPersistence: DataPersistence<EmployeesPartialState>
  ) { }
}
