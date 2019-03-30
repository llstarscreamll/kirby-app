import { WorkShiftInterface } from '@llstarscreamll/work-shifts/util/src';
import { Pagination, emptyPagination, ApiError } from '@llstarscreamll/shared';
import { WorkShiftsAction, WorkShiftsActionTypes } from './work-shifts.actions';

export const WORK_SHIFTS_FEATURE_KEY = 'workShifts';

export enum LoadStatuses {
  Empty,
  Loading,
  Completed,
  Error,
}

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
      state = { ...state, paginatedList: action.payload, paginatingStatus: LoadStatuses.Completed };
      break;
    }

    case WorkShiftsActionTypes.SearchWorkShiftsError: {
      state = { ...state, error: action.payload, paginatingStatus: LoadStatuses.Error };
      break;
    }

    case WorkShiftsActionTypes.CreateWorkShift: {
      state = { ...state, creatingStatus: LoadStatuses.Loading };
      break;
    }

    case WorkShiftsActionTypes.CreateWorkShiftOk: {
      state = { ...state, creatingStatus: LoadStatuses.Completed };
      break;
    }

    case WorkShiftsActionTypes.CreateWorkShiftError: {
      state = { ...state, error: action.payload, creatingStatus: LoadStatuses.Error };
      break;
    }

    case WorkShiftsActionTypes.GetWorkShift: {
      state = { ...state, selectingStatus: LoadStatuses.Loading };
      break;
    }

    case WorkShiftsActionTypes.GetWorkShiftOk: {
      state = { ...state, selected: action.payload, selectingStatus: LoadStatuses.Completed };
      break;
    }

    case WorkShiftsActionTypes.GetWorkShiftError: {
      state = { ...state, error: action.payload, selected: null, selectingStatus: LoadStatuses.Error };
      break;
    }

    case WorkShiftsActionTypes.UpdateWorkShift: {
      state = { ...state, updatingStatus: LoadStatuses.Loading };
      break;
    }

    case WorkShiftsActionTypes.UpdateWorkShiftOk: {
      state = { ...state, selected: action.payload, updatingStatus: LoadStatuses.Completed };
      break;
    }

    case WorkShiftsActionTypes.UpdateWorkShiftError: {
      state = { ...state, error: action.payload, updatingStatus: LoadStatuses.Error };
      break;
    }

    case WorkShiftsActionTypes.DeleteWorkShift: {
      state = { ...state, deletingStatus: LoadStatuses.Loading };
      break;
    }

    case WorkShiftsActionTypes.DeleteWorkShiftOk: {
      state = { ...state, deletingStatus: LoadStatuses.Completed };
      break;
    }

    case WorkShiftsActionTypes.DeleteWorkShiftError: {
      state = { ...state, error: action.payload, deletingStatus: LoadStatuses.Error };
      break;
    }

  }
  return state;
}
