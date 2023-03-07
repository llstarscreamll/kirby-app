import { Component, OnInit } from '@angular/core';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';

@Component({
  selector: 'kirby-create-work-shift-page',
  templateUrl: './create-work-shift-page.component.html',
})
export class CreateWorkShiftPageComponent implements OnInit {
  error$ = this.workShiftsFacade.error$;

  constructor(private workShiftsFacade: WorkShiftsFacade) {}

  ngOnInit() {}

  createWorkShift(data: any) {
    this.workShiftsFacade.create(data);
  }
}
