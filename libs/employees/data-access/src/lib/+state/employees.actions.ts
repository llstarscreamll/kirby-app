import { Action } from '@ngrx/store';
import { Entity } from './employees.reducer';
import { Pagination } from "@llstarscreamll/shared";
import { EmployeeInterface } from '@llstarscreamll/employees/util';

export enum EmployeesActionTypes {
  SearchEmployees = '[Employees] search',
  SearchEmployeesOk = '[Employees] search ok',
  SearchEmployeesError = '[Employees] search error',

  SyncEmployeesByCsv = '[Employees] sync by csv',
  SyncEmployeesByCsvOk = '[Employees] sync by csv ok',
  SyncEmployeesByCsvError = '[Employees] sync by csv error',
}

export class SearchEmployees implements Action {
  public readonly type = EmployeesActionTypes.SearchEmployees;
  public constructor(public payload: any = {}) { }
}

export class SearchEmployeesOk implements Action {
  public readonly type = EmployeesActionTypes.SearchEmployeesOk;
  public constructor(public payload: Pagination<EmployeeInterface>) { }
}

export class SearchEmployeesError implements Action {
  public readonly type = EmployeesActionTypes.SearchEmployeesError;
  public constructor(public payload: any) { }
}

export class SyncEmployeesByCsv implements Action {
  public readonly type = EmployeesActionTypes.SyncEmployeesByCsv;
  public constructor(public payload: any) { }
}

export class SyncEmployeesByCsvOk implements Action {
  public readonly type = EmployeesActionTypes.SyncEmployeesByCsvOk;
}

export class SyncEmployeesByCsvError implements Action {
  public readonly type = EmployeesActionTypes.SyncEmployeesByCsvError;
  public constructor(public payload: any) { }
}

export type EmployeesAction =
  | SearchEmployees
  | SearchEmployeesOk
  | SearchEmployeesError
  | SyncEmployeesByCsv
  | SyncEmployeesByCsvOk
  | SyncEmployeesByCsvError;

export const fromEmployeesActions = {
  SearchEmployees,
  SearchEmployeesOk,
  SearchEmployeesError,
  SyncEmployeesByCsv,
  SyncEmployeesByCsvOk,
  SyncEmployeesByCsvError,
};
