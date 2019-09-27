import { Component, OnInit } from '@angular/core';

import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import {
  createWorkShift,
  WorkShiftInterface
} from '@kirby/work-shifts/util';
import { Observable } from 'rxjs';
import { Pagination } from '@kirby/shared';

@Component({
  selector: 'kirby-list-work-shifts-page',
  templateUrl: './list-work-shifts-page.component.html',
  styleUrls: ['./list-work-shifts-page.component.scss']
})
export class ListWorkShiftsPageComponent implements OnInit {
  public paginatedWorkShifts$: Observable<Pagination<WorkShiftInterface>>;

  public constructor(private workShiftsFacade: WorkShiftsFacade) {}

  public ngOnInit() {
    this.paginatedWorkShifts$ = this.workShiftsFacade.paginatedWorkShifts$;

    this.workShiftsFacade.search();
  }
}
