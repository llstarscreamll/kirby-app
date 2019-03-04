import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WORK_SHIFTS_FEATURE_KEY, WorkShiftsState } from './work-shifts.reducer';

// Lookup the 'WorkShifts' feature state managed by NgRx
const getWorkShiftsState = createFeatureSelector<WorkShiftsState>(
  WORK_SHIFTS_FEATURE_KEY
);

const getLoaded = createSelector(
  getWorkShiftsState,
  (state: WorkShiftsState) => state.loaded
);
const getError = createSelector(
  getWorkShiftsState,
  (state: WorkShiftsState) => state.error
);

const getAllWorkShifts = createSelector(
  getWorkShiftsState,
  getLoaded,
  (state: WorkShiftsState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getWorkShiftsState,
  (state: WorkShiftsState) => state.selectedId
);
const getSelectedWorkShifts = createSelector(
  getAllWorkShifts,
  getSelectedId,
  (workShifts, id) => {
    const result = workShifts.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const workShiftsQuery = {
  getLoaded,
  getError,
  getAllWorkShifts,
  getSelectedWorkShifts
};
