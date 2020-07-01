import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  SearchEmployees,
  GetEmployee,
  GetEmployeeOk,
  UpdateEmployee
} from './employees.actions';
import { employeesQuery } from './employees.selectors';
import { EmployeesPartialState } from './employees.reducer';

@Injectable()
export class EmployeesFacade {
  paginatedEmployees$ = this.store.pipe(select(employeesQuery.getPaginated));

  paginatingStatus$ = this.store.pipe(
    select(employeesQuery.getPaginatingStatus)
  );

  selectedEmployee$ = this.store.pipe(
    select(employeesQuery.getSelectedEmployee)
  );

  selectingStatus$ = this.store.pipe(select(employeesQuery.getSelectingStatus));
  updatingStatus$ = this.store.pipe(select(employeesQuery.getUpdatingStatus));

  constructor(private store: Store<EmployeesPartialState>) {}

  /**
   * @todo type the query argument
   * @param query
   */
  search(query: any) {
    this.store.dispatch(new SearchEmployees(query));
  }

  get(employeeId: string) {
    this.store.dispatch(new GetEmployee(employeeId));
  }

  update(employeeId: string, data: any) {
    this.store.dispatch(new UpdateEmployee({ employeeId, data }));
  }

  cleanSelected() {
    this.store.dispatch(new GetEmployeeOk(null));
  }
}
