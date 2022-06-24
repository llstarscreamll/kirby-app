import { get } from 'lodash-es';
import { User } from '@kirby/users/util';
import { TimeClockLogModel } from '@kirby/time-clock-logs/util';
import { TimeClockLogsAction, TimeClockLogsActionTypes } from './time-clock-logs.actions';
import { ApiError, Pagination, LoadStatus, emptyPagination } from '@kirby/shared';

export const TIME_CLOCK_LOGS_FEATURE_KEY = 'timeClockLogs';

export interface TimeClockLogsState {
  paginatedList: Pagination<TimeClockLogModel>;
  paginatingStatus: LoadStatus;
  selectingStatus?: LoadStatus;
  creatingStatus?: LoadStatus;
  updatingStatus?: LoadStatus;
  deletingStatus?: LoadStatus;
  selected?: TimeClockLogModel;
  employeeTimeClockData?: any;
  peopleInside?: number;
  /**
   * @todo move this property and all related stuff to a proper lib/entity/reducer/effect/service
   */
  subCostCenters?: any[];
  error?: ApiError;
}

export interface TimeClockLogsPartialState {
  readonly [TIME_CLOCK_LOGS_FEATURE_KEY]: TimeClockLogsState;
}

export const initialState: TimeClockLogsState = {
  paginatedList: emptyPagination(),
  paginatingStatus: LoadStatus.Empty,
};

export function timeClockLogsReducer(
  state: TimeClockLogsState = initialState,
  action: TimeClockLogsAction
): TimeClockLogsState {
  switch (action.type) {
    case TimeClockLogsActionTypes.SearchTimeClockLogs: {
      state = { ...state, paginatingStatus: LoadStatus.Loading };
      break;
    }

    case TimeClockLogsActionTypes.SearchTimeClockLogsOk: {
      state = {
        ...state,
        paginatedList: action.payload,
        selectingStatus: LoadStatus.Completed,
      };
      break;
    }

    case TimeClockLogsActionTypes.SearchTimeClockLogsError: {
      state = {
        ...state,
        error: action.payload,
        paginatingStatus: LoadStatus.Error,
      };
      break;
    }

    case TimeClockLogsActionTypes.GetTimeClockStatisticsOk: {
      state = {
        ...state,
        peopleInside: action.payload.data.people_inside_count,
      };
      break;
    }

    case TimeClockLogsActionTypes.GetTimeClockStatisticsError: {
      state = {
        ...state,
        error: action.payload,
      };
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
      state = { ...state, creatingStatus: LoadStatus.Loading };
      break;
    }

    case TimeClockLogsActionTypes.CreateTimeClockLogOk: {
      state = { ...state, creatingStatus: LoadStatus.Completed, error: null };
      break;
    }

    case TimeClockLogsActionTypes.CreateTimeClockLogError: {
      state = {
        ...state,
        error: action.payload,
        creatingStatus: LoadStatus.Error,
      };
      break;
    }

    case TimeClockLogsActionTypes.CreateEntryAndExitLog: {
      state = { ...state, creatingStatus: LoadStatus.Loading, error: null };
      break;
    }

    case TimeClockLogsActionTypes.CreateEntryAndExitLogOk: {
      state = { ...state, creatingStatus: LoadStatus.Completed, error: null, subCostCenters: null };
      break;
    }

    case TimeClockLogsActionTypes.CreateEntryAndExitLogError: {
      state = {
        ...state,
        error: action.payload,
        creatingStatus: LoadStatus.Error,
      };
      break;
    }

    case TimeClockLogsActionTypes.GetTimeClockLog: {
      state = { ...state, selectingStatus: LoadStatus.Loading };
      break;
    }

    case TimeClockLogsActionTypes.GetTimeClockLogOk: {
      state = {
        ...state,
        selected: action.payload,
        selectingStatus: LoadStatus.Completed,
      };
      break;
    }

    case TimeClockLogsActionTypes.GetTimeClockLogError: {
      state = {
        ...state,
        error: action.payload,
        selected: null,
        selectingStatus: LoadStatus.Error,
      };
      break;
    }

    case TimeClockLogsActionTypes.UpdateTimeClockLog: {
      state = { ...state, updatingStatus: LoadStatus.Loading };
      break;
    }

    case TimeClockLogsActionTypes.UpdateTimeClockLogOk: {
      state = {
        ...state,
        selected: action.payload,
        updatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case TimeClockLogsActionTypes.UpdateTimeClockLogError: {
      state = {
        ...state,
        error: action.payload,
        updatingStatus: LoadStatus.Error,
      };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLog: {
      state = { ...state, deletingStatus: LoadStatus.Loading };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLogOk: {
      state = { ...state, deletingStatus: LoadStatus.Completed };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLogError: {
      state = {
        ...state,
        error: action.payload,
        deletingStatus: LoadStatus.Error,
      };
      break;
    }

    case TimeClockLogsActionTypes.ApproveTimeClockLog: {
      state = {
        ...state,
        paginatedList: appendApproverToEntity(state.paginatedList, action.timeClockLogId, action.user),
      };
      break;
    }

    case TimeClockLogsActionTypes.ApproveTimeClockLogError: {
      state = {
        ...state,
        paginatedList: removeApproverToEntity(state.paginatedList, action.timeClockLogId, action.user),
      };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLogApproval: {
      state = {
        ...state,
        paginatedList: removeApproverToEntity(state.paginatedList, action.timeClockLogId, action.user),
      };
      break;
    }

    case TimeClockLogsActionTypes.DeleteTimeClockLogApprovalError: {
      state = {
        ...state,
        paginatedList: appendApproverToEntity(state.paginatedList, action.timeClockLogId, action.user),
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

function appendApproverToEntity(paginatedTimeClockLogs: Pagination<any>, entityId: string, approver: User) {
  let entities: any[] = get(paginatedTimeClockLogs, 'data', []);

  entities = entities.map((item) => {
    const approvals = item.id === entityId ? [...item.approvals, approver] : item.approvals;

    return { ...item, approvals };
  });

  return { ...paginatedTimeClockLogs, data: entities };
}

function removeApproverToEntity(paginatedTimeClockLogs: Pagination<any>, entityId: string, approver: User) {
  let entities: any[] = get(paginatedTimeClockLogs, 'data', []);

  entities = entities.map((item) => {
    const approvals = item.id === entityId ? item.approvals.filter((a) => a.id !== approver.id) : item.approvals;

    return { ...item, approvals };
  });

  return { ...paginatedTimeClockLogs, data: entities };
}
