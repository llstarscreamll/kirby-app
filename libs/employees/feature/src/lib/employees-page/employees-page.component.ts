import { Component, OnInit } from '@angular/core';

import { EmployeesFacade } from '@kirby/employees/data-access';

@Component({
  selector: 'kirby-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss']
})
export class EmployeesPageComponent implements OnInit {
  employees$ = this.employeesFacade.paginatedEmployees$;

  constructor(private employeesFacade: EmployeesFacade) {}

  ngOnInit() {
    this.searchEmployees();
  }

  searchEmployees(query = {}) {
    this.employeesFacade.search(query);
  }
}
