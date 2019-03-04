import { Action } from '@ngrx/store';
import { Entity } from './work-shifts.reducer';

export enum WorkShiftsActionTypes {
  LoadWorkShifts = '[WorkShifts] Load WorkShifts',
  WorkShiftsLoaded = '[WorkShifts] WorkShifts Loaded',
  WorkShiftsLoadError = '[WorkShifts] WorkShifts Load Error'
}

export class LoadWorkShifts implements Action {
  readonly type = WorkShiftsActionTypes.LoadWorkShifts;
}

export class WorkShiftsLoadError implements Action {
  readonly type = WorkShiftsActionTypes.WorkShiftsLoadError;
  constructor(public payload: any) {}
}

export class WorkShiftsLoaded implements Action {
  readonly type = WorkShiftsActionTypes.WorkShiftsLoaded;
  constructor(public payload: Entity[]) {}
}

export type WorkShiftsAction =
  | LoadWorkShifts
  | WorkShiftsLoaded
  | WorkShiftsLoadError;

export const fromWorkShiftsActions = {
  LoadWorkShifts,
  WorkShiftsLoaded,
  WorkShiftsLoadError
};
