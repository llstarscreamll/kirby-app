import { Action } from '@ngrx/store';

import { Pagination, ApiError } from '@llstarscreamll/shared';
import { TimeClockLogModel } from '@llstarscreamll/time-clock-logs/util';

export enum TimeClockLogsActionTypes {
  SearchTimeClockLogs = '[TimeClockLogs] search',
  SearchTimeClockLogsOk = '[TimeClockLogs] search ok',
  SearchTimeClockLogsError = '[TimeClockLogs] search error',

  CreateTimeClockLog = '[TimeClockLogs] create',
  CreateTimeClockLogOk = '[TimeClockLog] create ok',
  CreateTimeClockLogError = '[TimeClockLog] create error',

  CreateEntryAndExitLog = '[EntryAndExitLog] create entry and exit',
  CreateEntryAndExitLogOk = '[EntryAndExitLog] create entry and exit ok',
  CreateEntryAndExitLogError = '[EntryAndExitLog] create entry and exit error',

  GetTimeClockLog = '[TimeClockLog] get',
  GetTimeClockLogOk = '[TimeClockLog] get ok',
  GetTimeClockLogError = '[TimeClockLog] get error',

  UpdateTimeClockLog = '[TimeClockLog] update',
  UpdateTimeClockLogOk = '[TimeClockLog] update ok',
  UpdateTimeClockLogError = '[TimeClockLog] update error',

  DeleteTimeClockLog = '[TimeClockLog] delete',
  DeleteTimeClockLogOk = '[TimeClockLog] delete ok',
  DeleteTimeClockLogError = '[TimeClockLog] delete error',

  CleanError = '[TimeClockLog] clean error',
}

export class SearchTimeClockLogs implements Action {
  readonly type = TimeClockLogsActionTypes.SearchTimeClockLogs;
  public constructor(public payload: any) { }
}

export class SearchTimeClockLogsOk implements Action {
  readonly type = TimeClockLogsActionTypes.SearchTimeClockLogsOk;
  constructor(public payload: Pagination<TimeClockLogModel>) { }
}

export class SearchTimeClockLogsError implements Action {
  readonly type = TimeClockLogsActionTypes.SearchTimeClockLogsError;
  constructor(public payload: ApiError) { }
}

export class CreateTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.CreateTimeClockLog;
  public constructor(public payload: TimeClockLogModel) { }
}

export class CreateTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.CreateTimeClockLogOk;
  constructor(public payload: TimeClockLogModel) { }
}

export class CreateTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.CreateTimeClockLogError;
  constructor(public payload: ApiError) { }
}

export class CreateEntryAndExitLog implements Action {
  readonly type = TimeClockLogsActionTypes.CreateEntryAndExitLog;
  public constructor(public payload: { identification_code: string, action: string }) { }
}

export class CreateEntryAndExitLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.CreateEntryAndExitLogOk;
  constructor(public payload: any) { }
}

export class CreateEntryAndExitLogError implements Action {
  readonly type = TimeClockLogsActionTypes.CreateEntryAndExitLogError;
  constructor(public payload: ApiError) { }
}

export class GetTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockLog;
  public constructor(public payload: string) { }
}

export class GetTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockLogOk;
  constructor(public payload: TimeClockLogModel) { }
}

export class GetTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockLogError;
  constructor(public payload: ApiError) { }
}

export class UpdateTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.UpdateTimeClockLog;
  public constructor(public payload: { id: string, data: TimeClockLogModel }) { }
}

export class UpdateTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.UpdateTimeClockLogOk;
  constructor(public payload: TimeClockLogModel) { }
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

export class CleanError implements Action {
  readonly type = TimeClockLogsActionTypes.CleanError;
}

export type TimeClockLogsAction =
  | SearchTimeClockLogs
  | SearchTimeClockLogsOk
  | SearchTimeClockLogsError
  | CreateTimeClockLog
  | CreateTimeClockLogOk
  | CreateTimeClockLogError
  | CreateEntryAndExitLog
  | CreateEntryAndExitLogOk
  | CreateEntryAndExitLogError
  | GetTimeClockLog
  | GetTimeClockLogOk
  | GetTimeClockLogError
  | UpdateTimeClockLog
  | UpdateTimeClockLogOk
  | UpdateTimeClockLogError
  | DeleteTimeClockLog
  | DeleteTimeClockLogOk
  | DeleteTimeClockLogError
  | CleanError;

export const fromTimeClockLogsActions = {
  SearchTimeClockLogs,
  SearchTimeClockLogsOk,
  SearchTimeClockLogsError,
  CreateTimeClockLog,
  CreateTimeClockLogOk,
  CreateTimeClockLogError,
  CreateEntryAndExitLog,
  CreateEntryAndExitLogOk,
  CreateEntryAndExitLogError,
  GetTimeClockLog,
  GetTimeClockLogOk,
  GetTimeClockLogError,
  UpdateTimeClockLog,
  UpdateTimeClockLogOk,
  UpdateTimeClockLogError,
  DeleteTimeClockLog,
  DeleteTimeClockLogOk,
  DeleteTimeClockLogError,
  CleanError
};
