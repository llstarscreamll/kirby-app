import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { Effect, Actions } from '@ngrx/effects';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { Pagination, emptyPagination } from '@kirby/shared';

import { EmployeesPartialState } from './employees.reducer';
import {
  SearchEmployees,
  SearchEmployeesOk,
  SearchEmployeesError,
  EmployeesActionTypes,
  SyncEmployeesByCsv,
  SyncEmployeesByCsvOk,
  SyncEmployeesByCsvError,
  GetEmployee,
  GetEmployeeOk,
  GetEmployeeError,
  UpdateEmployee,
  UpdateEmployeeOk,
  UpdateEmployeeError
} from './employees.actions';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class EmployeesEffects {
  @Effect()
  public searchEmployees$ = this.dataPersistence.fetch(
    EmployeesActionTypes.SearchEmployees,
    {
      run: (action: SearchEmployees, state: EmployeesPartialState) =>
        this.employeeService
          .search(action.payload)
          .pipe(map(apiResponse => new SearchEmployeesOk(apiResponse))),

      onError: (action: SearchEmployees, error) => {
        return new SearchEmployeesError(error);
      }
    }
  );

  @Effect()
  public getEmployee$ = this.dataPersistence.fetch(
    EmployeesActionTypes.GetEmployee,
    {
      run: (action: GetEmployee, state: EmployeesPartialState) =>
        this.employeeService
          .get(action.payload)
          .pipe(map(apiResponse => new GetEmployeeOk(apiResponse))),

      onError: (action: GetEmployee, error) => {
        return new GetEmployeeError(error);
      }
    }
  );

  @Effect()
  public updateEmployee$ = this.dataPersistence.fetch(
    EmployeesActionTypes.UpdateEmployee,
    {
      run: (action: UpdateEmployee, state: EmployeesPartialState) =>
        this.employeeService
          .update(action.payload.employeeId, action.payload.data)
          .pipe(map(apiResponse => new UpdateEmployeeOk(apiResponse))),

      onError: (action: UpdateEmployee, error) => {
        return new UpdateEmployeeError(error);
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
        return this.employeeService.syncEmployeesByCsvFile(action.payload).pipe(
          map(response => new SyncEmployeesByCsvOk()),
          tap(() =>
            this.snackBar.open(
              'Sincronización programada correctamente',
              'Ok',
              { duration: 2000 }
            )
          )
        );
      },
      onError: (action: SyncEmployeesByCsv, error) => {
        this.snackBar.open('Error programando sincronización', 'Ok', {
          duration: 2000
        });
        return new SyncEmployeesByCsvError(
          error.message || 'Error desconocido'
        );
      }
    }
  );

  constructor(
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private dataPersistence: DataPersistence<EmployeesPartialState>
  ) {}
}
