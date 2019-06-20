import { Component, OnInit } from '@angular/core';
import { TimeClockLogsFacade } from '@llstarscreamll/time-clock-logs/data-access/src';
import { Observable } from 'rxjs';
import { Pagination } from '@llstarscreamll/shared';
import { TimeClockLogInterface } from '@llstarscreamll/time-clock-logs/util/src';

@Component({
  selector: 'llstarscreamll-time-clock-logs-page',
  templateUrl: './time-clock-logs-page.component.html',
  styleUrls: ['./time-clock-logs-page.component.scss']
})
export class TimeClockLogsPageComponent implements OnInit {

  public timeClockLogs$: Observable<Pagination<TimeClockLogInterface>>

  public constructor(private timeClockFacade: TimeClockLogsFacade) { }

  public ngOnInit() {
    this.timeClockLogs$ = this.timeClockFacade.paginatedTimeClockLogs$;

    this.searchTimeClockLogs();
  }

  public searchTimeClockLogs(query = {}) {
    this.timeClockFacade.search(query);
  }

}
