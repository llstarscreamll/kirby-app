import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { fetch } from '@nrwl/angular';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { EmployeeService } from '../employee.service';
import { employeesActions as actions } from './employees.actions';

@Injectable()
export class EmployeesEffects {
  searchEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.search),
      fetch({
        run: (action) =>
          this.employeeService.search(action.payload).pipe(map((apiResponse) => actions.searchOk(apiResponse))),
        onError: (_, error) => actions.searchError(error),
      })
    )
  );

  getEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.get),
      fetch({
        run: (action) =>
          this.employeeService.get(action.payload).pipe(map((apiResponse) => actions.getOk(apiResponse))),
        onError: (_, error) => actions.getError(error),
      })
    )
  );

  createEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.create),
      fetch({
        run: (action) =>
          this.employeeService.create(action.payload).pipe(map((apiResponse) => actions.createOk(apiResponse))),
        onError: (_, error) => actions.createError(error),
      })
    )
  );

  createEmployeeOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.createOk),
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
      ofType(actions.update),
      fetch({
        run: (action) =>
          this.employeeService
            .update(action.payload.employeeId, action.payload.data)
            .pipe(map((apiResponse) => actions.updateOk(apiResponse))),
        onError: (_, error) => actions.updateError(error),
      })
    )
  );

  updateEmployeeOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.updateOk),
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
      ofType(actions.searchRoles),
      fetch({
        run: (action) =>
          this.employeeService.searchRoles(action.payload).pipe(map((response) => actions.searchRolesOk(response))),
        onError: (_, error) => actions.searchRolesError(error),
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
