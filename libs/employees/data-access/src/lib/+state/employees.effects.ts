import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { EmployeesPartialState } from './employees.reducer';
import {
  SearchEmployees,
  SearchEmployeesOk,
  SearchEmployeesError,
  EmployeesActionTypes,
  GetEmployee,
  GetEmployeeOk,
  GetEmployeeError,
  UpdateEmployee,
  UpdateEmployeeOk,
  UpdateEmployeeError,
  CreateEmployee,
  CreateEmployeeError,
  CreateEmployeeOk,
} from './employees.actions';
import { EmployeeService } from '../employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class EmployeesEffects {
  @Effect()
  searchEmployees$ = this.dataPersistence.fetch(EmployeesActionTypes.SearchEmployees, {
    run: (action: SearchEmployees, state: EmployeesPartialState) =>
      this.employeeService.search(action.payload).pipe(map((apiResponse) => new SearchEmployeesOk(apiResponse))),

    onError: (action: SearchEmployees, error) => {
      return new SearchEmployeesError(error);
    },
  });

  @Effect()
  getEmployee$ = this.dataPersistence.fetch(EmployeesActionTypes.GetEmployee, {
    run: (action: GetEmployee, state: EmployeesPartialState) =>
      this.employeeService.get(action.payload).pipe(map((apiResponse) => new GetEmployeeOk(apiResponse))),

    onError: (action: GetEmployee, error) => {
      return new GetEmployeeError(error);
    },
  });

  @Effect()
  createEmployee$ = this.dataPersistence.fetch(EmployeesActionTypes.CreateEmployee, {
    run: (action: CreateEmployee, state: EmployeesPartialState) =>
      this.employeeService.create(action.payload).pipe(map((apiResponse) => new CreateEmployeeOk(apiResponse))),

    onError: (action: CreateEmployee, error) => {
      return new CreateEmployeeError(error);
    },
  });

  @Effect({ dispatch: false })
  createEmployeeOk$ = this.dataPersistence.actions.pipe(
    ofType(EmployeesActionTypes.CreateEmployeeOk),
    tap((_) =>
      this.snackBar.open('Empleado creado correctamente', 'Ok', {
        duration: 2000,
      })
    ),
    tap((_) => this.router.navigate(['/employees']))
  );

  @Effect()
  updateEmployee$ = this.dataPersistence.fetch(EmployeesActionTypes.UpdateEmployee, {
    run: (action: UpdateEmployee, state: EmployeesPartialState) =>
      this.employeeService
        .update(action.payload.employeeId, action.payload.data)
        .pipe(map((apiResponse) => new UpdateEmployeeOk(apiResponse))),

    onError: (action: UpdateEmployee, error) => {
      return new UpdateEmployeeError(error);
    },
  });

  @Effect({ dispatch: false })
  updateEmployeeOk$ = this.dataPersistence.actions.pipe(
    ofType(EmployeesActionTypes.UpdateEmployeeOk),
    tap((_) =>
      this.snackBar.open('Datos actualizados correctamente', 'Ok', {
        duration: 2000,
      })
    ),
    tap((_) => this.router.navigate(['/employees']))
  );

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService,
    private dataPersistence: DataPersistence<EmployeesPartialState>
  ) {}
}
