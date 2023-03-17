import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WORK_SHIFTS_FEATURE_KEY, WorkShiftsState } from './work-shifts.reducer';

const getWorkShiftsState = createFeatureSelector<WorkShiftsState>(WORK_SHIFTS_FEATURE_KEY);
const getPaginatedWorkShifts = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.paginatedList);
const getWorkShiftsList = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.paginatedList.data);
const getSelectedWorkShift = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.selected);
const paginatingStatus = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.paginatingStatus);
const creatingStatus = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.creatingStatus);
const selectingStatus = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.selectingStatus);
const updatingStatus = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.updatingStatus);
const deletingStatus = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.deletingStatus);
const getError = createSelector(getWorkShiftsState, (state: WorkShiftsState) => state.error);

export const workShiftsQuery = {
  getPaginatedWorkShifts,
  getWorkShiftsList,
  paginatingStatus,
  creatingStatus,
  selectingStatus,
  updatingStatus,
  deletingStatus,
  getSelectedWorkShift,
  getError,
};
