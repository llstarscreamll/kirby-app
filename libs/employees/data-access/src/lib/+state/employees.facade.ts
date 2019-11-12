import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  SearchEmployees,
  SyncEmployeesByCsv,
  GetEmployee,
  GetEmployeeOk,
  UpdateEmployee
} from './employees.actions';
import { employeesQuery } from './employees.selectors';
import { EmployeesPartialState } from './employees.reducer';

@Injectable()
export class EmployeesFacade {
  public paginatedEmployees$ = this.store.pipe(
    select(employeesQuery.getPaginated)
  );

  public paginatingStatus$ = this.store.pipe(
    select(employeesQuery.getPaginatingStatus)
  );

  public selectedEmployee$ = this.store.pipe(
    select(employeesQuery.getSelectedEmployee)
  );

  public selectingStatus$ = this.store.pipe(
    select(employeesQuery.getSelectingStatus)
  );
  public updatingStatus$ = this.store.pipe(
    select(employeesQuery.getUpdatingStatus)
  );

  public constructor(private store: Store<EmployeesPartialState>) {}

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

  public get(employeeId: string) {
    this.store.dispatch(new GetEmployee(employeeId));
  }

  public update(employeeId: string, data: any) {
    this.store.dispatch(new UpdateEmployee({ employeeId, data }));
  }

  public cleanSelected() {
    this.store.dispatch(new GetEmployeeOk(null));
  }
}
