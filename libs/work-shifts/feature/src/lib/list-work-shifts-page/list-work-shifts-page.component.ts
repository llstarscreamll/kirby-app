import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Pagination } from '@kirby/shared';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { WorkShiftInterface } from '@kirby/work-shifts/util';

@Component({
  selector: 'kirby-list-work-shifts-page',
  templateUrl: './list-work-shifts-page.component.html',
  styleUrls: ['./list-work-shifts-page.component.scss']
})
export class ListWorkShiftsPageComponent implements OnInit {
  public paginatedWorkShifts$: Observable<Pagination<WorkShiftInterface>>;

  constructor(private workShiftsFacade: WorkShiftsFacade) {}

  ngOnInit() {
    this.paginatedWorkShifts$ = this.workShiftsFacade.paginatedWorkShifts$;

    this.workShiftsFacade.search();
  }
}
