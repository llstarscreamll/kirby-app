import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { fetch } from '@nrwl/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import {
  CreateEmployee,
  CreateEmployeeError,
  CreateEmployeeOk,
  EmployeesActionTypes,
  GetEmployee,
  GetEmployeeError,
  GetEmployeeOk,
  SearchEmployees,
  SearchEmployeesError,
  SearchEmployeesOk,
  SearchRoles,
  SearchRolesError,
  SearchRolesOk,
  UpdateEmployee,
  UpdateEmployeeError,
  UpdateEmployeeOk,
} from './employees.actions';
import { EmployeeService } from '../employee.service';
import { EmployeesPartialState } from './employees.reducer';

@Injectable()
export class EmployeesEffects {
  searchEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActionTypes.SearchEmployees),
      fetch({
        run: (action: SearchEmployees, state: EmployeesPartialState) =>
          this.employeeService.search(action.payload).pipe(map((apiResponse) => new SearchEmployeesOk(apiResponse))),

        onError: (action: SearchEmployees, error) => {
          return new SearchEmployeesError(error);
        },
      })
    )
  );

  getEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActionTypes.GetEmployee),
      fetch({
        run: (action: GetEmployee, state: EmployeesPartialState) =>
          this.employeeService.get(action.payload).pipe(map((apiResponse) => new GetEmployeeOk(apiResponse))),

        onError: (action: GetEmployee, error) => {
          return new GetEmployeeError(error);
        },
      })
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActionTypes.CreateEmployee),
      fetch({
        run: (action: CreateEmployee, state: EmployeesPartialState) =>
          this.employeeService.create(action.payload).pipe(map((apiResponse) => new CreateEmployeeOk(apiResponse))),

        onError: (action: CreateEmployee, error) => {
          return new CreateEmployeeError(error);
        },
      })
    )
  );

  createEmployeeOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActionTypes.CreateEmployeeOk),
        tap((_) =>
          this.snackBar.open('Empleado creado correctamente', 'Ok', {
            duration: 2000,
          })
        ),
        tap((_) => this.router.navigate(['/employees']))
      ),
    { dispatch: false }
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActionTypes.UpdateEmployee),
      fetch({
        run: (action: UpdateEmployee, state: EmployeesPartialState) =>
          this.employeeService
            .update(action.payload.employeeId, action.payload.data)
            .pipe(map((apiResponse) => new UpdateEmployeeOk(apiResponse))),

        onError: (action: UpdateEmployee, error) => {
          return new UpdateEmployeeError(error);
        },
      })
    )
  );

  updateEmployeeOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(EmployeesActionTypes.UpdateEmployeeOk),
        tap((_) =>
          this.snackBar.open('Datos actualizados correctamente', 'Ok', {
            duration: 2000,
          })
        ),
        tap((_) => this.router.navigate(['/employees']))
      ),
    { dispatch: false }
  );

  searchRoles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeesActionTypes.SearchRoles),
      fetch({
        run: (action: SearchRoles, state: EmployeesPartialState) =>
          this.employeeService.searchRoles(action.payload).pipe(map((response) => new SearchRolesOk(response))),

        onError: (action: SearchRoles, error) => {
          return new SearchRolesError(error);
        },
      })
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeService
  ) {}
}
