import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { WorkShiftInterface } from '@kirby/work-shifts/util';

@Component({
  selector: 'kirby-work-shifts-table-list',
  templateUrl: './work-shifts-table-list.component.html',
  styleUrls: ['./work-shifts-table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkShiftsTableListComponent implements OnInit {
  @Input()
  items: WorkShiftInterface[];

  @Input()
  columns: string[];

  @Input()
  showDeleteBtn = false;

  @Output()
  trashed = new EventEmitter();

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

  trash(item) {
    this.trashed.emit(item);
  }
}
