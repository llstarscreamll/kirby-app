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
  public readonly type = WorkShiftsActionTypes.SearchWorkShifts;
  public constructor(public payload: any) { }
}

export class SearchWorkShiftsOk implements Action {
  public readonly type = WorkShiftsActionTypes.SearchWorkShiftsOk;
  public constructor(public payload: Pagination<WorkShiftInterface>) { }
}

export class SearchWorkShiftsError implements Action {
  public readonly type = WorkShiftsActionTypes.SearchWorkShiftsError;
  public constructor(public payload: ApiError) { }
}

export class CreateWorkShift implements Action {
  public readonly type = WorkShiftsActionTypes.CreateWorkShift;
  public constructor(public payload: WorkShiftInterface) { }
}

export class CreateWorkShiftOk implements Action {
  public readonly type = WorkShiftsActionTypes.CreateWorkShiftOk;
  public constructor(public payload: WorkShiftInterface) { }
}

export class CreateWorkShiftError implements Action {
  public readonly type = WorkShiftsActionTypes.CreateWorkShiftError;
  public constructor(public payload: ApiError) { }
}

export class GetWorkShift implements Action {
  public readonly type = WorkShiftsActionTypes.GetWorkShift;
  public constructor(public payload: string) { }
}

export class GetWorkShiftOk implements Action {
  public readonly type = WorkShiftsActionTypes.GetWorkShiftOk;
  public constructor(public payload: WorkShiftInterface) { }
}

export class GetWorkShiftError implements Action {
  public readonly type = WorkShiftsActionTypes.GetWorkShiftError;
  public constructor(public payload: ApiError) { }
}

export class UpdateWorkShift implements Action {
  public readonly type = WorkShiftsActionTypes.UpdateWorkShift;
  public constructor(public payload: { id: string, data: WorkShiftInterface }) { }
}

export class UpdateWorkShiftOk implements Action {
  public readonly type = WorkShiftsActionTypes.UpdateWorkShiftOk;
  public constructor(public payload: WorkShiftInterface) { }
}

export class UpdateWorkShiftError implements Action {
  public readonly type = WorkShiftsActionTypes.UpdateWorkShiftError;
  public constructor(public payload: ApiError) { }
}

export class DeleteWorkShift implements Action {
  public readonly type = WorkShiftsActionTypes.DeleteWorkShift;
  public constructor(public payload: string) { }
}

export class DeleteWorkShiftOk implements Action {
  public readonly type = WorkShiftsActionTypes.DeleteWorkShiftOk;
  public constructor(public payload: string) { }
}

export class DeleteWorkShiftError implements Action {
  public readonly type = WorkShiftsActionTypes.DeleteWorkShiftError;
  public constructor(public payload: ApiError) { }
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
