import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { EmployeesPartialState } from './employees.reducer';
import { employeesQuery } from './employees.selectors';
import { LoadEmployees } from './employees.actions';

@Injectable()
export class EmployeesFacade {
  loaded$ = this.store.pipe(select(employeesQuery.getLoaded));
  allEmployees$ = this.store.pipe(select(employeesQuery.getAllEmployees));
  selectedEmployees$ = this.store.pipe(
    select(employeesQuery.getSelectedEmployees)
  );

  constructor(private store: Store<EmployeesPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadEmployees());
  }
}
