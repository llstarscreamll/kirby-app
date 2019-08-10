import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/nx';
import { Effect, Actions } from '@ngrx/effects';
import { map } from "rxjs/internal/operators/map";
import { tap } from "rxjs/internal/operators/tap";
import { Pagination, emptyPagination } from "@llstarscreamll/shared";

import { EmployeesPartialState } from './employees.reducer';
import {
  SearchEmployees,
  SearchEmployeesOk,
  SearchEmployeesError,
  EmployeesActionTypes,
  SyncEmployeesByCsv,
  SyncEmployeesByCsvOk,
  SyncEmployeesByCsvError
} from './employees.actions';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EmployeesEffects {
  @Effect()
  public loadEmployees$ = this.dataPersistence.fetch(
    EmployeesActionTypes.SearchEmployees,
    {
      run: (action: SearchEmployees, state: EmployeesPartialState) => this.employeeService
        .search(action.payload)
        .pipe(map(apiResponse => new SearchEmployeesOk(apiResponse))),

      onError: (action: SearchEmployees, error) => {
        console.error('Error', error);
        return new SearchEmployeesError(error);
      }
    }
  );

  /**
   * @todo move the snack bar stuff to the feature lib
   */
  @Effect()
  public syncEmployeesByCsvFile$ = this.dataPersistence.fetch(
    EmployeesActionTypes.SyncEmployeesByCsv,
    {
      run: (action: SyncEmployeesByCsv, state: EmployeesPartialState) => {
        return this.employeeService.syncEmployeesByCsvFile(action.payload)
          .pipe(
            map(response => new SyncEmployeesByCsvOk),
            tap(() => this.snackBar.open('Sincronización programada correctamente', "Ok", { duration: 2000, }))
          );
      },
      onError: (action: SyncEmployeesByCsv, error) => {
        this.snackBar.open('Error programando sincronización', "Ok", { duration: 2000, })
        return new SyncEmployeesByCsvError(error.message || 'Error desconocido');
      }
    }
  );

  constructor(
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private dataPersistence: DataPersistence<EmployeesPartialState>
  ) { }
}
