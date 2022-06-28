import { get, isArray } from 'lodash-es';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ApiError } from '@kirby/shared';
import { TimeClockLogModel } from '@kirby/time-clock-logs/util';
import { TIME_CLOCK_LOGS_FEATURE_KEY, TimeClockLogsState } from './time-clock-logs.reducer';

const getTimeClockState = createFeatureSelector<TimeClockLogsState>(TIME_CLOCK_LOGS_FEATURE_KEY);
const getPaginatedTimeClockLogs = createSelector(getTimeClockState, (state: TimeClockLogsState) => ({
  ...state.paginatedList,
  data: TimeClockLogModel.fromJsonList(state.paginatedList.data),
}));
const getPaginatingStatus = createSelector(getTimeClockState, (state: TimeClockLogsState) => state.paginatingStatus);
const getSelectedTimeClockLog = createSelector(getTimeClockState, (state: TimeClockLogsState) => state.selected);
const getError = createSelector(getTimeClockState, (state: TimeClockLogsState) => state.error);
const getSelectingStatus = createSelector(getTimeClockState, (state: TimeClockLogsState) => state.selectingStatus);
const getCreatingStatus = createSelector(getTimeClockState, (state: TimeClockLogsState) => state.creatingStatus);
const getUpdatingStatus = createSelector(getTimeClockState, (state: TimeClockLogsState) => state.updatingStatus);
const getDeletingStatus = createSelector(getTimeClockState, (state: TimeClockLogsState) => state.deletingStatus);
const getSubCostCenters = createSelector(getTimeClockState, (state: TimeClockLogsState) => state.subCostCenters);
const getPeopleInsideCount = createSelector(getTimeClockState, (state: TimeClockLogsState) => state.peopleInside);
const getEmployeeTimeClockData = createSelector(getTimeClockState, (state: TimeClockLogsState) =>
  getEmployeeTimeClockDataFromApiError(state.error)
);

export const timeClockLogsQuery = {
  getPaginatedTimeClockLogs,
  getPeopleInsideCount,
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
  const firstErrorOccurrence = errors.filter((error) => knownErrorCodes.includes(error.code)).shift();

  return get(firstErrorOccurrence, 'meta');
}
