import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { WorkShiftsAction, WorkShiftsActionTypes } from './work-shifts.actions';
import { Pagination, emptyPagination, ApiError, LoadStatus } from '@kirby/shared';

export const WORK_SHIFTS_FEATURE_KEY = 'workShifts';

export interface WorkShiftsState {
  paginatedList: Pagination<WorkShiftInterface>;
  paginatingStatus: LoadStatus;
  selectingStatus?: LoadStatus;
  creatingStatus?: LoadStatus;
  updatingStatus?: LoadStatus;
  deletingStatus?: LoadStatus;
  selected?: WorkShiftInterface;
  error?: ApiError;
}

export interface WorkShiftsPartialState {
  readonly [WORK_SHIFTS_FEATURE_KEY]: WorkShiftsState;
}

export const initialState: WorkShiftsState = {
  paginatedList: emptyPagination(),
  paginatingStatus: LoadStatus.Empty,
};

export function workShiftsReducer(state: WorkShiftsState = initialState, action: WorkShiftsAction): WorkShiftsState {
  switch (action.type) {
    case WorkShiftsActionTypes.SearchWorkShifts: {
      state = { ...state, paginatingStatus: LoadStatus.Loading };
      break;
    }

    case WorkShiftsActionTypes.SearchWorkShiftsOk: {
      state = {
        ...state,
        error: null,
        paginatedList: action.payload,
        paginatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case WorkShiftsActionTypes.SearchWorkShiftsError: {
      state = {
        ...state,
        error: action.payload,
        paginatingStatus: LoadStatus.Error,
      };
      break;
    }

    case WorkShiftsActionTypes.CreateWorkShift: {
      state = { ...state, creatingStatus: LoadStatus.Loading };
      break;
    }

    case WorkShiftsActionTypes.CreateWorkShiftOk: {
      state = { ...state, creatingStatus: LoadStatus.Completed, error: null };
      break;
    }

    case WorkShiftsActionTypes.CreateWorkShiftError: {
      state = {
        ...state,
        error: action.payload,
        creatingStatus: LoadStatus.Error,
      };
      break;
    }

    case WorkShiftsActionTypes.GetWorkShift: {
      state = { ...state, selectingStatus: LoadStatus.Loading };
      break;
    }

    case WorkShiftsActionTypes.GetWorkShiftOk: {
      state = {
        ...state,
        error: null,
        selected: action.payload,
        selectingStatus: LoadStatus.Completed,
      };
      break;
    }

    case WorkShiftsActionTypes.GetWorkShiftError: {
      state = {
        ...state,
        error: action.payload,
        selected: null,
        selectingStatus: LoadStatus.Error,
      };
      break;
    }

    case WorkShiftsActionTypes.UpdateWorkShift: {
      state = { ...state, updatingStatus: LoadStatus.Loading };
      break;
    }

    case WorkShiftsActionTypes.UpdateWorkShiftOk: {
      state = {
        ...state,
        error: null,
        selected: action.payload,
        updatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case WorkShiftsActionTypes.UpdateWorkShiftError: {
      state = {
        ...state,
        error: action.payload,
        updatingStatus: LoadStatus.Error,
      };
      break;
    }

    case WorkShiftsActionTypes.DeleteWorkShift: {
      state = { ...state, deletingStatus: LoadStatus.Loading };
      break;
    }

    case WorkShiftsActionTypes.DeleteWorkShiftOk: {
      state = {
        ...state,
        deletingStatus: LoadStatus.Completed,
        error: null,
        paginatedList: {
          ...state.paginatedList,
          data: state.paginatedList.data.filter((i) => i.id !== action.payload),
        },
      };
      break;
    }

    case WorkShiftsActionTypes.DeleteWorkShiftError: {
      state = {
        ...state,
        error: action.payload,
        deletingStatus: LoadStatus.Error,
      };
      break;
    }
  }
  return state;
}
