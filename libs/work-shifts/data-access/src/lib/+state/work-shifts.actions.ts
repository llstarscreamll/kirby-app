import { Action } from '@ngrx/store';
import { Pagination, ApiError } from '@kirby/shared';
import { WorkShiftInterface } from '@kirby/work-shifts/util';

export enum WorkShiftsActionTypes {
  SearchWorkShifts = '[WorkShifts] search',
  SearchWorkShiftsOk = '[WorkShifts] search ok',
  SearchWorkShiftsError = '[WorkShifts] search error',

  CreateWorkShift = '[WorkShifts] create',
  CreateWorkShiftOk = '[WorkShifts] create ok',
  CreateWorkShiftError = '[WorkShifts] create error',

  GetWorkShift = '[WorkShifts] get',
  GetWorkShiftOk = '[WorkShifts] get ok',
  GetWorkShiftError = '[WorkShifts] get error',

  UpdateWorkShift = '[WorkShifts] update',
  UpdateWorkShiftOk = '[WorkShifts] update ok',
  UpdateWorkShiftError = '[WorkShifts] update error',

  DeleteWorkShift = '[WorkShifts] delete',
  DeleteWorkShiftOk = '[WorkShifts] delete ok',
  DeleteWorkShiftError = '[WorkShifts] delete error',
}

export class SearchWorkShifts implements Action {
  readonly type = WorkShiftsActionTypes.SearchWorkShifts;
  constructor(public payload: any) { }
}

export class SearchWorkShiftsOk implements Action {
  readonly type = WorkShiftsActionTypes.SearchWorkShiftsOk;
  constructor(public payload: Pagination<WorkShiftInterface>) { }
}

export class SearchWorkShiftsError implements Action {
  readonly type = WorkShiftsActionTypes.SearchWorkShiftsError;
  constructor(public payload: ApiError) { }
}

export class CreateWorkShift implements Action {
  readonly type = WorkShiftsActionTypes.CreateWorkShift;
  constructor(public payload: WorkShiftInterface) { }
}

export class CreateWorkShiftOk implements Action {
  readonly type = WorkShiftsActionTypes.CreateWorkShiftOk;
  constructor(public payload: WorkShiftInterface) { }
}

export class CreateWorkShiftError implements Action {
  readonly type = WorkShiftsActionTypes.CreateWorkShiftError;
  constructor(public payload: ApiError) { }
}

export class GetWorkShift implements Action {
  readonly type = WorkShiftsActionTypes.GetWorkShift;
  constructor(public payload: string) { }
}

export class GetWorkShiftOk implements Action {
  readonly type = WorkShiftsActionTypes.GetWorkShiftOk;
  constructor(public payload: WorkShiftInterface) { }
}

export class GetWorkShiftError implements Action {
  readonly type = WorkShiftsActionTypes.GetWorkShiftError;
  constructor(public payload: ApiError) { }
}

export class UpdateWorkShift implements Action {
  readonly type = WorkShiftsActionTypes.UpdateWorkShift;
  constructor(public payload: { id: string, data: WorkShiftInterface }) { }
}

export class UpdateWorkShiftOk implements Action {
  readonly type = WorkShiftsActionTypes.UpdateWorkShiftOk;
  constructor(public payload: WorkShiftInterface) { }
}

export class UpdateWorkShiftError implements Action {
  readonly type = WorkShiftsActionTypes.UpdateWorkShiftError;
  constructor(public payload: ApiError) { }
}

export class DeleteWorkShift implements Action {
  readonly type = WorkShiftsActionTypes.DeleteWorkShift;
  constructor(public payload: string) { }
}

export class DeleteWorkShiftOk implements Action {
  readonly type = WorkShiftsActionTypes.DeleteWorkShiftOk;
  constructor(public payload: string) { }
}

export class DeleteWorkShiftError implements Action {
  readonly type = WorkShiftsActionTypes.DeleteWorkShiftError;
  constructor(public payload: ApiError) { }
}

export type WorkShiftsAction = SearchWorkShifts
  | SearchWorkShiftsOk
  | SearchWorkShiftsError
  | CreateWorkShift
  | CreateWorkShiftOk
  | CreateWorkShiftError
  | GetWorkShift
  | GetWorkShiftOk
  | GetWorkShiftError
  | UpdateWorkShift
  | UpdateWorkShiftOk
  | UpdateWorkShiftError
  | DeleteWorkShift
  | DeleteWorkShiftOk
  | DeleteWorkShiftError;

export const fromWorkShiftsActions = {
  SearchWorkShifts,
  SearchWorkShiftsOk,
  SearchWorkShiftsError,
  CreateWorkShift,
  CreateWorkShiftOk,
  CreateWorkShiftError,
  GetWorkShift,
  GetWorkShiftOk,
  GetWorkShiftError,
  UpdateWorkShift,
  UpdateWorkShiftOk,
  UpdateWorkShiftError,
  DeleteWorkShift,
  DeleteWorkShiftOk,
  DeleteWorkShiftError,
};
