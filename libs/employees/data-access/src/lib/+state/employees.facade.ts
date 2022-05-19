import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  SearchEmployees,
  GetEmployee,
  GetEmployeeOk,
  UpdateEmployee,
  CreateEmployee,
  SearchRoles,
} from './employees.actions';
import { employeesQuery } from './employees.selectors';
import { EmployeesPartialState } from './employees.reducer';

@Injectable()
export class EmployeesFacade {
  getRoles$ = this.store.pipe(select(employeesQuery.getRoles));
  paginatedEmployees$ = this.store.pipe(select(employeesQuery.getPaginated));
  paginatingStatus$ = this.store.pipe(select(employeesQuery.getPaginatingStatus));
  selectedEmployee$ = this.store.pipe(select(employeesQuery.getSelectedEmployee));
  selectingStatus$ = this.store.pipe(select(employeesQuery.getSelectingStatus));
  updatingStatus$ = this.store.pipe(select(employeesQuery.getUpdatingStatus));
  creatingStatus$ = this.store.pipe(select(employeesQuery.getCreatingStatus));
  errors$ = this.store.pipe(select(employeesQuery.getError));

  constructor(private store: Store<EmployeesPartialState>) {}

  /**
   * @todo type the query argument
   * @param query
   */
  search(query: any) {
    this.store.dispatch(new SearchEmployees(query));
  }

  searchRoles(query: any) {
    this.store.dispatch(new SearchRoles(query));
  }

  get(employeeId: string) {
    this.store.dispatch(new GetEmployee(employeeId));
  }

  update(employeeId: string, data: any) {
    this.store.dispatch(new UpdateEmployee({ employeeId, data }));
  }

  create(data: any) {
    this.store.dispatch(new CreateEmployee(data));
  }

  cleanSelected() {
    this.store.dispatch(new GetEmployeeOk(null));
  }
}
