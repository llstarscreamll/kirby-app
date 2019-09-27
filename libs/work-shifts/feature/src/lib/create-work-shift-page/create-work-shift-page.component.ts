import { Component, OnInit } from '@angular/core';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';

@Component({
  selector: 'kirby-create-work-shift-page',
  templateUrl: './create-work-shift-page.component.html',
  styleUrls: ['./create-work-shift-page.component.scss']
})
export class CreateWorkShiftPageComponent implements OnInit {
  public constructor(private workShiftsFacade: WorkShiftsFacade) {}

  public ngOnInit() {}
}
