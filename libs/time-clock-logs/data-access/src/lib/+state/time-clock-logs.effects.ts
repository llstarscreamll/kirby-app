import { fetch } from '@nrwl/angular';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  ApproveTimeClockLog,
  ApproveTimeClockLogError,
  ApproveTimeClockLogOk,
  CreateEntryAndExitLog,
  CreateEntryAndExitLogError,
  CreateEntryAndExitLogOk,
  CreateTimeClockLog,
  CreateTimeClockLogError,
  CreateTimeClockLogOk,
  DeleteTimeClockLog,
  DeleteTimeClockLogApproval,
  DeleteTimeClockLogApprovalError,
  DeleteTimeClockLogApprovalOk,
  DeleteTimeClockLogError,
  DeleteTimeClockLogOk,
  DownloadTimeClockLogs,
  DownloadTimeClockLogsError,
  DownloadTimeClockLogsOk,
  GetEmployeeTimeClockData,
  GetEmployeeTimeClockDataError,
  GetEmployeeTimeClockDataOk,
  GetTimeClockLog,
  GetTimeClockLogError,
  GetTimeClockLogOk,
  GetTimeClockStatistics,
  GetTimeClockStatisticsError,
  GetTimeClockStatisticsOk,
  SearchSubCostCenters,
  SearchSubCostCentersError,
  SearchSubCostCentersOk,
  SearchTimeClockLogs,
  SearchTimeClockLogsError,
  SearchTimeClockLogsOk,
  TimeClockLogsActionTypes,
  UpdateTimeClockLog,
  UpdateTimeClockLogError,
  UpdateTimeClockLogOk,
} from './time-clock-logs.actions';
import { TimeClockLogsService } from '../time-clock-logs.service';
import { TimeClockLogsPartialState } from './time-clock-logs.reducer';

@Injectable()
export class TimeClockLogsEffects {
  searchTimeClockLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.SearchTimeClockLogs),
      fetch({
        run: (action: SearchTimeClockLogs, state: TimeClockLogsPartialState) => {
          return this.timeClockLogsService
            .search(action.payload)
            .pipe(map((response) => new SearchTimeClockLogsOk(response)));
        },
        onError: (_, error) => new SearchTimeClockLogsError(error),
      })
    )
  );

  downloadTimeClockLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.DownloadTimeClockLogs),
      fetch({
        run: (action: DownloadTimeClockLogs, state: TimeClockLogsPartialState) => {
          return this.timeClockLogsService
            .downloadReport(action.payload)
            .pipe(map((_) => new DownloadTimeClockLogsOk()));
        },
        onError: (_, error) => new DownloadTimeClockLogsError(error),
      })
    )
  );

  downloadTimeClockLogsOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TimeClockLogsActionTypes.DownloadTimeClockLogsOk),
        tap((_) => this.snackBar.open('La información será enviada a tu correo', 'Ok', { duration: 5000 }))
      ),
    { dispatch: false }
  );

  getTimeClockStatistics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.GetTimeClockStatistics),
      fetch({
        run: () =>
          this.timeClockLogsService.getStatistics().pipe(map((response) => new GetTimeClockStatisticsOk(response))),
        onError: (_, error) => new GetTimeClockStatisticsError(error),
      })
    )
  );

  getEmployeeTimeClockData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.GetEmployeeTimeClockData),
      fetch({
        run: (action: GetEmployeeTimeClockData) => {
          return this.timeClockLogsService
            .getEmployeeTimeClockData(action.payload)
            .pipe(map((response) => new GetEmployeeTimeClockDataOk(response)));
        },
        onError: (_, error) => new GetEmployeeTimeClockDataError(error),
      })
    )
  );

  searchSubCostCenters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.SearchSubCostCenters),
      fetch({
        run: (action: SearchSubCostCenters) => {
          return this.timeClockLogsService
            .searchSubCostCenters(action.payload)
            .pipe(map((response) => new SearchSubCostCentersOk(response)));
        },
        onError: (_, error) => new SearchSubCostCentersError(error),
      })
    )
  );

  createTimeClockLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.CreateTimeClockLog),
      fetch({
        run: (action: CreateTimeClockLog, state: TimeClockLogsPartialState) => {
          return this.timeClockLogsService
            .create(action.payload)
            .pipe(map((response) => new CreateTimeClockLogOk(response)));
        },
        onError: (_, error) => new CreateTimeClockLogError(error),
      })
    )
  );

  createEntryAndExitLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.CreateEntryAndExitLog),
      fetch({
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
      })
    )
  );

  createEntryAndExitLogOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TimeClockLogsActionTypes.CreateEntryAndExitLogOk),
        fetch({
          run: (action: CreateEntryAndExitLog, state: TimeClockLogsPartialState) => {
            const msg = action.payload.action === 'check_in' ? 'Bienvenido' : 'Que tenga buen descanso';
            this.snackBar.open(msg, 'Ok', { duration: 2 * 1000 });
          },
        })
      ),
    { dispatch: false }
  );

  getTimeClockLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.GetTimeClockLog),
      fetch({
        run: (action: GetTimeClockLog, state: TimeClockLogsPartialState) => {
          return this.timeClockLogsService.get(action.payload).pipe(map((response) => new GetTimeClockLogOk(response)));
        },
        onError: (_, error) => new GetTimeClockLogError(error),
      })
    )
  );

  updateTimeClockLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.UpdateTimeClockLog),
      fetch({
        run: (action: UpdateTimeClockLog, state: TimeClockLogsPartialState) => {
          return this.timeClockLogsService
            .update(action.payload.id, action.payload.data)
            .pipe(map((response) => new UpdateTimeClockLogOk(response)));
        },
        onError: (_, error) => new UpdateTimeClockLogError(error),
      })
    )
  );

  deleteTimeClockLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.DeleteTimeClockLog),
      fetch({
        run: (action: DeleteTimeClockLog, state: TimeClockLogsPartialState) => {
          return this.timeClockLogsService
            .delete(action.payload)
            .pipe(map((_) => new DeleteTimeClockLogOk(action.payload)));
        },
        onError: (_, error) => new DeleteTimeClockLogError(error),
      })
    )
  );

  approveTimeClockLog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.ApproveTimeClockLog),
      fetch({
        run: (action: ApproveTimeClockLog, state: TimeClockLogsPartialState) => {
          return this.timeClockLogsService
            .approve(action.timeClockLogId)
            .pipe(map((_) => new ApproveTimeClockLogOk(action.timeClockLogId, action.user)));
        },
        onError: (action, error) => new ApproveTimeClockLogError(error, action.timeClockLogId, action.user),
      })
    )
  );

  deleteTimeClockLogApproval$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeClockLogsActionTypes.DeleteTimeClockLogApproval),
      fetch({
        run: (action: DeleteTimeClockLogApproval, state: TimeClockLogsPartialState) => {
          return this.timeClockLogsService
            .deleteApproval(action.timeClockLogId)
            .pipe(map((_) => new DeleteTimeClockLogApprovalOk(action.timeClockLogId, action.user)));
        },
        onError: (action, error) => new DeleteTimeClockLogApprovalError(error, action.timeClockLogId, action.user),
      })
    )
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private timeClockLogsService: TimeClockLogsService
  ) {}
}
