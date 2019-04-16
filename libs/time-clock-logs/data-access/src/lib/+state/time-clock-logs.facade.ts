import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { TimeClockLogsPartialState } from './time-clock-logs.reducer';
import { timeClockLogsQuery } from './time-clock-logs.selectors';
import { SearchTimeClockLogs } from './time-clock-logs.actions';

@Injectable()
export class TimeClockLogsFacade {
  public paginatedTimeClockLogs$ = this.store.pipe(select(timeClockLogsQuery.getPaginatedTimeClockLogs));
  public paginatingStatus$ = this.store.pipe(select(timeClockLogsQuery.getPaginatingStatus));
  public creatingStatus$ = this.store.pipe(select(timeClockLogsQuery.getCreatingStatus));
  public selectedTimeClockLog$ = this.store.pipe(select(timeClockLogsQuery.getSelectedTimeClockLog));
  public selectingStatus$ = this.store.pipe(select(timeClockLogsQuery.getSelectingStatus));
  public updatingStatus$ = this.store.pipe(select(timeClockLogsQuery.getUpdatingStatus));
  public deletingStatus$ = this.store.pipe(select(timeClockLogsQuery.getDeletingStatus));

  public constructor(private store: Store<TimeClockLogsPartialState>) { }

  public search(query: any = {}) {
    this.store.dispatch(new SearchTimeClockLogs(query));
  }
}
