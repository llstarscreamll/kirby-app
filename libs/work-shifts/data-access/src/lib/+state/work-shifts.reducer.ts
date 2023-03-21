import { createFeature, createReducer, on } from '@ngrx/store';

import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { Pagination, emptyPagination, ApiError, LoadStatus } from '@kirby/shared';

import { workShiftsActionTypes as actions } from './work-shifts.actions';

export const WORK_SHIFTS_FEATURE_KEY = 'workShifts';

export interface WorkShiftsState {
  paginatedList: Pagination<WorkShiftInterface>;
  paginatingStatus: LoadStatus;
  selectingStatus: LoadStatus | null;
  creatingStatus: LoadStatus | null;
  updatingStatus: LoadStatus | null;
  deletingStatus: LoadStatus | null;
  selected: WorkShiftInterface | null;
  error: ApiError | null;
}

export interface WorkShiftsPartialState {
  readonly [WORK_SHIFTS_FEATURE_KEY]: WorkShiftsState;
}

export const initialState: WorkShiftsState = {
  paginatedList: emptyPagination(),
  paginatingStatus: LoadStatus.Empty,
  selectingStatus: null,
  creatingStatus: null,
  updatingStatus: null,
  deletingStatus: null,
  selected: null,
  error: null,
};

export const workShiftsReducer = createFeature({
  name: WORK_SHIFTS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(actions.search, (state, action) => ({ ...state, paginatingStatus: LoadStatus.Loading })),

    on(actions.searchOk, (state, action) => ({
      ...state,
      error: null,
      paginatedList: action.payload,
      paginatingStatus: LoadStatus.Completed,
    })),

    on(actions.searchError, (state, action) => ({
      ...state,
      error: action.payload,
      paginatingStatus: LoadStatus.Error,
    })),

    on(actions.create, (state, action) => ({ ...state, creatingStatus: LoadStatus.Loading })),

    on(actions.createOk, (state, action) => ({ ...state, creatingStatus: LoadStatus.Completed, error: null })),

    on(actions.createError, (state, action) => ({
      ...state,
      error: action.payload,
      creatingStatus: LoadStatus.Error,
    })),

    on(actions.get, (state, action) => ({ ...state, selectingStatus: LoadStatus.Loading })),

    on(actions.getOk, (state, action) => ({
      ...state,
      error: null,
      selected: action.payload,
      selectingStatus: LoadStatus.Completed,
    })),

    on(actions.getError, (state, action) => ({
      ...state,
      error: action.payload,
      selected: null,
      selectingStatus: LoadStatus.Error,
    })),

    on(actions.update, (state, action) => ({ ...state, updatingStatus: LoadStatus.Loading })),

    on(actions.updateOk, (state, action) => ({
      ...state,
      error: null,
      selected: action.payload,
      updatingStatus: LoadStatus.Completed,
    })),

    on(actions.updateError, (state, action) => ({
      ...state,
      error: action.payload,
      updatingStatus: LoadStatus.Error,
    })),

    on(actions.delete, (state, action) => ({ ...state, deletingStatus: LoadStatus.Loading })),

    on(actions.deleteOk, (state, action) => ({
      ...state,
      deletingStatus: LoadStatus.Completed,
      error: null,
      paginatedList: {
        ...state.paginatedList,
        data: state.paginatedList.data.filter((i) => i.id !== action.payload),
      },
    })),

    on(actions.deleteError, (state, action) => ({
      ...state,
      error: action.payload,
      deletingStatus: LoadStatus.Error,
    }))
  ),
});
