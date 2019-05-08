import { Action } from '@ngrx/store';
import { Entity } from './employees.reducer';

export enum EmployeesActionTypes {
  LoadEmployees = '[Employees] Load Employees',
  EmployeesLoaded = '[Employees] Employees Loaded',
  EmployeesLoadError = '[Employees] Employees Load Error'
}

export class LoadEmployees implements Action {
  readonly type = EmployeesActionTypes.LoadEmployees;
}

export class EmployeesLoadError implements Action {
  readonly type = EmployeesActionTypes.EmployeesLoadError;
  constructor(public payload: any) {}
}

export class EmployeesLoaded implements Action {
  readonly type = EmployeesActionTypes.EmployeesLoaded;
  constructor(public payload: Entity[]) {}
}

export type EmployeesAction =
  | LoadEmployees
  | EmployeesLoaded
  | EmployeesLoadError;

export const fromEmployeesActions = {
  LoadEmployees,
  EmployeesLoaded,
  EmployeesLoadError
};
