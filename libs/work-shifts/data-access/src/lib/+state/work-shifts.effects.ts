import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';
import { switchMap } from 'rxjs/internal/operators/switchMap';

import { WorkShiftService } from '../work-shift.service';
import { WorkShiftsPartialState } from './work-shifts.reducer';
import { AuthFacade } from '@llstarscreamll/authentication-data-access'
import { SearchWorkShifts, SearchWorkShiftsOk, SearchWorkShiftsError, WorkShiftsActionTypes, CreateWorkShift, CreateWorkShiftOk, CreateWorkShiftError, UpdateWorkShift, UpdateWorkShiftOk, UpdateWorkShiftError, DeleteWorkShift, DeleteWorkShiftOk, DeleteWorkShiftError, GetWorkShift, GetWorkShiftOk, GetWorkShiftError } from './work-shifts.actions';

@Injectable()
export class WorkShiftsEffects {

  @Effect()
  public searchWorkShifts$ = this.dataPersistence
    .fetch(WorkShiftsActionTypes.SearchWorkShifts, {
      run: (action: SearchWorkShifts, state: WorkShiftsPartialState) => {
        return this.authFacade.authTokens$.pipe(
          take(1),
          switchMap(tokens => this.workShiftService
            .search(action.payload, tokens)
            .pipe(map(response => new SearchWorkShiftsOk(response))))
        );
      },
      onError: (action: SearchWorkShifts, error) => {
        return new SearchWorkShiftsError(error);
      }
    }
    );

  @Effect()
  public createWorkShift$ = this.dataPersistence
    .fetch(WorkShiftsActionTypes.CreateWorkShift, {
      run: (action: CreateWorkShift, state: WorkShiftsPartialState) => {
        return this.authFacade.authTokens$.pipe(
          take(1),
          switchMap(tokens => this.workShiftService
            .create(action.payload, tokens)
            .pipe(map(response => new CreateWorkShiftOk(response))))
        );
      },
      onError: (action: CreateWorkShift, error) => {
        return new CreateWorkShiftError(error);
      }
    }
    );

  @Effect()
  public getWorkShift$ = this.dataPersistence
    .fetch(WorkShiftsActionTypes.GetWorkShift, {
      run: (action: GetWorkShift, state: WorkShiftsPartialState) => {
        return this.authFacade.authTokens$.pipe(
          take(1),
          switchMap(tokens => this.workShiftService
            .get(action.payload, tokens)
            .pipe(map(response => new GetWorkShiftOk(response))))
        );
      },
      onError: (action: GetWorkShift, error) => {
        return new GetWorkShiftError(error);
      }
    }
    );

  @Effect()
  public updateWorkShift$ = this.dataPersistence
    .fetch(WorkShiftsActionTypes.UpdateWorkShift, {
      run: (action: UpdateWorkShift, state: WorkShiftsPartialState) => {
        return this.authFacade.authTokens$.pipe(
          take(1),
          switchMap(tokens => this.workShiftService
            .update(action.payload.id, action.payload.data, tokens)
            .pipe(map(response => new UpdateWorkShiftOk(response))))
        );
      },
      onError: (action: UpdateWorkShift, error) => {
        return new UpdateWorkShiftError(error);
      }
    }
    );

  @Effect()
  public deleteWorkShift$ = this.dataPersistence
    .fetch(WorkShiftsActionTypes.DeleteWorkShift, {
      run: (action: DeleteWorkShift, state: WorkShiftsPartialState) => {
        return this.authFacade.authTokens$.pipe(
          take(1),
          switchMap(tokens => this.workShiftService
            .delete(action.payload, tokens)
            .pipe(map(response => new DeleteWorkShiftOk(response))))
        );
      },
      onError: (action: DeleteWorkShift, error) => {
        return new DeleteWorkShiftError(error);
      }
    }
    );

  public constructor(
    private authFacade: AuthFacade,
    private workShiftService: WorkShiftService,
    private dataPersistence: DataPersistence<WorkShiftsPartialState>
  ) { }
}
