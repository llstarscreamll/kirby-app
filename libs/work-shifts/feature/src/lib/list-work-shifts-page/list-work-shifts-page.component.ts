import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Pagination } from '@kirby/shared';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { AuthFacade } from '@kirby/authentication/data-access';

@Component({
  selector: 'kirby-list-work-shifts-page',
  templateUrl: './list-work-shifts-page.component.html',
  styleUrls: ['./list-work-shifts-page.component.scss'],
})
export class ListWorkShiftsPageComponent implements OnInit {
  public user$ = this.authFacade.authUser$;
  public paginatedWorkShifts$ = this.workShiftsFacade.paginatedWorkShifts$;

  constructor(private workShiftsFacade: WorkShiftsFacade, private authFacade: AuthFacade) {}

  ngOnInit() {
    this.search();
  }

  search(query: any = {}) {
    this.workShiftsFacade.search(query);
  }

  trashWorkShift(workShift: WorkShiftInterface) {
    if (confirm('¿Estás seguro?')) {
      this.workShiftsFacade.delete(workShift.id);
    }
  }
}
