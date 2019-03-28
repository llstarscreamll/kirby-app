import { Action } from '@ngrx/store';
import { Pagination } from '@llstarscreamll/shared';
import { WorkShiftInterface } from '@llstarscreamll/work-shifts/util/src';

export enum WorkShiftsActionTypes {
  LoadWorkShifts = '[WorkShifts] Load WorkShifts',
  WorkShiftsLoaded = '[WorkShifts] WorkShifts Loaded',
  WorkShiftsLoadError = '[WorkShifts] WorkShifts Load Error'
}

export class PaginateWorkShifts implements Action {
  readonly type = WorkShiftsActionTypes.LoadWorkShifts;
}

export class WorkShiftsLoadError implements Action {
  readonly type = WorkShiftsActionTypes.WorkShiftsLoadError;
  constructor(public payload: any) { }
}

export class WorkShiftsLoaded implements Action {
  readonly type = WorkShiftsActionTypes.WorkShiftsLoaded;
  constructor(public payload: Pagination<WorkShiftInterface>) { }
}

export type WorkShiftsAction =
  | PaginateWorkShifts
  | WorkShiftsLoaded
  | WorkShiftsLoadError;

export const fromWorkShiftsActions = {
  PaginateWorkShifts,
  WorkShiftsLoaded,
  WorkShiftsLoadError
};
