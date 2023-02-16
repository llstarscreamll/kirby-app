import { fetch } from '@nrwl/angular';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  CreateWorkShift,
  CreateWorkShiftError,
  CreateWorkShiftOk,
  DeleteWorkShift,
  DeleteWorkShiftError,
  DeleteWorkShiftOk,
  GetWorkShift,
  GetWorkShiftError,
  GetWorkShiftOk,
  SearchWorkShifts,
  SearchWorkShiftsError,
  SearchWorkShiftsOk,
  UpdateWorkShift,
  UpdateWorkShiftError,
  UpdateWorkShiftOk,
  WorkShiftsActionTypes,
} from './work-shifts.actions';
import { WorkShiftService } from '../work-shift.service';
import { WorkShiftsPartialState } from './work-shifts.reducer';

@Injectable()
export class WorkShiftsEffects {
  searchWorkShifts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkShiftsActionTypes.SearchWorkShifts),
      fetch({
        run: (action: SearchWorkShifts, state: WorkShiftsPartialState) => {
          return this.workShiftService.search(action.payload).pipe(map((response) => new SearchWorkShiftsOk(response)));
        },
        onError: (action: SearchWorkShifts, error) => {
          return new SearchWorkShiftsError(error);
        },
      })
    )
  );

  createWorkShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkShiftsActionTypes.CreateWorkShift),
      fetch({
        run: (action: CreateWorkShift, state: WorkShiftsPartialState) => {
          return this.workShiftService.create(action.payload).pipe(map((response) => new CreateWorkShiftOk(response)));
        },
        onError: (action: CreateWorkShift, error) => {
          return new CreateWorkShiftError(error);
        },
      })
    )
  );

  createWorkShiftOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WorkShiftsActionTypes.CreateWorkShiftOk),
        tap((_) => this.router.navigateByUrl('work-shifts')),
        tap((_) => this.snackBar.open('Turno creado exitosamente', 'Ok', { duration: 5 * 1000 }))
      ),
    { dispatch: false }
  );

  getWorkShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkShiftsActionTypes.GetWorkShift),
      fetch({
        run: (action: GetWorkShift, state: WorkShiftsPartialState) => {
          return this.workShiftService.get(action.payload).pipe(map((response) => new GetWorkShiftOk(response)));
        },
        onError: (action: GetWorkShift, error) => {
          return new GetWorkShiftError(error);
        },
      })
    )
  );

  updateWorkShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkShiftsActionTypes.UpdateWorkShift),
      fetch({
        run: (action: UpdateWorkShift, state: WorkShiftsPartialState) => {
          return this.workShiftService
            .update(action.payload.id, action.payload.data)
            .pipe(map((response) => new UpdateWorkShiftOk(response)));
        },
        onError: (action: UpdateWorkShift, error) => {
          return new UpdateWorkShiftError(error);
        },
      })
    )
  );

  updateWorkShiftOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WorkShiftsActionTypes.UpdateWorkShiftOk),
        tap((_) => this.router.navigateByUrl('work-shifts')),
        tap((_) => this.snackBar.open('Turno actualizado exitosamente', 'Ok', { duration: 5 * 1000 }))
      ),
    { dispatch: false }
  );

  deleteWorkShift$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WorkShiftsActionTypes.DeleteWorkShift),
      fetch({
        run: (action: DeleteWorkShift, state: WorkShiftsPartialState) => {
          return this.workShiftService
            .delete(action.payload)
            .pipe(map((response) => new DeleteWorkShiftOk(action.payload)));
        },
        onError: (action: DeleteWorkShift, error) => {
          return new DeleteWorkShiftError(error);
        },
      })
    )
  );

  deleteWorkShiftOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(WorkShiftsActionTypes.DeleteWorkShiftOk),
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
