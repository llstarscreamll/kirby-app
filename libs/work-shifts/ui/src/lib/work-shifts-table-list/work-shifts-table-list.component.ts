import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';

import { WorkShiftInterface } from '@kirby/work-shifts/util';

@Component({
  selector: 'kirby-work-shifts-table-list',
  templateUrl: './work-shifts-table-list.component.html',
  styleUrls: ['./work-shifts-table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkShiftsTableListComponent implements OnInit {
  @Input()
  public items: WorkShiftInterface[];

  @Input()
  public columns: string[];

  weekDaysMapping = {
    1: 'L',
    2: 'M',
    3: 'X',
    4: 'J',
    5: 'V',
    6: 'S',
    7: 'D',
  };

  constructor() {}

  ngOnInit() {}

  getDisplayDay(day): string {
    return this.weekDaysMapping[day];
  }
}
