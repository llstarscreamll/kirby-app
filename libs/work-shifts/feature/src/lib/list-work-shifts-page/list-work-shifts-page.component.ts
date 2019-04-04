import { Component, OnInit } from '@angular/core';

import { WorkShiftsFacade } from '@llstarscreamll/work-shifts/data-access';

@Component({
  selector: 'list-work-shifts-page',
  templateUrl: './list-work-shifts-page.component.html',
  styleUrls: ['./list-work-shifts-page.component.scss']
})
export class ListWorkShiftsPageComponent implements OnInit {

  public constructor(private workShiftsFacade: WorkShiftsFacade) { }

  public ngOnInit() { }

}
