import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TIME_CLOCK_LOGS_FEATURE_KEY, TimeClockLogsState } from './time-clock-logs.reducer';
import { ApiError } from '@llstarscreamll/shared';
import { get, isArray } from 'lodash';

const getTimeClockLogsState = createFeatureSelector<TimeClockLogsState>(TIME_CLOCK_LOGS_FEATURE_KEY);
const getPaginatedTimeClockLogs = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => state.paginatedList);
const getPaginatingStatus = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => state.paginatingStatus);
const getSelectedTimeClockLog = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => state.selected);
const getSelectingStatus = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => state.selectingStatus);
const getCreatingStatus = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => state.creatingStatus);
const getUpdatingStatus = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => state.updatingStatus);
const getDeletingStatus = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => state.deletingStatus);
const getError = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => state.error);
const getSubCostCenters = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => state.subCostCenters);
const getEmployeeTimeClockData = createSelector(getTimeClockLogsState, (state: TimeClockLogsState) => getEmployeeTimeClockDataFromApiError(state.error));

export const timeClockLogsQuery = {
  getPaginatedTimeClockLogs,
  getPaginatingStatus,
  getSelectedTimeClockLog,
  getSelectingStatus,
  getCreatingStatus,
  getUpdatingStatus,
  getDeletingStatus,
  getError,
  getSubCostCenters,
  getEmployeeTimeClockData,
};

function getEmployeeTimeClockDataFromApiError(apiError: ApiError) {
  const knownErrorCodes = [1051, 1053, 1054, 1055, 1056];
  let errors: any[] = get(apiError, 'error.errors', []);
  errors = isArray(errors) ? errors : [];
  const firstErrorOccurrence = errors.filter(error => knownErrorCodes.includes(error.code)).shift();


  return get(firstErrorOccurrence, 'meta');
}