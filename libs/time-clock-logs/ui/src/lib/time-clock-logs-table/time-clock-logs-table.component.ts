import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Pagination } from '@kirby/shared';
import { NoveltyModel } from '@kirby/novelties/data';
import { TimeClockLogModel } from '@kirby/time-clock-logs/util';

@Component({
  selector: 'kirby-time-clock-logs-table',
  templateUrl: './time-clock-logs-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeClockLogsTableComponent implements OnInit {
  @Input()
  timeClockLogs: Pagination<TimeClockLogModel>;

  @Input()
  userId: string;

  @Input()
  actionButtons = [];

  @Output()
  approve = new EventEmitter();

  @Output()
  deleteApproval = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  shortName(approver: { first_name: string; last_name: string }) {
    return [approver.first_name.trim().split(' ').shift(), approver.last_name.trim().split(' ').shift()].join(' ');
  }

  readableNovelty(novelty: NoveltyModel): string {
    return `${novelty.novelty_type.code} ${novelty.total_time_in_hours}`;
  }

  showApproveButton(row: TimeClockLogModel): boolean {
    return this.actionButtons && this.actionButtons.includes('approve') && !row.isApprovedByUserId(this.userId);
  }

  showDeleteApprovalButton(row: TimeClockLogModel): boolean {
    return this.actionButtons && this.actionButtons.includes('delete-approval') && row.isApprovedByUserId(this.userId);
  }
}
