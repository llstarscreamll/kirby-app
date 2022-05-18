import { Component, OnInit } from '@angular/core';

import { EmployeesFacade } from '@kirby/employees/data-access';
import { WorkShiftsFacade } from '@kirby/work-shifts/data-access';
import { CostCentersFacade } from '@kirby/cost-centers/data-access';

@Component({
  selector: 'kirby-create-employee-page',
  templateUrl: './create-employee-page.component.html',
  styleUrls: ['./create-employee-page.component.scss'],
})
export class CreateEmployeePageComponent implements OnInit {
  public errors$ = this.employeesFacade.errors$;
  public roles$ = this.employeesFacade.getRoles$;
  public creatingStatus$ = this.employeesFacade.creatingStatus$;
  public costCenters$ = this.costCentersFacade.paginatedList$;
  public workShifts$ = this.workShiftsFacade.getWorkShiftsList$;

  constructor(
    private employeesFacade: EmployeesFacade,
    private workShiftsFacade: WorkShiftsFacade,
    private costCentersFacade: CostCentersFacade
  ) {}

  ngOnInit() {
    this.workShiftsFacade.search({ limit: 0 });
    this.employeesFacade.searchRoles({ limit: 0 });
  }

  searchCostCenters(query) {
    this.costCentersFacade.search(query);
  }

  employeeFormSubmitted(data) {
    this.employeesFacade.create(data);
  }
}
