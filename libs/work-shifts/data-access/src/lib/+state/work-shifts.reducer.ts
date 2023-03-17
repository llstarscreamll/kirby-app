import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { workShiftsActionTypes as actions } from './work-shifts.actions';
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

export function workShiftsReducer(state: WorkShiftsState = initialState, action): WorkShiftsState {
  console.warn(action);

  switch (action.type) {
    case actions.search.type: {
      state = { ...state, paginatingStatus: LoadStatus.Loading };
      break;
    }

    case actions.searchOk.type: {
      console.warn('search ok!!');

      state = {
        ...state,
        error: null,
        paginatedList: action.payload,
        paginatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case actions.searchError.type: {
      state = {
        ...state,
        error: action.payload,
        paginatingStatus: LoadStatus.Error,
      };
      break;
    }

    case actions.create.type: {
      state = { ...state, creatingStatus: LoadStatus.Loading };
      break;
    }

    case actions.createOk.type: {
      state = { ...state, creatingStatus: LoadStatus.Completed, error: null };
      break;
    }

    case actions.createError.type: {
      state = {
        ...state,
        error: action.payload,
        creatingStatus: LoadStatus.Error,
      };
      break;
    }

    case actions.get.type: {
      state = { ...state, selectingStatus: LoadStatus.Loading };
      break;
    }

    case actions.getOk.type: {
      state = {
        ...state,
        error: null,
        selected: action.payload,
        selectingStatus: LoadStatus.Completed,
      };
      break;
    }

    case actions.getError.type: {
      state = {
        ...state,
        error: action.payload,
        selected: null,
        selectingStatus: LoadStatus.Error,
      };
      break;
    }

    case actions.update.type: {
      state = { ...state, updatingStatus: LoadStatus.Loading };
      break;
    }

    case actions.updateOk.type: {
      state = {
        ...state,
        error: null,
        selected: action.payload,
        updatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case actions.updateError.type: {
      state = {
        ...state,
        error: action.payload,
        updatingStatus: LoadStatus.Error,
      };
      break;
    }

    case actions.delete.type: {
      state = { ...state, deletingStatus: LoadStatus.Loading };
      break;
    }

    case actions.deleteOk.type: {
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

    case actions.deleteError.type: {
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
