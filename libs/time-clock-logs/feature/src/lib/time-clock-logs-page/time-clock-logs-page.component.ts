import { Component, OnInit } from '@angular/core';
import { TimeClockLogsFacade } from '@kirby/time-clock-logs/data-access';
import { Observable } from 'rxjs';
import { Pagination } from '@kirby/shared';
import { TimeClockLogModel } from '@kirby/time-clock-logs/util';
import { AuthFacade } from '@kirby/authentication/data-access';
import { User } from '@kirby/users/util';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'kirby-time-clock-logs-page',
  templateUrl: './time-clock-logs-page.component.html',
  styleUrls: ['./time-clock-logs-page.component.scss'],
})
export class TimeClockLogsPageComponent implements OnInit {
  public timeClockLogs$: Observable<Pagination<TimeClockLogModel>>;
  public user$: Observable<User>;
  peopleInsideCount$ = this.timeClockFacade.peopleInsideCount$;

  public user: User;
  public searchQuery = {};

  constructor(private authFacade: AuthFacade, private timeClockFacade: TimeClockLogsFacade) {}

  ngOnInit() {
    this.user$ = this.authFacade.authUser$.pipe(tap((user) => (this.user = user)));
    this.timeClockLogs$ = this.timeClockFacade.paginatedTimeClockLogs$;

    this.getStatistics();
    this.searchTimeClockLogs();
  }

  get timeClockLogsTableButtons() {
    const buttons = [];

    if (this.user && this.user.can('time-clock-logs.approvals.create')) {
      buttons.push('approve');
    }

    if (this.user && this.user.can('time-clock-logs.approvals.delete')) {
      buttons.push('delete-approval');
    }

    return buttons;
  }

  searchTimeClockLogs(query = {}) {
    this.searchQuery = { ...this.searchQuery, ...query };
    this.timeClockFacade.search(this.searchQuery);
  }

  getStatistics() {
    this.timeClockFacade.getStatistics();
  }

  onApprove(timeClockLogId: string) {
    this.timeClockFacade.approve(timeClockLogId, this.user);
  }

  onDeleteApproval(timeClockLogId: string) {
    this.timeClockFacade.deleteApproval(timeClockLogId, this.user);
  }
}
