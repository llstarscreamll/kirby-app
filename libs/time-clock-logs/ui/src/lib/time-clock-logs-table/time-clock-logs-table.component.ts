import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Pagination } from '@llstarscreamll/shared';
import { TimeClockLogModel } from '@llstarscreamll/time-clock-logs/util';
import { NoveltyInterface } from '@llstarscreamll/novelties/data';
import { round } from 'lodash';

@Component({
  selector: 'llstarscreamll-time-clock-logs-table',
  templateUrl: './time-clock-logs-table.component.html',
  styleUrls: ['./time-clock-logs-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeClockLogsTableComponent implements OnInit {

  @Input()
  public timeClockLogs: Pagination<TimeClockLogModel>;

  @Input()
  public userId: string;

  @Input()
  public actionButtons = [];

  @Output()
  public approve = new EventEmitter();

  @Output()
  public deleteApproval = new EventEmitter();

  public constructor() { }

  public ngOnInit() { }

  public shortName(approver: { first_name: string, last_name: string }) {
    return [
      approver.first_name.trim().split(' ').shift(),
      approver.last_name.trim().split(' ').shift()
    ].join(' ');
  }

  public readableNovelty(novelty: NoveltyInterface) {
    return novelty.novelty_type.code + ' ' + round(novelty.total_time_in_minutes / 60, 2);
  }

  public showApproveButton(row: TimeClockLogModel): boolean {
    return this.actionButtons && this.actionButtons.includes('approve') && !row.isApprovedByUserId(this.userId);
  }

  public showDeleteApprovalButton(row: TimeClockLogModel): boolean {
    return this.actionButtons && this.actionButtons.includes('delete-approval') && row.isApprovedByUserId(this.userId);
  }

}
