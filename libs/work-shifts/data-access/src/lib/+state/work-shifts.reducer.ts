import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { WorkShiftsAction, WorkShiftsActionTypes } from './work-shifts.actions';
import { Pagination, emptyPagination, ApiError, LoadStatuses } from '@kirby/shared';

export const WORK_SHIFTS_FEATURE_KEY = 'workShifts';

export interface WorkShiftsState {
  paginatedList: Pagination<WorkShiftInterface>;
  paginatingStatus: LoadStatuses;
  selectingStatus?: LoadStatuses;
  creatingStatus?: LoadStatuses;
  updatingStatus?: LoadStatuses;
  deletingStatus?: LoadStatuses;
  selected?: WorkShiftInterface;
  error?: ApiError;
}

export interface WorkShiftsPartialState {
  readonly [WORK_SHIFTS_FEATURE_KEY]: WorkShiftsState;
}

export const initialState: WorkShiftsState = {
  paginatedList: emptyPagination(),
  paginatingStatus: LoadStatuses.Empty,
};

export function workShiftsReducer(state: WorkShiftsState = initialState, action: WorkShiftsAction): WorkShiftsState {
  switch (action.type) {
    case WorkShiftsActionTypes.SearchWorkShifts: {
      state = { ...state, paginatingStatus: LoadStatuses.Loading };
      break;
    }

    case WorkShiftsActionTypes.SearchWorkShiftsOk: {
      state = {
        ...state,
        error: null,
        paginatedList: action.payload,
        paginatingStatus: LoadStatuses.Completed,
      };
      break;
    }

    case WorkShiftsActionTypes.SearchWorkShiftsError: {
      state = {
        ...state,
        error: action.payload,
        paginatingStatus: LoadStatuses.Error,
      };
      break;
    }

    case WorkShiftsActionTypes.CreateWorkShift: {
      state = { ...state, creatingStatus: LoadStatuses.Loading };
      break;
    }

    case WorkShiftsActionTypes.CreateWorkShiftOk: {
      state = { ...state, creatingStatus: LoadStatuses.Completed, error: null };
      break;
    }

    case WorkShiftsActionTypes.CreateWorkShiftError: {
      state = {
        ...state,
        error: action.payload,
        creatingStatus: LoadStatuses.Error,
      };
      break;
    }

    case WorkShiftsActionTypes.GetWorkShift: {
      state = { ...state, selectingStatus: LoadStatuses.Loading };
      break;
    }

    case WorkShiftsActionTypes.GetWorkShiftOk: {
      state = {
        ...state,
        error: null,
        selected: action.payload,
        selectingStatus: LoadStatuses.Completed,
      };
      break;
    }

    case WorkShiftsActionTypes.GetWorkShiftError: {
      state = {
        ...state,
        error: action.payload,
        selected: null,
        selectingStatus: LoadStatuses.Error,
      };
      break;
    }

    case WorkShiftsActionTypes.UpdateWorkShift: {
      state = { ...state, updatingStatus: LoadStatuses.Loading };
      break;
    }

    case WorkShiftsActionTypes.UpdateWorkShiftOk: {
      state = {
        ...state,
        error: null,
        selected: action.payload,
        updatingStatus: LoadStatuses.Completed,
      };
      break;
    }

    case WorkShiftsActionTypes.UpdateWorkShiftError: {
      state = {
        ...state,
        error: action.payload,
        updatingStatus: LoadStatuses.Error,
      };
      break;
    }

    case WorkShiftsActionTypes.DeleteWorkShift: {
      state = { ...state, deletingStatus: LoadStatuses.Loading };
      break;
    }

    case WorkShiftsActionTypes.DeleteWorkShiftOk: {
      state = { ...state, deletingStatus: LoadStatuses.Completed, error: null };
      break;
    }

    case WorkShiftsActionTypes.DeleteWorkShiftError: {
      state = {
        ...state,
        error: action.payload,
        deletingStatus: LoadStatuses.Error,
      };
      break;
    }
  }
  return state;
}
