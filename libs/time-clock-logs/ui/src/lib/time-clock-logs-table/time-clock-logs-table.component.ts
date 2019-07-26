import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Pagination } from '@llstarscreamll/shared';
import { TimeClockLogModel } from '@llstarscreamll/time-clock-logs/util/src';

@Component({
  selector: 'llstarscreamll-time-clock-logs-table',
  templateUrl: './time-clock-logs-table.component.html',
  styleUrls: ['./time-clock-logs-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeClockLogsTableComponent implements OnInit {

  @Input()
  public timeClockLogs: Pagination<TimeClockLogModel>;

  public constructor() { }

  public ngOnInit() { }

  public shortName(approver: { first_name: string, last_name: string }) {
    return [
      approver.first_name.trim().split(' ').shift(),
      approver.last_name.trim().split(' ').shift()
    ].join(' ');
  }

}
