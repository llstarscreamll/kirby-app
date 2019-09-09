import { Component, OnInit } from '@angular/core';

import { WorkShiftsFacade } from '@llstarscreamll/work-shifts/data-access';
import {
  createWorkShift,
  WorkShiftInterface
} from '@llstarscreamll/work-shifts/util';
import { Observable } from 'rxjs';
import { Pagination } from '@llstarscreamll/shared';

@Component({
  selector: 'llstarscreamll-list-work-shifts-page',
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
