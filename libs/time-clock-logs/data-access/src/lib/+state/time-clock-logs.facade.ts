import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { TimeClockLogsPartialState } from './time-clock-logs.reducer';
import { timeClockLogsQuery } from './time-clock-logs.selectors';
import {
  SearchTimeClockLogs,
  CreateEntryAndExitLog,
  CleanError,
  GetEmployeeTimeClockData,
  SearchSubCostCenters,
  ApproveTimeClockLog,
  DeleteTimeClockLog,
  DeleteTimeClockLogApproval,
  GetTimeClockStatistics,
} from './time-clock-logs.actions';
import { User } from '@kirby/users/util';

@Injectable()
export class TimeClockLogsFacade {
  paginatedTimeClockLogs$ = this.store.pipe(select(timeClockLogsQuery.getPaginatedTimeClockLogs));
  paginatingStatus$ = this.store.pipe(select(timeClockLogsQuery.getPaginatingStatus));
  creatingStatus$ = this.store.pipe(select(timeClockLogsQuery.getCreatingStatus));
  selectedTimeClockLog$ = this.store.pipe(select(timeClockLogsQuery.getSelectedTimeClockLog));
  selectingStatus$ = this.store.pipe(select(timeClockLogsQuery.getSelectingStatus));
  updatingStatus$ = this.store.pipe(select(timeClockLogsQuery.getUpdatingStatus));
  deletingStatus$ = this.store.pipe(select(timeClockLogsQuery.getDeletingStatus));
  apiError$ = this.store.pipe(select(timeClockLogsQuery.getError));
  subCostCenters$ = this.store.pipe(select(timeClockLogsQuery.getSubCostCenters));
  employeeTimeClockData$ = this.store.pipe(select(timeClockLogsQuery.getEmployeeTimeClockData));
  peopleInsideCount$ = this.store.pipe(select(timeClockLogsQuery.getPeopleInsideCount));

  constructor(private store: Store<TimeClockLogsPartialState>) {}

  search(query: any = {}) {
    this.store.dispatch(new SearchTimeClockLogs(query));
  }

  getStatistics() {
    this.store.dispatch(new GetTimeClockStatistics());
  }

  getTimeClockData(log: { identification_code: string; action: string }) {
    this.store.dispatch(new GetEmployeeTimeClockData(log));
  }

  searchSubCostCenters(query: any) {
    this.store.dispatch(new SearchSubCostCenters(query));
  }

  createEntryAndExitLog(log: { identification_code: string; action: string }) {
    this.store.dispatch(new CreateEntryAndExitLog(log));
  }

  approve(timeClockLogId: string, user: User) {
    this.store.dispatch(new ApproveTimeClockLog(timeClockLogId, user));
  }

  deleteApproval(timeClockLogId: string, user: User) {
    this.store.dispatch(new DeleteTimeClockLogApproval(timeClockLogId, user));
  }

  cleanError() {
    this.store.dispatch(new CleanError());
  }
}
