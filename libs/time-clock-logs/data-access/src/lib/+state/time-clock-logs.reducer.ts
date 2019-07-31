import { get } from 'lodash';
import { UserInterface } from '@llstarscreamll/users/util/src';
import { TimeClockLogModel } from '@llstarscreamll/time-clock-logs/util';
import { TimeClockLogsAction, TimeClockLogsActionTypes } from './time-clock-logs.actions';
import { ApiError, Pagination, LoadStatuses, emptyPagination } from '@llstarscreamll/shared';

export const TIME_CLOCK_LOGS_FEATURE_KEY = 'timeClockLogs';

export interface TimeClockLogsState {
  paginatedList: Pagination<TimeClockLogModel>;
  paginatingStatus: LoadStatuses;
  selectingStatus?: LoadStatuses;
  creatingStatus?: LoadStatuses;
  updatingStatus?: LoadStatuses;
  deletingStatus?: LoadStatuses;
  selected?: TimeClockLogModel;
  employeeTimeClockData?: any;
  /**
   * @todo move this property and al related stuff to a proper lib/entity/reducer/effect/service
   */
  subCostCenters?: any[];
  error?: ApiError;
}

export interface TimeClockLogsPartialState {
  readonly [TIME_CLOCK_LOGS_FEATURE_KEY]: TimeClockLogsState;
}

export const initialState: TimeClockLogsState = {
  paginatedList: emptyPagination(),
  paginatingStatus: LoadStatuses.Empty
};

export function timeClockLogsReducer(state: TimeClockLogsState = initialState, action: TimeClockLogsAction): TimeClockLogsState {
  switch (action.type) {

    case TimeClockLogsActionTypes.SearchTimeClockLogs: {
      state = { ...state, paginatingStatus: LoadStatuses.Loading };
      break;
    }

    case TimeClockLogsActionTypes.SearchTimeClockLogsOk: {
      state = { ...state, paginatedList: action.payload, selectingStatus: LoadStatuses.Completed };
      break;
    }

    case TimeClockLogsActionTypes.SearchTimeClockLogsError: {
      state = { ...state, error: action.payload, paginatingStatus: LoadStatuses.Error };
      break;
    }

    case TimeClockLogsActionTypes.GetEmployeeTimeClockDataOk: {
      state = { ...state, employeeTimeClockData: action.payload };
      break;
    }

    case TimeClockLogsActionTypes.GetEmployeeTimeClockDataError: {
      state = { ...state, error: action.payload };
      break;
    }

    case TimeClockLogsActionTypes.SearchSubCostCentersOk: {
      state = { ...state, subCostCenters: action.payload };
      break;
    }

    case TimeClockLogsActionTypes.SearchSubCostCentersError: {
      state = { ...state, error: action.payload };
      break;
    }

    case TimeClockLogsActionTypes.CreateTimeClockLog: {
      state = { ...state, creatingStatus: LoadStatuses.Loading };
      break;
    }

    case TimeClockLogsActionTypes.CreateTimeClockLogOk: {
      state = { ...state, creatingStatus: LoadStatuses.Completed, error: null };
      break;
    }

    case TimeClockLogsActionTypes.CreateTimeClockLogError: {
      state = { ...state, error: action.payload, creatingStatus: LoadStatuses.Error };
      break;
    }

    case TimeClockLogsActionTypes.CreateEntryAndExitLog: {
      state = { ...state, creatingStatus: LoadStatuses.Loading, error: null };
      break;
    }

    case TimeClockLogsActionTypes.CreateEntryAndExitLogOk: {
      state = { ...state, creatingStatus: LoadStatuses.Completed, error: null };
      break;
    }

    case TimeClockLogsActionTypes.CreateEntryAndExitLogError: {
      state = { ...state, error: action.payload, creatingStatus: LoadStatuses.Error };
      break;
    }

    case TimeClockLogsActionTypes.GetTimeClockLog: {
      state = { ...state, selectingStatus: LoadStatuses.Loading };
      break;
    }

    case TimeClockLogsActionTypes.GetTimeClockLogOk: {
      state = { ...state, selected: action.payload, selectingStatus: LoadStatuses.Completed };
      break;
    }

    case TimeClockLogsActionTypes.GetTimeClockLogError: {
      state = { ...state, error: action.payload, selected: null, selectingStatus: LoadStatuses.Error };
      break;
    }

    case TimeClockLogsActionTypes.UpdateTimeClockLog: {
      state = { ...state, updatingStatus: LoadStatuses.Loading };
      break;
    }

    case TimeClockLogsActionTypes.UpdateTimeClockLogOk: {
      state = { ...state, selected: action.payload, updatingStatus: LoadStatuses.Completed };
      break;
    }

    case TimeClockLogsActionTypes.UpdateTimeClockLogError: {
      state = { ...state, error: action.payload, updatingStatus: LoadStatuses.Error };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLog: {
      state = { ...state, deletingStatus: LoadStatuses.Loading };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLogOk: {
      state = { ...state, deletingStatus: LoadStatuses.Completed };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLogError: {
      state = { ...state, error: action.payload, deletingStatus: LoadStatuses.Error };
      break;
    }

    case TimeClockLogsActionTypes.ApproveTimeClockLog: {
      state = {
        ...state,
        paginatedList: appendApproverToTimeClockLog(state.paginatedList, action.timeClockLogId, action.user)
      };
      break;
    }

    case TimeClockLogsActionTypes.ApproveTimeClockLogError: {
      state = {
        ...state,
        paginatedList: removeApproverToTimeClockLog(state.paginatedList, action.timeClockLogId, action.user)
      };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLogApproval: {
      state = {
        ...state,
        paginatedList: removeApproverToTimeClockLog(state.paginatedList, action.timeClockLogId, action.user)
      };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLogApprovalError: {
      state = {
        ...state,
        paginatedList: appendApproverToTimeClockLog(state.paginatedList, action.timeClockLogId, action.user)
      };
      break;
    }

    case TimeClockLogsActionTypes.CleanError: {
      state = { ...state, error: null };
      break;
    }

  }

  return state;
}

function appendApproverToTimeClockLog(paginatedTimeClockLogs: Pagination<TimeClockLogModel>, timeClockLogId: string, approver: UserInterface) {
  let timeClockLogs: TimeClockLogModel[] = get(paginatedTimeClockLogs, 'data', []);

  timeClockLogs = TimeClockLogModel.fromJsonList(timeClockLogs.map(item => {
    const approvals = item.id == timeClockLogId ? [...item.approvals, approver] : item.approvals;

    return { ...item, approvals };
  }));

  return { ...paginatedTimeClockLogs, data: timeClockLogs };
}

function removeApproverToTimeClockLog(paginatedTimeClockLogs: Pagination<TimeClockLogModel>, timeClockLogId: string, approver: UserInterface) {
  let timeClockLogs: TimeClockLogModel[] = get(paginatedTimeClockLogs, 'data', []);

  timeClockLogs = TimeClockLogModel.fromJsonList(timeClockLogs.map(item => {
    const approvals = item.id == timeClockLogId ? item.approvals.filter(a => a.id != approver.id) : item.approvals;

    return { ...item, approvals };
  }));

  return { ...paginatedTimeClockLogs, data: timeClockLogs };
}
