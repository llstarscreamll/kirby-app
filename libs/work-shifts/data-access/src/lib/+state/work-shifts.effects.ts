import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
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
  GetWorkShiftError
} from './work-shifts.actions';

@Injectable()
export class WorkShiftsEffects {
  @Effect()
  searchWorkShifts$ = this.dataPersistence.fetch(
    WorkShiftsActionTypes.SearchWorkShifts,
    {
      run: (action: SearchWorkShifts, state: WorkShiftsPartialState) => {
        return this.workShiftService
          .search(action.payload)
          .pipe(map(response => new SearchWorkShiftsOk(response)));
      },
      onError: (action: SearchWorkShifts, error) => {
        return new SearchWorkShiftsError(error);
      }
    }
  );

  @Effect()
  createWorkShift$ = this.dataPersistence.fetch(
    WorkShiftsActionTypes.CreateWorkShift,
    {
      run: (action: CreateWorkShift, state: WorkShiftsPartialState) => {
        return this.workShiftService
          .create(action.payload)
          .pipe(map(response => new CreateWorkShiftOk(response)));
      },
      onError: (action: CreateWorkShift, error) => {
        return new CreateWorkShiftError(error);
      }
    }
  );

  @Effect()
  getWorkShift$ = this.dataPersistence.fetch(
    WorkShiftsActionTypes.GetWorkShift,
    {
      run: (action: GetWorkShift, state: WorkShiftsPartialState) => {
        return this.workShiftService
          .get(action.payload)
          .pipe(map(response => new GetWorkShiftOk(response)));
      },
      onError: (action: GetWorkShift, error) => {
        return new GetWorkShiftError(error);
      }
    }
  );

  @Effect()
  updateWorkShift$ = this.dataPersistence.fetch(
    WorkShiftsActionTypes.UpdateWorkShift,
    {
      run: (action: UpdateWorkShift, state: WorkShiftsPartialState) => {
        return this.workShiftService
          .update(action.payload.id, action.payload.data)
          .pipe(map(response => new UpdateWorkShiftOk(response)));
      },
      onError: (action: UpdateWorkShift, error) => {
        return new UpdateWorkShiftError(error);
      }
    }
  );

  @Effect()
  deleteWorkShift$ = this.dataPersistence.fetch(
    WorkShiftsActionTypes.DeleteWorkShift,
    {
      run: (action: DeleteWorkShift, state: WorkShiftsPartialState) => {
        return this.workShiftService
          .delete(action.payload)
          .pipe(map(response => new DeleteWorkShiftOk(action.payload)));
      },
      onError: (action: DeleteWorkShift, error) => {
        return new DeleteWorkShiftError(error);
      }
    }
  );

  constructor(
    private workShiftService: WorkShiftService,
    private dataPersistence: DataPersistence<WorkShiftsPartialState>
  ) {}
}
