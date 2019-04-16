import { Action } from '@ngrx/store';

import { Pagination, ApiError } from '@llstarscreamll/shared';
import { TimeClockLogInterface } from '@llstarscreamll/time-clock-logs/util';

export enum TimeClockLogsActionTypes {
  SearchTimeClockLogs = '[TimeClockLogs] search',
  SearchTimeClockLogsOk = '[TimeClockLogs] search ok',
  SearchTimeClockLogsError = '[TimeClockLogs] search error',

  CreateTimeClockLog = '[TimeClockLogs] create',
  CreateTimeClockLogOk = '[TimeClockLogs] create ok',
  CreateTimeClockLogError = '[TimeClockLogs] create error',

  GetTimeClockLog = '[TimeClockLogs] get',
  GetTimeClockLogOk = '[TimeClockLogs] get ok',
  GetTimeClockLogError = '[TimeClockLogs] get error',

  UpdateTimeClockLog = '[TimeClockLogs] update',
  UpdateTimeClockLogOk = '[TimeClockLogs] update ok',
  UpdateTimeClockLogError = '[TimeClockLogs] update error',

  DeleteTimeClockLog = '[TimeClockLogs] delete',
  DeleteTimeClockLogOk = '[TimeClockLogs] delete ok',
  DeleteTimeClockLogError = '[TimeClockLogs] delete error',
}

export class SearchTimeClockLogs implements Action {
  readonly type = TimeClockLogsActionTypes.SearchTimeClockLogs;
  public constructor(public payload: any) { }
}

export class SearchTimeClockLogsOk implements Action {
  readonly type = TimeClockLogsActionTypes.SearchTimeClockLogsOk;
  constructor(public payload: Pagination<TimeClockLogInterface>) { }
}

export class SearchTimeClockLogsError implements Action {
  readonly type = TimeClockLogsActionTypes.SearchTimeClockLogsError;
  constructor(public payload: ApiError) { }
}

export class CreateTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.CreateTimeClockLog;
  public constructor(public payload: TimeClockLogInterface) { }
}

export class CreateTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.CreateTimeClockLogOk;
  constructor(public payload: TimeClockLogInterface) { }
}

export class CreateTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.CreateTimeClockLogError;
  constructor(public payload: ApiError) { }
}

export class GetTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockLog;
  public constructor(public payload: string) { }
}

export class GetTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockLogOk;
  constructor(public payload: TimeClockLogInterface) { }
}

export class GetTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockLogError;
  constructor(public payload: ApiError) { }
}

export class UpdateTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.UpdateTimeClockLog;
  public constructor(public payload: { id: string, data: TimeClockLogInterface }) { }
}

export class UpdateTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.UpdateTimeClockLogOk;
  constructor(public payload: TimeClockLogInterface) { }
}

export class UpdateTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.UpdateTimeClockLogError;
  constructor(public payload: ApiError) { }
}

export class DeleteTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.DeleteTimeClockLog;
  public constructor(public payload: string) { }
}

export class DeleteTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.DeleteTimeClockLogOk;
  constructor(public payload: string) { }
}

export class DeleteTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.DeleteTimeClockLogError;
  constructor(public payload: ApiError) { }
}

export type TimeClockLogsAction =
  | SearchTimeClockLogs
  | SearchTimeClockLogsOk
  | SearchTimeClockLogsError
  | CreateTimeClockLog
  | CreateTimeClockLogOk
  | CreateTimeClockLogError
  | GetTimeClockLog
  | GetTimeClockLogOk
  | GetTimeClockLogError
  | UpdateTimeClockLog
  | UpdateTimeClockLogOk
  | UpdateTimeClockLogError
  | DeleteTimeClockLog
  | DeleteTimeClockLogOk
  | DeleteTimeClockLogError;

export const fromTimeClockLogsActions = {
  SearchTimeClockLogs,
  SearchTimeClockLogsOk,
  SearchTimeClockLogsError,
  CreateTimeClockLog,
  CreateTimeClockLogOk,
  CreateTimeClockLogError,
  GetTimeClockLog,
  GetTimeClockLogOk,
  GetTimeClockLogError,
  UpdateTimeClockLog,
  UpdateTimeClockLogOk,
  UpdateTimeClockLogError,
  DeleteTimeClockLog,
  DeleteTimeClockLogOk,
  DeleteTimeClockLogError,
};
