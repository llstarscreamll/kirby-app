import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';

import { TimeClockLogsPartialState } from './time-clock-logs.reducer';
import {
  SearchTimeClockLogs,
  SearchTimeClockLogsOk,
  SearchTimeClockLogsError,
  TimeClockLogsActionTypes,
  CreateTimeClockLog,
  CreateTimeClockLogOk,
  CreateTimeClockLogError,
  GetTimeClockLog,
  GetTimeClockLogOk,
  GetTimeClockLogError,
  UpdateTimeClockLog,
  UpdateTimeClockLogOk,
  UpdateTimeClockLogError,
  DeleteTimeClockLog,
  DeleteTimeClockLogOk,
  DeleteTimeClockLogError,
  CreateEntryAndExitLog,
  CreateEntryAndExitLogOk,
  CreateEntryAndExitLogError
} from './time-clock-logs.actions';
import { TimeClockLogsService } from '../time-clock-logs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TimeClockLogsEffects {
  @Effect()
  public searchTimeClockLogs$ = this.dataPersistence
    .fetch(TimeClockLogsActionTypes.SearchTimeClockLogs, {
      run: (action: SearchTimeClockLogs, state: TimeClockLogsPartialState) => {
        return this.timeClockLogsService.search(action.payload)
          .pipe(map(response => new SearchTimeClockLogsOk(response)));
      },
      onError: (action: SearchTimeClockLogs, error) => {
        return new SearchTimeClockLogsError(error);
      }
    });

  @Effect()
  public createTimeClockLog$ = this.dataPersistence
    .fetch(TimeClockLogsActionTypes.CreateTimeClockLog, {
      run: (action: CreateTimeClockLog, state: TimeClockLogsPartialState) => {
        return this.timeClockLogsService.create(action.payload)
          .pipe(map(response => new CreateTimeClockLogOk(response)));
      },
      onError: (action: CreateTimeClockLog, error) => {
        return new CreateTimeClockLogError(error);
      }
    });

  @Effect()
  public createEntryAndExitLog$ = this.dataPersistence
    .fetch(TimeClockLogsActionTypes.CreateEntryAndExitLog, {
      run: (action: CreateEntryAndExitLog, state: TimeClockLogsPartialState) => {
        const serviceCall = action.payload.action === 'check_in'
          ? this.timeClockLogsService.checkIn(action.payload)
          : this.timeClockLogsService.checkOut(action.payload);

        return serviceCall.pipe(
          map(response => new CreateEntryAndExitLogOk({ response, action: action.payload.action }))
        );
      },
      onError: (action: CreateEntryAndExitLog, error) => {
        return new CreateEntryAndExitLogError(error);
      }
    });

  @Effect({ dispatch: false })
  public createEntryAndExitLogOk$ = this.dataPersistence
    .fetch(TimeClockLogsActionTypes.CreateEntryAndExitLogOk, {
      run: (action: CreateEntryAndExitLog, state: TimeClockLogsPartialState) => {
        const msg = action.payload.action == 'check_in'
          ? 'Bienvenido' : 'Que tenga buen descanso';
        this.snackBar.open(msg, 'Ok', { duration: 2 * 1000 });
      }
    });

  @Effect()
  public getTimeClockLog$ = this.dataPersistence
    .fetch(TimeClockLogsActionTypes.GetTimeClockLog, {
      run: (action: GetTimeClockLog, state: TimeClockLogsPartialState) => {
        return this.timeClockLogsService.get(action.payload)
          .pipe(map(response => new GetTimeClockLogOk(response)));
      },
      onError: (action: GetTimeClockLog, error) => {
        return new GetTimeClockLogError(error);
      }
    });

  @Effect()
  public updateTimeClockLog$ = this.dataPersistence
    .fetch(TimeClockLogsActionTypes.UpdateTimeClockLog, {
      run: (action: UpdateTimeClockLog, state: TimeClockLogsPartialState) => {
        return this.timeClockLogsService.update(action.payload.id, action.payload.data)
          .pipe(map(response => new UpdateTimeClockLogOk(response)));
      },
      onError: (action: UpdateTimeClockLog, error) => {
        return new UpdateTimeClockLogError(error);
      }
    });

  @Effect()
  public deleteTimeClockLog$ = this.dataPersistence
    .fetch(TimeClockLogsActionTypes.DeleteTimeClockLog, {
      run: (action: DeleteTimeClockLog, state: TimeClockLogsPartialState) => {
        return this.timeClockLogsService.delete(action.payload)
          .pipe(map(response => new DeleteTimeClockLogOk(action.payload)));
      },
      onError: (action: DeleteTimeClockLog, error) => {
        return new DeleteTimeClockLogError(error);
      }
    });

  constructor(
    private snackBar: MatSnackBar,
    private timeClockLogsService: TimeClockLogsService,
    private dataPersistence: DataPersistence<TimeClockLogsPartialState>
  ) { }
}
