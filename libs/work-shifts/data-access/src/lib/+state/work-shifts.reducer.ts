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
    on(actions.search, (state) => ({ ...state, paginatingStatus: LoadStatus.Loading })),

    on(actions.searchOk, (state, { payload }) => ({
      ...state,
      error: null,
      paginatedList: payload,
      paginatingStatus: LoadStatus.Completed,
    })),

    on(actions.searchError, (state, { payload }) => ({
      ...state,
      error: payload,
      paginatingStatus: LoadStatus.Error,
    })),

    on(actions.create, (state) => ({ ...state, creatingStatus: LoadStatus.Loading })),

    on(actions.createOk, (state) => ({ ...state, creatingStatus: LoadStatus.Completed, error: null })),

    on(actions.createError, (state, { payload }) => ({
      ...state,
      error: payload,
      creatingStatus: LoadStatus.Error,
    })),

    on(actions.get, (state) => ({ ...state, selectingStatus: LoadStatus.Loading })),

    on(actions.getOk, (state, { payload }) => ({
      ...state,
      error: null,
      selected: payload,
      selectingStatus: LoadStatus.Completed,
    })),

    on(actions.getError, (state, { payload }) => ({
      ...state,
      error: payload,
      selected: null,
      selectingStatus: LoadStatus.Error,
    })),

    on(actions.update, (state) => ({ ...state, updatingStatus: LoadStatus.Loading })),

    on(actions.updateOk, (state, { payload }) => ({
      ...state,
      error: null,
      selected: payload,
      updatingStatus: LoadStatus.Completed,
    })),

    on(actions.updateError, (state, { payload }) => ({
      ...state,
      error: payload,
      updatingStatus: LoadStatus.Error,
    })),

    on(actions.delete, (state) => ({ ...state, deletingStatus: LoadStatus.Loading })),

    on(actions.deleteOk, (state, { payload }) => ({
      ...state,
      deletingStatus: LoadStatus.Completed,
      error: null,
      paginatedList: {
        ...state.paginatedList,
        data: state.paginatedList.data.filter((i) => i.id !== payload),
      },
    })),

    on(actions.deleteError, (state, { payload }) => ({
      ...state,
      error: payload,
      deletingStatus: LoadStatus.Error,
    }))
  ),
});
