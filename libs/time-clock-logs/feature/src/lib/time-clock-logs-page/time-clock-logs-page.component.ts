import { Component, OnInit } from '@angular/core';
import { TimeClockLogsFacade } from '@llstarscreamll/time-clock-logs/data-access';
import { Observable } from 'rxjs';
import { Pagination } from '@llstarscreamll/shared';
import { TimeClockLogModel } from '@llstarscreamll/time-clock-logs/util';
import { AuthFacade } from '@llstarscreamll/authentication-data-access';
import { UserInterface } from '@llstarscreamll/users/util';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'llstarscreamll-time-clock-logs-page',
  templateUrl: './time-clock-logs-page.component.html',
  styleUrls: ['./time-clock-logs-page.component.scss']
})
export class TimeClockLogsPageComponent implements OnInit {
  public timeClockLogs$: Observable<Pagination<TimeClockLogModel>>;
  public user: UserInterface;
  public user$: Observable<UserInterface>;
  public searchQuery = {};

  public constructor(
    private authFacade: AuthFacade,
    private timeClockFacade: TimeClockLogsFacade
  ) {}

  public ngOnInit() {
    this.user$ = this.authFacade.authUser$.pipe(
      tap(user => (this.user = user))
    );
    this.timeClockLogs$ = this.timeClockFacade.paginatedTimeClockLogs$;

    this.searchTimeClockLogs();
  }

  public searchTimeClockLogs(query = {}) {
    this.searchQuery = { ...this.searchQuery, ...query };
    this.timeClockFacade.search(this.searchQuery);
  }

  public onApprove(timeClockLogId: string) {
    this.timeClockFacade.approve(timeClockLogId, this.user);
  }

  public onDeleteApproval(timeClockLogId: string) {
    this.timeClockFacade.deleteApproval(timeClockLogId, this.user);
  }
}
