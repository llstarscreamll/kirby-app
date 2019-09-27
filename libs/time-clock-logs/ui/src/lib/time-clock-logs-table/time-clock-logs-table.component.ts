import { round } from 'lodash';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Pagination } from '@kirby/shared';
import { NoveltyModel } from '@kirby/novelties/data';
import { TimeClockLogModel } from '@kirby/time-clock-logs/util';

@Component({
  selector: 'kirby-time-clock-logs-table',
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

  public constructor() {}

  public ngOnInit() {}

  public shortName(approver: { first_name: string; last_name: string }) {
    return [
      approver.first_name
        .trim()
        .split(' ')
        .shift(),
      approver.last_name
        .trim()
        .split(' ')
        .shift()
    ].join(' ');
  }

  public readableNovelty(novelty: NoveltyModel) {
    return (
      novelty.novelty_type.code +
      ' ' +
      round(novelty.total_time_in_minutes / 60, 2)
    );
  }

  public showApproveButton(row: TimeClockLogModel): boolean {
    return (
      this.actionButtons &&
      this.actionButtons.includes('approve') &&
      !row.isApprovedByUserId(this.userId)
    );
  }

  public showDeleteApprovalButton(row: TimeClockLogModel): boolean {
    return (
      this.actionButtons &&
      this.actionButtons.includes('delete-approval') &&
      row.isApprovedByUserId(this.userId)
    );
  }
}
