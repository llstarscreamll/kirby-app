import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { TimeClockLogsPartialState } from './time-clock-logs.reducer';
import { timeClockLogsQuery } from './time-clock-logs.selectors';
import { SearchTimeClockLogs, CreateEntryAndExitLog, CleanError, GetEmployeeTimeClockData, SearchSubCostCenters, ApproveTimeClockLog, DeleteTimeClockLog, DeleteTimeClockLogApproval } from './time-clock-logs.actions';
import { UserInterface } from '@llstarscreamll/users/util/src';

@Injectable()
export class TimeClockLogsFacade {
  public paginatedTimeClockLogs$ = this.store.pipe(select(timeClockLogsQuery.getPaginatedTimeClockLogs));
  public paginatingStatus$ = this.store.pipe(select(timeClockLogsQuery.getPaginatingStatus));
  public creatingStatus$ = this.store.pipe(select(timeClockLogsQuery.getCreatingStatus));
  public selectedTimeClockLog$ = this.store.pipe(select(timeClockLogsQuery.getSelectedTimeClockLog));
  public selectingStatus$ = this.store.pipe(select(timeClockLogsQuery.getSelectingStatus));
  public updatingStatus$ = this.store.pipe(select(timeClockLogsQuery.getUpdatingStatus));
  public deletingStatus$ = this.store.pipe(select(timeClockLogsQuery.getDeletingStatus));
  public apiError$ = this.store.pipe(select(timeClockLogsQuery.getError));
  public subCostCenters$ = this.store.pipe(select(timeClockLogsQuery.getSubCostCenters));
  public employeeTimeClockData$ = this.store.pipe(select(timeClockLogsQuery.getEmployeeTimeClockData));

  public constructor(private store: Store<TimeClockLogsPartialState>) { }

  public search(query: any = {}) {
    this.store.dispatch(new SearchTimeClockLogs(query));
  }

  public getTimeClockData(log: { identification_code: string, action: string }) {
    this.store.dispatch(new GetEmployeeTimeClockData(log));
  }

  public searchSubCostCenters(query: any) {
    this.store.dispatch(new SearchSubCostCenters(query));
  }

  public createEntryAndExitLog(log: { identification_code: string, action: string }) {
    this.store.dispatch(new CreateEntryAndExitLog(log));
  }

  public approve(timeClockLogId: string, user: UserInterface) {
    this.store.dispatch(new ApproveTimeClockLog(timeClockLogId, user));
  }

  public deleteApproval(timeClockLogId: string, user: UserInterface) {
    this.store.dispatch(new DeleteTimeClockLogApproval(timeClockLogId, user));
  }

  public cleanError() {
    this.store.dispatch(new CleanError());
  }
}
