import { Component, OnInit } from '@angular/core';

import { EmployeesFacade } from '@kirby/employees/data-access';

@Component({
  selector: 'kirby-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
export class EmployeesPageComponent implements OnInit {
  public employees$ = this.employeesFacade.paginatedEmployees$;

  public constructor(private employeesFacade: EmployeesFacade) {}

  public ngOnInit() {
    this.searchEmployees();
  }

  public searchEmployees(query = {}) {
    this.employeesFacade.search(query);
  }
}
