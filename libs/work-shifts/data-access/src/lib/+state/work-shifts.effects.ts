import { fetch } from '@nrwl/angular';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { WorkShiftService } from '../work-shift.service';
import { workShiftsActionTypes as actions } from './work-shifts.actions';

@Injectable()
export class WorkShiftsEffects {
  searchWorkShifts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.search),
      fetch({
        run: (action) => {
          return this.workShiftService.search(action.payload).pipe(map((response) => actions.searchOk(response)));
        },
        onError: (action, error) => {
          return actions.searchError(error);
        },
      })
    )
  );

  createWorkShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.create),
      fetch({
        run: (action) => {
          return this.workShiftService.create(action.payload).pipe(map((response) => actions.createOk(response)));
        },
        onError: (action, error) => {
          return actions.createError(error);
        },
      })
    )
  );

  createWorkShiftOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.createOk),
        tap((_) => this.router.navigateByUrl('work-shifts')),
        tap((_) => this.snackBar.open('Turno creado exitosamente', 'Ok', { duration: 5 * 1000 }))
      ),
    { dispatch: false }
  );

  getWorkShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.get),
      fetch({
        run: (action) => {
          return this.workShiftService.get(action.payload).pipe(map((response) => actions.getOk(response)));
        },
        onError: (action, error) => {
          return actions.getError(error);
        },
      })
    )
  );

  updateWorkShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.update),
      fetch({
        run: (action) => {
          return this.workShiftService
            .update(action.payload.id, action.payload.data)
            .pipe(map((response) => actions.updateOk(response)));
        },
        onError: (action, error) => {
          return actions.updateError(error);
        },
      })
    )
  );

  updateWorkShiftOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.updateOk),
        tap((_) => this.router.navigateByUrl('work-shifts')),
        tap((_) => this.snackBar.open('Turno actualizado exitosamente', 'Ok', { duration: 5 * 1000 }))
      ),
    { dispatch: false }
  );

  deleteWorkShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.delete),
      fetch({
        run: (action) => {
          return this.workShiftService.delete(action.payload).pipe(map((response) => actions.deleteOk(action.payload)));
        },
        onError: (action, error) => {
          return actions.deleteError(error);
        },
      })
    )
  );

  deleteWorkShiftOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.deleteOk),
        tap((_) => this.router.navigateByUrl('work-shifts')),
        tap((_) => this.snackBar.open('Turno movido a papelera exitosamente', 'Ok', { duration: 5 * 1000 }))
      ),
    { dispatch: false }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private workShiftService: WorkShiftService
  ) {}
}
