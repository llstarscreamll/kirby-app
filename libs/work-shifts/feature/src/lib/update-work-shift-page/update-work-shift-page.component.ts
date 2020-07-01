import { Component, OnInit } from '@angular/core';

import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';

@Component({
  selector: 'kirby-update-work-shift-page',
  templateUrl: './update-work-shift-page.component.html',
  styleUrls: ['./update-work-shift-page.component.scss']
})
export class UpdateWorkShiftPageComponent implements OnInit {
  constructor(private workShiftsFacade: WorkShiftsFacade) {}

  ngOnInit() {}
}
