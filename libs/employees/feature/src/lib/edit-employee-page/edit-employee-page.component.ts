import { tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { EmployeesFacade } from '@kirby/employees/data-access';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { CostCentersFacade } from '@kirby/cost-centers/data-access';

@Component({
  selector: 'kirby-edit-employee-page',
  templateUrl: './edit-employee-page.component.html',
  styleUrls: ['./edit-employee-page.component.scss'],
})
export class EditEmployeePageComponent implements OnInit, OnDestroy {
  private employeeId: string;

  errors$ = this.employeesFacade.errors$;
  roles$ = this.employeesFacade.getRoles$;
  employee$ = this.employeesFacade.selectedEmployee$.pipe(
    tap((employee) => (employee ? (this.employeeId = employee.id) : null))
  );
  costCenters$ = this.costCentersFacade.paginatedList$;
  workShifts$ = this.workShiftsFacade.getWorkShiftsList$;
  updatingStatus$ = this.employeesFacade.updatingStatus$;
  selectingStatus$ = this.employeesFacade.selectingStatus$;

  constructor(
    private employeesFacade: EmployeesFacade,
    private workShiftsFacade: WorkShiftsFacade,
    private costCentersFacade: CostCentersFacade
  ) {}

  ngOnInit() {
    this.workShiftsFacade.search({ limit: 0 });
    this.employeesFacade.searchRoles({ limit: 0 });
  }

  ngOnDestroy(): void {
    this.employeesFacade.cleanSelected();
  }

  searchCostCenters(query) {
    this.costCentersFacade.search(query);
  }

  employeeFormSubmitted(data) {
    this.employeesFacade.update(this.employeeId, data);
  }
}
