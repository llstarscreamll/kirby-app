import { Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

import { WorkShiftService } from '../work-shift.service';
import { WorkShiftsPartialState } from './work-shifts.reducer';
import {
  SearchWorkShifts,
  SearchWorkShiftsOk,
  SearchWorkShiftsError,
  WorkShiftsActionTypes,
  CreateWorkShift,
  CreateWorkShiftOk,
  CreateWorkShiftError,
  UpdateWorkShift,
  UpdateWorkShiftOk,
  UpdateWorkShiftError,
  DeleteWorkShift,
  DeleteWorkShiftOk,
  DeleteWorkShiftError,
  GetWorkShift,
  GetWorkShiftOk,
  GetWorkShiftError,
} from './work-shifts.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class WorkShiftsEffects {
  @Effect()
  searchWorkShifts$ = this.dataPersistence.fetch(WorkShiftsActionTypes.SearchWorkShifts, {
    run: (action: SearchWorkShifts, state: WorkShiftsPartialState) => {
      return this.workShiftService.search(action.payload).pipe(map((response) => new SearchWorkShiftsOk(response)));
    },
    onError: (action: SearchWorkShifts, error) => {
      return new SearchWorkShiftsError(error);
    },
  });

  @Effect()
  createWorkShift$ = this.dataPersistence.fetch(WorkShiftsActionTypes.CreateWorkShift, {
    run: (action: CreateWorkShift, state: WorkShiftsPartialState) => {
      return this.workShiftService.create(action.payload).pipe(map((response) => new CreateWorkShiftOk(response)));
    },
    onError: (action: CreateWorkShift, error) => {
      return new CreateWorkShiftError(error);
    },
  });

  @Effect({ dispatch: false })
  createWorkShiftOk = this.dataPersistence.actions.pipe(
    ofType(WorkShiftsActionTypes.CreateWorkShiftOk),
    tap((_) => this.router.navigateByUrl('work-shifts')),
    tap((_) => this.snackBar.open('Turno creado exitosamente', 'Ok', { duration: 5 * 1000 }))
  );

  @Effect()
  getWorkShift$ = this.dataPersistence.fetch(WorkShiftsActionTypes.GetWorkShift, {
    run: (action: GetWorkShift, state: WorkShiftsPartialState) => {
      return this.workShiftService.get(action.payload).pipe(map((response) => new GetWorkShiftOk(response)));
    },
    onError: (action: GetWorkShift, error) => {
      return new GetWorkShiftError(error);
    },
  });

  @Effect()
  updateWorkShift$ = this.dataPersistence.fetch(WorkShiftsActionTypes.UpdateWorkShift, {
    run: (action: UpdateWorkShift, state: WorkShiftsPartialState) => {
      return this.workShiftService
        .update(action.payload.id, action.payload.data)
        .pipe(map((response) => new UpdateWorkShiftOk(response)));
    },
    onError: (action: UpdateWorkShift, error) => {
      return new UpdateWorkShiftError(error);
    },
  });

  @Effect({ dispatch: false })
  updateWorkShiftOk = this.dataPersistence.actions.pipe(
    ofType(WorkShiftsActionTypes.UpdateWorkShiftOk),
    tap((_) => this.router.navigateByUrl('work-shifts')),
    tap((_) => this.snackBar.open('Turno actualizado exitosamente', 'Ok', { duration: 5 * 1000 }))
  );

  @Effect()
  deleteWorkShift$ = this.dataPersistence.fetch(WorkShiftsActionTypes.DeleteWorkShift, {
    run: (action: DeleteWorkShift, state: WorkShiftsPartialState) => {
      return this.workShiftService
        .delete(action.payload)
        .pipe(map((response) => new DeleteWorkShiftOk(action.payload)));
    },
    onError: (action: DeleteWorkShift, error) => {
      return new DeleteWorkShiftError(error);
    },
  });

  @Effect({ dispatch: false })
  deleteWorkShiftOk = this.dataPersistence.actions.pipe(
    ofType(WorkShiftsActionTypes.DeleteWorkShiftOk),
    tap((_) => this.router.navigateByUrl('work-shifts')),
    tap((_) => this.snackBar.open('Turno movido a papelera exitosamente', 'Ok', { duration: 5 * 1000 }))
  );

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private workShiftService: WorkShiftService,
    private dataPersistence: DataPersistence<WorkShiftsPartialState>
  ) {}
}
