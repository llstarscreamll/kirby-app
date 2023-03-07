import { Component, OnInit } from '@angular/core';

import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { AuthFacade } from '@kirby/authentication/data-access';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';

@Component({
  selector: 'kirby-list-work-shifts-page',
  templateUrl: './list-work-shifts-page.component.html',
})
export class ListWorkShiftsPageComponent implements OnInit {
  user$ = this.authFacade.authUser$;
  paginatedWorkShifts$ = this.workShiftsFacade.paginatedWorkShifts$;

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
