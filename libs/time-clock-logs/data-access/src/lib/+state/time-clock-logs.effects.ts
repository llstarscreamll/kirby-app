import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

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
  CreateEntryAndExitLogError,
  GetEmployeeTimeClockData,
  GetEmployeeTimeClockDataOk,
  GetEmployeeTimeClockDataError,
  SearchSubCostCenters,
  SearchSubCostCentersOk,
  SearchSubCostCentersError,
  ApproveTimeClockLog,
  ApproveTimeClockLogOk,
  ApproveTimeClockLogError,
  DeleteTimeClockLogApproval,
  DeleteTimeClockLogApprovalOk,
  DeleteTimeClockLogApprovalError,
  GetTimeClockStatistics,
  GetTimeClockStatisticsOk,
  GetTimeClockStatisticsError,
  DownloadTimeClockLogs,
} from './time-clock-logs.actions';
import { TimeClockLogsService } from '../time-clock-logs.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TimeClockLogsEffects {
  @Effect()
  searchTimeClockLogs$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.SearchTimeClockLogs, {
    run: (action: SearchTimeClockLogs, state: TimeClockLogsPartialState) => {
      return this.timeClockLogsService
        .search(action.payload)
        .pipe(map((response) => new SearchTimeClockLogsOk(response)));
    },
    onError: (_, error) => new SearchTimeClockLogsError(error),
  });

  @Effect({ dispatch: false })
  downloadTimeClockLogs$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.DownloadTimeClockLogs, {
    run: (action: DownloadTimeClockLogs, state: TimeClockLogsPartialState) => {
      return this.timeClockLogsService
        .downloadReport(action.payload)
        .pipe(tap((_) => this.snackBar.open('La información será enviada a tu correo.', 'Ok')));
    },
    onError: (_, error) => {
      this.snackBar.open('Ocurrió un error solicitando la información.', 'Ok');

      return [];
    },
  });

  @Effect()
  getTimeClockStatistics$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.GetTimeClockStatistics, {
    run: () =>
      this.timeClockLogsService.getStatistics().pipe(map((response) => new GetTimeClockStatisticsOk(response))),
    onError: (_, error) => new GetTimeClockStatisticsError(error),
  });

  @Effect()
  getEmployeeTimeClockData$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.GetEmployeeTimeClockData, {
    run: (action: GetEmployeeTimeClockData) => {
      return this.timeClockLogsService
        .getEmployeeTimeClockData(action.payload)
        .pipe(map((response) => new GetEmployeeTimeClockDataOk(response)));
    },
    onError: (_, error) => new GetEmployeeTimeClockDataError(error),
  });

  @Effect()
  searchSubCostCenters$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.SearchSubCostCenters, {
    run: (action: SearchSubCostCenters) => {
      return this.timeClockLogsService
        .searchSubCostCenters(action.payload)
        .pipe(map((response) => new SearchSubCostCentersOk(response)));
    },
    onError: (_, error) => new SearchSubCostCentersError(error),
  });

  @Effect()
  createTimeClockLog$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.CreateTimeClockLog, {
    run: (action: CreateTimeClockLog, state: TimeClockLogsPartialState) => {
      return this.timeClockLogsService
        .create(action.payload)
        .pipe(map((response) => new CreateTimeClockLogOk(response)));
    },
    onError: (_, error) => new CreateTimeClockLogError(error),
  });

  @Effect()
  createEntryAndExitLog$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.CreateEntryAndExitLog, {
    run: (action: CreateEntryAndExitLog, state: TimeClockLogsPartialState) => {
      const serviceCall =
        action.payload.action === 'check_in'
          ? this.timeClockLogsService.checkIn(action.payload)
          : this.timeClockLogsService.checkOut(action.payload);

      return serviceCall.pipe(
        map((response) => new CreateEntryAndExitLogOk({ response, action: action.payload.action }))
      );
    },
    onError: (_, error) => new CreateEntryAndExitLogError(error),
  });

  @Effect({ dispatch: false })
  createEntryAndExitLogOk$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.CreateEntryAndExitLogOk, {
    run: (action: CreateEntryAndExitLog, state: TimeClockLogsPartialState) => {
      const msg = action.payload.action === 'check_in' ? 'Bienvenido' : 'Que tenga buen descanso';
      this.snackBar.open(msg, 'Ok', { duration: 2 * 1000 });
    },
  });

  @Effect()
  getTimeClockLog$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.GetTimeClockLog, {
    run: (action: GetTimeClockLog, state: TimeClockLogsPartialState) => {
      return this.timeClockLogsService.get(action.payload).pipe(map((response) => new GetTimeClockLogOk(response)));
    },
    onError: (_, error) => new GetTimeClockLogError(error),
  });

  @Effect()
  updateTimeClockLog$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.UpdateTimeClockLog, {
    run: (action: UpdateTimeClockLog, state: TimeClockLogsPartialState) => {
      return this.timeClockLogsService
        .update(action.payload.id, action.payload.data)
        .pipe(map((response) => new UpdateTimeClockLogOk(response)));
    },
    onError: (_, error) => new UpdateTimeClockLogError(error),
  });

  @Effect()
  deleteTimeClockLog$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.DeleteTimeClockLog, {
    run: (action: DeleteTimeClockLog, state: TimeClockLogsPartialState) => {
      return this.timeClockLogsService
        .delete(action.payload)
        .pipe(map((_) => new DeleteTimeClockLogOk(action.payload)));
    },
    onError: (_, error) => new DeleteTimeClockLogError(error),
  });

  @Effect()
  approveTimeClockLog$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.ApproveTimeClockLog, {
    run: (action: ApproveTimeClockLog, state: TimeClockLogsPartialState) => {
      return this.timeClockLogsService
        .approve(action.timeClockLogId)
        .pipe(map((_) => new ApproveTimeClockLogOk(action.timeClockLogId, action.user)));
    },
    onError: (action, error) => new ApproveTimeClockLogError(error, action.timeClockLogId, action.user),
  });

  @Effect()
  deleteTimeClockLogApproval$ = this.dataPersistence.fetch(TimeClockLogsActionTypes.DeleteTimeClockLogApproval, {
    run: (action: DeleteTimeClockLogApproval, state: TimeClockLogsPartialState) => {
      return this.timeClockLogsService
        .deleteApproval(action.timeClockLogId)
        .pipe(map((_) => new DeleteTimeClockLogApprovalOk(action.timeClockLogId, action.user)));
    },
    onError: (action, error) => new DeleteTimeClockLogApprovalError(error, action.timeClockLogId, action.user),
  });

  constructor(
    private snackBar: MatSnackBar,
    private timeClockLogsService: TimeClockLogsService,
    private dataPersistence: DataPersistence<TimeClockLogsPartialState>
  ) {}
}
