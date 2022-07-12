import { Action } from '@ngrx/store';

import { Pagination, ApiError } from '@kirby/shared';
import { TimeClockLogModel } from '@kirby/time-clock-logs/util';
import { User } from '@kirby/users/util';

export enum TimeClockLogsActionTypes {
  SearchTimeClockLogs = '[TimeClockLogs] search',
  SearchTimeClockLogsOk = '[TimeClockLogs] search ok',
  SearchTimeClockLogsError = '[TimeClockLogs] search error',

  DownloadTimeClockLogs = '[TimeClockLogs] download',
  DownloadTimeClockLogsOk = '[TimeClockLogs] download ok',
  DownloadTimeClockLogsError = '[TimeClockLogs] download error',

  GetTimeClockStatistics = '[TimeClockLogs] get statistics',
  GetTimeClockStatisticsOk = '[TimeClockLogs] get statistics ok',
  GetTimeClockStatisticsError = '[TimeClockLogs] get statistics error',

  GetEmployeeTimeClockData = '[TimeClockLogs] get employee time clock data',
  GetEmployeeTimeClockDataOk = '[TimeClockLogs] get employee time clock data ok',
  GetEmployeeTimeClockDataError = '[TimeClockLogs] get employee time clock data error',

  SearchSubCostCenters = '[TimeClockLogs] search sub cost centers',
  SearchSubCostCentersOk = '[TimeClockLogs] search sub cost centers ok',
  SearchSubCostCentersError = '[TimeClockLogs] search sub cost centers error',

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

  ApproveTimeClockLog = '[TimeClockLogs] approve',
  ApproveTimeClockLogOk = '[TimeClockLog] approve ok',
  ApproveTimeClockLogError = '[TimeClockLog] approve error',

  DeleteTimeClockLogApproval = '[TimeClockLogs] delete approval',
  DeleteTimeClockLogApprovalOk = '[TimeClockLog] delete approval ok',
  DeleteTimeClockLogApprovalError = '[TimeClockLog] delete approval error',

  CleanError = '[TimeClockLog] clean error',
}

export class SearchTimeClockLogs implements Action {
  readonly type = TimeClockLogsActionTypes.SearchTimeClockLogs;
  constructor(public payload: any) {}
}

export class SearchTimeClockLogsOk implements Action {
  readonly type = TimeClockLogsActionTypes.SearchTimeClockLogsOk;
  constructor(public payload: Pagination<TimeClockLogModel>) {}
}

export class SearchTimeClockLogsError implements Action {
  readonly type = TimeClockLogsActionTypes.SearchTimeClockLogsError;
  constructor(public payload: ApiError) {}
}

export class DownloadTimeClockLogs implements Action {
  readonly type = TimeClockLogsActionTypes.DownloadTimeClockLogs;
  constructor(public payload: any) {}
}

export class DownloadTimeClockLogsOk implements Action {
  readonly type = TimeClockLogsActionTypes.DownloadTimeClockLogsOk;
}

export class DownloadTimeClockLogsError implements Action {
  readonly type = TimeClockLogsActionTypes.DownloadTimeClockLogsError;
  constructor(public payload: ApiError) {}
}

export class GetTimeClockStatistics implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockStatistics;
}

export class GetTimeClockStatisticsOk implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockStatisticsOk;
  constructor(public payload: { data: { people_inside_count: number } }) {}
}

export class GetTimeClockStatisticsError implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockStatisticsError;
  constructor(public payload: ApiError) {}
}

export class GetEmployeeTimeClockData implements Action {
  readonly type = TimeClockLogsActionTypes.GetEmployeeTimeClockData;
  constructor(public payload: any) {}
}

export class GetEmployeeTimeClockDataOk implements Action {
  readonly type = TimeClockLogsActionTypes.GetEmployeeTimeClockDataOk;
  constructor(public payload: any) {}
}

export class GetEmployeeTimeClockDataError implements Action {
  readonly type = TimeClockLogsActionTypes.GetEmployeeTimeClockDataError;
  constructor(public payload: ApiError) {}
}

export class SearchSubCostCenters implements Action {
  readonly type = TimeClockLogsActionTypes.SearchSubCostCenters;
  constructor(public payload: any) {}
}

export class SearchSubCostCentersOk implements Action {
  readonly type = TimeClockLogsActionTypes.SearchSubCostCentersOk;
  constructor(public payload: any[]) {}
}

export class SearchSubCostCentersError implements Action {
  readonly type = TimeClockLogsActionTypes.SearchSubCostCentersError;
  constructor(public payload: ApiError) {}
}

export class CreateTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.CreateTimeClockLog;
  constructor(public payload: TimeClockLogModel) {}
}

export class CreateTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.CreateTimeClockLogOk;
  constructor(public payload: TimeClockLogModel) {}
}

export class CreateTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.CreateTimeClockLogError;
  constructor(public payload: ApiError) {}
}

export class CreateEntryAndExitLog implements Action {
  readonly type = TimeClockLogsActionTypes.CreateEntryAndExitLog;
  constructor(public payload: { identification_code: string; action: string }) {}
}

export class CreateEntryAndExitLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.CreateEntryAndExitLogOk;
  constructor(public payload: any) {}
}

export class CreateEntryAndExitLogError implements Action {
  readonly type = TimeClockLogsActionTypes.CreateEntryAndExitLogError;
  constructor(public payload: ApiError) {}
}

export class GetTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockLog;
  constructor(public payload: string) {}
}

export class GetTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockLogOk;
  constructor(public payload: TimeClockLogModel) {}
}

export class GetTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.GetTimeClockLogError;
  constructor(public payload: ApiError) {}
}

export class UpdateTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.UpdateTimeClockLog;
  constructor(public payload: { id: string; data: TimeClockLogModel }) {}
}

export class UpdateTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.UpdateTimeClockLogOk;
  constructor(public payload: TimeClockLogModel) {}
}

export class UpdateTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.UpdateTimeClockLogError;
  constructor(public payload: ApiError) {}
}

export class DeleteTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.DeleteTimeClockLog;
  constructor(public payload: string) {}
}

export class DeleteTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.DeleteTimeClockLogOk;
  constructor(public payload: string) {}
}

export class DeleteTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.DeleteTimeClockLogError;
  constructor(public payload: ApiError) {}
}

export class ApproveTimeClockLog implements Action {
  readonly type = TimeClockLogsActionTypes.ApproveTimeClockLog;
  constructor(public timeClockLogId: string, public user: User) {}
}

export class ApproveTimeClockLogOk implements Action {
  readonly type = TimeClockLogsActionTypes.ApproveTimeClockLogOk;
  constructor(public timeClockLogId: string, public user: User) {}
}

export class ApproveTimeClockLogError implements Action {
  readonly type = TimeClockLogsActionTypes.ApproveTimeClockLogError;
  constructor(public payload: ApiError, public timeClockLogId: string, public user: User) {}
}

export class DeleteTimeClockLogApproval implements Action {
  readonly type = TimeClockLogsActionTypes.DeleteTimeClockLogApproval;
  constructor(public timeClockLogId: string, public user: User) {}
}

export class DeleteTimeClockLogApprovalOk implements Action {
  readonly type = TimeClockLogsActionTypes.DeleteTimeClockLogApprovalOk;
  constructor(public timeClockLogId: string, public user: User) {}
}

export class DeleteTimeClockLogApprovalError implements Action {
  readonly type = TimeClockLogsActionTypes.DeleteTimeClockLogApprovalError;
  constructor(public payload: ApiError, public timeClockLogId: string, public user: User) {}
}

export class CleanError implements Action {
  readonly type = TimeClockLogsActionTypes.CleanError;
}

export type TimeClockLogsAction =
  | SearchTimeClockLogs
  | SearchTimeClockLogsOk
  | SearchTimeClockLogsError
  | DownloadTimeClockLogs
  | DownloadTimeClockLogsOk
  | DownloadTimeClockLogsError
  | GetTimeClockStatistics
  | GetTimeClockStatisticsOk
  | GetTimeClockStatisticsError
  | GetEmployeeTimeClockData
  | GetEmployeeTimeClockDataOk
  | GetEmployeeTimeClockDataError
  | SearchSubCostCenters
  | SearchSubCostCentersOk
  | SearchSubCostCentersError
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
  | ApproveTimeClockLog
  | ApproveTimeClockLogOk
  | ApproveTimeClockLogError
  | DeleteTimeClockLogApproval
  | DeleteTimeClockLogApprovalOk
  | DeleteTimeClockLogApprovalError
  | CleanError;

export const fromTimeClockLogsActions = {
  SearchTimeClockLogs,
  SearchTimeClockLogsOk,
  SearchTimeClockLogsError,
  DownloadTimeClockLogs,
  DownloadTimeClockLogsOk,
  DownloadTimeClockLogsError,
  GetTimeClockStatistics,
  GetTimeClockStatisticsOk,
  GetTimeClockStatisticsError,
  GetEmployeeTimeClockData,
  GetEmployeeTimeClockDataOk,
  GetEmployeeTimeClockDataError,
  SearchSubCostCenters,
  SearchSubCostCentersOk,
  SearchSubCostCentersError,
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
  ApproveTimeClockLog,
  ApproveTimeClockLogOk,
  ApproveTimeClockLogError,
  DeleteTimeClockLogApproval,
  DeleteTimeClockLogApprovalOk,
  DeleteTimeClockLogApprovalError,
  CleanError,
};
