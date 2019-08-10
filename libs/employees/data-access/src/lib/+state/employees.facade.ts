import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { EmployeesPartialState } from './employees.reducer';
import { employeesQuery } from './employees.selectors';
import { SearchEmployees, SyncEmployeesByCsv } from './employees.actions';

@Injectable()
export class EmployeesFacade {
  public paginatedEmployees$ = this.store.pipe(select(employeesQuery.getPaginated));
  public selectedEmployees$ = this.store.pipe(select(employeesQuery.getSelectedEmployee));
  public loaded$ = this.store.pipe(select(employeesQuery.getLoaded));

  public constructor(private store: Store<EmployeesPartialState>) { }

  /**
   * @todo type the query argument
   * @param query
   */
  public search(query: any) {
    this.store.dispatch(new SearchEmployees(query));
  }

  public syncEmployeesByCsvFile(data: any) {
    this.store.dispatch(new SyncEmployeesByCsv(data));
  }
}
