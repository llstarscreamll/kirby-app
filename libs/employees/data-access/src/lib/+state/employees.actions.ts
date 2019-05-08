import { Action } from '@ngrx/store';
import { Entity } from './employees.reducer';

export enum EmployeesActionTypes {
  LoadEmployees = '[Employees] Load Employees',
  EmployeesLoaded = '[Employees] Employees Loaded',
  EmployeesLoadError = '[Employees] Employees Load Error',
  SyncEmployeesByCsvFile = '[Employees] sync by csv file',
  SyncEmployeesByCsvFileOk = '[Employees] sync by csv file ok',
  SyncEmployeesByCsvFileError = '[Employees] sync by csv file error',
}

export class LoadEmployees implements Action {
  public readonly type = EmployeesActionTypes.LoadEmployees;
}

export class EmployeesLoadError implements Action {
  public readonly type = EmployeesActionTypes.EmployeesLoadError;
  public constructor(public payload: any) { }
}

export class EmployeesLoaded implements Action {
  public readonly type = EmployeesActionTypes.EmployeesLoaded;
  public constructor(public payload: Entity[]) { }
}

export class SyncEmployeesByCsvFile implements Action {
  public readonly type = EmployeesActionTypes.SyncEmployeesByCsvFile;
  public constructor(public payload: any) { }
}

export class SyncEmployeesByCsvFileOk implements Action {
  public readonly type = EmployeesActionTypes.SyncEmployeesByCsvFileOk;
}

export class SyncEmployeesByCsvFileError implements Action {
  public readonly type = EmployeesActionTypes.SyncEmployeesByCsvFileError;
  public constructor(public payload: any) { }
}

export type EmployeesAction =
  | LoadEmployees
  | EmployeesLoaded
  | EmployeesLoadError
  | SyncEmployeesByCsvFile
  | SyncEmployeesByCsvFileOk
  | SyncEmployeesByCsvFileError;

export const fromEmployeesActions = {
  LoadEmployees,
  EmployeesLoaded,
  EmployeesLoadError,
  SyncEmployeesByCsvFile,
  SyncEmployeesByCsvFileOk,
  SyncEmployeesByCsvFileError,
};
