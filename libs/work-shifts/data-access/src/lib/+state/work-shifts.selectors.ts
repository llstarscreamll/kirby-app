import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WORK_SHIFTS_FEATURE_KEY, WorkShiftsState } from './work-shifts.reducer';

// Lookup the 'WorkShifts' feature state managed by NgRx
const getWorkShiftsState = createFeatureSelector<WorkShiftsState>(WORK_SHIFTS_FEATURE_KEY);

const getLoaded = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.paginatedListLoaded);
const getError = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.error);

const getPaginatedWorkShifts = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.paginatedList);
const getSelectedId = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.selectedId);
const getSelectedWorkShift = createSelector(getPaginatedWorkShifts, getSelectedId, (workShifts, id) => {
  const result = workShifts.data.find(it => it['id'] === id);
  return result ? Object.assign({}, result) : undefined;
});

export const workShiftsQuery = {
  getLoaded,
  getError,
  getPaginatedWorkShifts,
  getSelectedWorkShift,
};
