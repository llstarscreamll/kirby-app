import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WORK_SHIFTS_FEATURE_KEY, WorkShiftsState } from './work-shifts.reducer';

const getWorkShiftsState = createFeatureSelector<WorkShiftsState>(WORK_SHIFTS_FEATURE_KEY);
export const getPaginatedWorkShifts = createSelector(getWorkShiftsState, (s: WorkShiftsState) => s.paginatedList);
export const getWorkShiftsList = createSelector(getWorkShiftsState, (s: WorkShiftsState) => s.paginatedList.data);
export const getSelectedWorkShift = createSelector(getWorkShiftsState, (s: WorkShiftsState) => s.selected);
export const paginatingStatus = createSelector(getWorkShiftsState, (s: WorkShiftsState) => s.paginatingStatus);
export const creatingStatus = createSelector(getWorkShiftsState, (s: WorkShiftsState) => s.creatingStatus);
export const selectingStatus = createSelector(getWorkShiftsState, (s: WorkShiftsState) => s.selectingStatus);
export const updatingStatus = createSelector(getWorkShiftsState, (s: WorkShiftsState) => s.updatingStatus);
export const deletingStatus = createSelector(getWorkShiftsState, (s: WorkShiftsState) => s.deletingStatus);
export const getError = createSelector(getWorkShiftsState, (s: WorkShiftsState) => s.error);
