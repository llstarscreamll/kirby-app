import { tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { EmployeesFacade } from '@kirby/employees/data-access';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';

@Component({
  selector: 'kirby-edit-employee-page',
  templateUrl: './edit-employee-page.component.html',
  styleUrls: ['./edit-employee-page.component.scss']
})
export class EditEmployeePageComponent implements OnInit, OnDestroy {
  private employeeId: string;

  employee$ = this.employeesFacade.selectedEmployee$.pipe(
    tap(employee => (employee ? (this.employeeId = employee.id) : null))
  );
  public workShifts$ = this.workShiftsFacade.getWorkShiftsList$;
  public updatingStatus$ = this.employeesFacade.updatingStatus$;
  public selectingStatus$ = this.employeesFacade.selectingStatus$;

  constructor(
    private employeesFacade: EmployeesFacade,
    private workShiftsFacade: WorkShiftsFacade
  ) {}

  ngOnInit() {
    this.workShiftsFacade.search({ limit: 0 });
  }

  ngOnDestroy(): void {
    this.employeesFacade.cleanSelected();
  }

  employeeFormSubmitted(data) {
    this.employeesFacade.update(this.employeeId, data);
  }
}
