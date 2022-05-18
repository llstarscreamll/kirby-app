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

  CreateEmployee = '[Employees] create',
  CreateEmployeeOk = '[Employees] create ok',
  CreateEmployeeError = '[Employees] create error',

  UpdateEmployee = '[Employees] update',
  UpdateEmployeeOk = '[Employees] update ok',
  UpdateEmployeeError = '[Employees] update error',

  SearchRoles = '[Employees] search roles',
  SearchRolesOk = '[Employees] search roles ok',
  SearchRolesError = '[Employees] search roles error',
}

export class SearchEmployees implements Action {
  public readonly type = EmployeesActionTypes.SearchEmployees;
  constructor(public payload: any = {}) {}
}

export class SearchEmployeesOk implements Action {
  public readonly type = EmployeesActionTypes.SearchEmployeesOk;
  constructor(public payload: Pagination<EmployeeInterface>) {}
}

export class SearchEmployeesError implements Action {
  public readonly type = EmployeesActionTypes.SearchEmployeesError;
  constructor(public payload: any) {}
}

export class GetEmployee implements Action {
  public readonly type = EmployeesActionTypes.GetEmployee;
  constructor(public payload: string) {}
}

export class GetEmployeeOk implements Action {
  public readonly type = EmployeesActionTypes.GetEmployeeOk;
  constructor(public payload: EmployeeInterface) {}
}

export class GetEmployeeError implements Action {
  public readonly type = EmployeesActionTypes.GetEmployeeError;
  constructor(public payload: ApiError) {}
}

export class UpdateEmployee implements Action {
  public readonly type = EmployeesActionTypes.UpdateEmployee;
  constructor(public payload: { employeeId: string; data: any }) {}
}

export class UpdateEmployeeOk implements Action {
  public readonly type = EmployeesActionTypes.UpdateEmployeeOk;
  constructor(public payload: EmployeeInterface) {}
}

export class UpdateEmployeeError implements Action {
  public readonly type = EmployeesActionTypes.UpdateEmployeeError;
  constructor(public payload: ApiError) {}
}

export class CreateEmployee implements Action {
  public readonly type = EmployeesActionTypes.CreateEmployee;
  constructor(public payload: any) {}
}

export class CreateEmployeeOk implements Action {
  public readonly type = EmployeesActionTypes.CreateEmployeeOk;
  constructor(public payload: EmployeeInterface) {}
}

export class CreateEmployeeError implements Action {
  public readonly type = EmployeesActionTypes.CreateEmployeeError;
  constructor(public payload: ApiError) {}
}

export class SearchRoles implements Action {
  public readonly type = EmployeesActionTypes.SearchRoles;
  constructor(public payload: any = {}) {}
}

export class SearchRolesOk implements Action {
  public readonly type = EmployeesActionTypes.SearchRolesOk;
  constructor(public payload: Pagination<any>) {}
}

export class SearchRolesError implements Action {
  public readonly type = EmployeesActionTypes.SearchRolesError;
  constructor(public payload: any) {}
}

export type EmployeesAction =
  | SearchEmployees
  | SearchEmployeesOk
  | SearchEmployeesError
  | GetEmployee
  | GetEmployeeOk
  | GetEmployeeError
  | CreateEmployee
  | CreateEmployeeOk
  | CreateEmployeeError
  | UpdateEmployee
  | UpdateEmployeeOk
  | UpdateEmployeeError
  | SearchRoles
  | SearchRolesOk
  | SearchRolesError;

export const fromEmployeesActions = {
  SearchEmployees,
  SearchEmployeesOk,
  SearchEmployeesError,
  GetEmployee,
  GetEmployeeOk,
  GetEmployeeError,
  CreateEmployee,
  CreateEmployeeOk,
  CreateEmployeeError,
  UpdateEmployee,
  UpdateEmployeeOk,
  UpdateEmployeeError,
  SearchRoles,
  SearchRolesOk,
  SearchRolesError,
};
