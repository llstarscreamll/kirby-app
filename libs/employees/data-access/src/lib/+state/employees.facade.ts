import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { EmployeesPartialState } from './employees.reducer';
import { employeesQuery } from './employees.selectors';
import { LoadEmployees, SyncEmployeesByCsvFile } from './employees.actions';

@Injectable()
export class EmployeesFacade {
  public loaded$ = this.store.pipe(select(employeesQuery.getLoaded));
  public allEmployees$ = this.store.pipe(select(employeesQuery.getAllEmployees));
  public selectedEmployees$ = this.store.pipe(select(employeesQuery.getSelectedEmployees));

  public constructor(private store: Store<EmployeesPartialState>) { }

  public loadAll() {
    this.store.dispatch(new LoadEmployees());
  }

  public syncEmployeesByCsvFile(data: any) {
    this.store.dispatch(new SyncEmployeesByCsvFile(data));
  }
}
