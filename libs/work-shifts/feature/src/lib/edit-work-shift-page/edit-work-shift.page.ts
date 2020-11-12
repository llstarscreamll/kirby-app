import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacade } from '@kirby/authentication-data-access';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';

@Component({
  selector: 'kirby-edit-work-shift',
  templateUrl: './edit-work-shift.page.html',
  styleUrls: ['./edit-work-shift.page.scss'],
})
export class EditWorkShiftPage implements OnInit, OnDestroy {
  user$ = this.authFacade.authUser$;
  error$ = this.workShiftsFacade.error$;
  workShift$ = this.workShiftsFacade.selectedWorkShift$;

  constructor(private workShiftsFacade: WorkShiftsFacade, private authFacade: AuthFacade) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.workShiftsFacade.cleanSelected();
  }

  updateWorkShift(data: any) {
    this.workShiftsFacade.update(data.id, data);
  }
}
