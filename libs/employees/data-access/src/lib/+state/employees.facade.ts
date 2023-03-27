import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { employeesQuery } from './employees.selectors';
import { employeesActions as actions } from './employees.actions';

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

  constructor(private store: Store) {}

  /**
   * @todo type the query argument
   * @param query
   */
  search(query: any) {
    this.store.dispatch(actions.search(query));
  }

  searchRoles(query: any) {
    this.store.dispatch(actions.searchRoles(query));
  }

  get(employeeId: string) {
    this.store.dispatch(actions.get(employeeId));
  }

  update(employeeId: string, data: any) {
    this.store.dispatch(actions.update({ employeeId, data }));
  }

  create(data: any) {
    this.store.dispatch(actions.create(data));
  }

  cleanSelected() {
    this.store.dispatch(actions.getOk(null));
  }
}
