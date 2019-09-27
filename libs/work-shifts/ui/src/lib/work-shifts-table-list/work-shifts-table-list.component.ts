import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { WorkShiftInterface } from '@kirby/work-shifts/util';

@Component({
  selector: 'kirby-work-shifts-table-list',
  templateUrl: './work-shifts-table-list.component.html',
  styleUrls: ['./work-shifts-table-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkShiftsTableListComponent implements OnInit {

  @Input()
  public items: WorkShiftInterface[];

  @Input()
  public columns: string[];

  public constructor() { }

  public ngOnInit() { }

}
