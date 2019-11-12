import { Action } from '@ngrx/store';
import { Pagination, ApiError } from '@kirby/shared';
import { EmployeeInterface } from '@kirby/employees/util';

export enum EmployeesActionTypes {
  SearchEmployees = '[Employees] search',
  SearchEmployeesOk = '[Employees] search ok',
  SearchEmployeesError = '[Employees] search error',

  GetEmployee = '[Employees] get',
  GetEmployeeOk = '[Employees] get ok',
  GetEmployeeError = '[Employees] get error',

  UpdateEmployee = '[Employees] update',
  UpdateEmployeeOk = '[Employees] update ok',
  UpdateEmployeeError = '[Employees] update error',

  SyncEmployeesByCsv = '[Employees] sync by csv',
  SyncEmployeesByCsvOk = '[Employees] sync by csv ok',
  SyncEmployeesByCsvError = '[Employees] sync by csv error'
}

export class SearchEmployees implements Action {
  public readonly type = EmployeesActionTypes.SearchEmployees;
  public constructor(public payload: any = {}) {}
}

export class SearchEmployeesOk implements Action {
  public readonly type = EmployeesActionTypes.SearchEmployeesOk;
  public constructor(public payload: Pagination<EmployeeInterface>) {}
}

export class SearchEmployeesError implements Action {
  public readonly type = EmployeesActionTypes.SearchEmployeesError;
  public constructor(public payload: any) {}
}

export class GetEmployee implements Action {
  public readonly type = EmployeesActionTypes.GetEmployee;
  public constructor(public payload: string) {}
}

export class GetEmployeeOk implements Action {
  public readonly type = EmployeesActionTypes.GetEmployeeOk;
  public constructor(public payload: EmployeeInterface) {}
}

export class GetEmployeeError implements Action {
  public readonly type = EmployeesActionTypes.GetEmployeeError;
  public constructor(public payload: ApiError) {}
}

export class UpdateEmployee implements Action {
  public readonly type = EmployeesActionTypes.UpdateEmployee;
  public constructor(public payload: { employeeId: string; data: any }) {}
}

export class UpdateEmployeeOk implements Action {
  public readonly type = EmployeesActionTypes.UpdateEmployeeOk;
  public constructor(public payload: EmployeeInterface) {}
}

export class UpdateEmployeeError implements Action {
  public readonly type = EmployeesActionTypes.UpdateEmployeeError;
  public constructor(public payload: ApiError) {}
}

export class SyncEmployeesByCsv implements Action {
  public readonly type = EmployeesActionTypes.SyncEmployeesByCsv;
  public constructor(public payload: any) {}
}

export class SyncEmployeesByCsvOk implements Action {
  public readonly type = EmployeesActionTypes.SyncEmployeesByCsvOk;
}

export class SyncEmployeesByCsvError implements Action {
  public readonly type = EmployeesActionTypes.SyncEmployeesByCsvError;
  public constructor(public payload: any) {}
}

export type EmployeesAction =
  | SearchEmployees
  | SearchEmployeesOk
  | SearchEmployeesError
  | GetEmployee
  | GetEmployeeOk
  | GetEmployeeError
  | UpdateEmployee
  | UpdateEmployeeOk
  | UpdateEmployeeError
  | SyncEmployeesByCsv
  | SyncEmployeesByCsvOk
  | SyncEmployeesByCsvError;

export const fromEmployeesActions = {
  SearchEmployees,
  SearchEmployeesOk,
  SearchEmployeesError,
  GetEmployee,
  GetEmployeeOk,
  GetEmployeeError,
  UpdateEmployee,
  UpdateEmployeeOk,
  UpdateEmployeeError,
  SyncEmployeesByCsv,
  SyncEmployeesByCsvOk,
  SyncEmployeesByCsvError
};
