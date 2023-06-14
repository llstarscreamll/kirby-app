import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { User } from '@kirby/users/util';

import {
  CleanError,
  ApproveTimeClockLog,
  SearchTimeClockLogs,
  SearchSubCostCenters,
  CreateEntryAndExitLog,
  DownloadTimeClockLogs,
  GetTimeClockStatistics,
  GetEmployeeTimeClockData,
  DeleteTimeClockLogApproval,
} from './time-clock-logs.actions';
import * as selectors from './time-clock-logs.selectors';
import { TimeClockLogsPartialState } from './time-clock-logs.reducer';

@Injectable()
export class TimeClockLogsFacade {
  paginatedTimeClockLogs$ = this.store.pipe(select(selectors.getPaginatedTimeClockLogs));
  paginatingStatus$ = this.store.pipe(select(selectors.getPaginatingStatus));
  creatingStatus$ = this.store.pipe(select(selectors.getCreatingStatus));
  selectedTimeClockLog$ = this.store.pipe(select(selectors.getSelectedTimeClockLog));
  selectingStatus$ = this.store.pipe(select(selectors.getSelectingStatus));
  updatingStatus$ = this.store.pipe(select(selectors.getUpdatingStatus));
  deletingStatus$ = this.store.pipe(select(selectors.getDeletingStatus));
  apiError$ = this.store.pipe(select(selectors.getError));
  subCostCenters$ = this.store.pipe(select(selectors.getSubCostCenters));
  employeeTimeClockData$ = this.store.pipe(select(selectors.getEmployeeTimeClockData));
  peopleInsideCount$ = this.store.pipe(select(selectors.getPeopleInsideCount));

  constructor(private store: Store<TimeClockLogsPartialState>) {}

  search(query: any = {}) {
    this.store.dispatch(new SearchTimeClockLogs(query));
  }

  downloadReport(query: any = {}) {
    this.store.dispatch(new DownloadTimeClockLogs(query));
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
