import { get, isArray } from 'lodash-es';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ApiError } from '@kirby/shared';
import { TimeClockLogModel as Model } from '@kirby/time-clock-logs/util';
import { TIME_CLOCK_LOGS_FEATURE_KEY, TimeClockLogsState } from './time-clock-logs.reducer';

const getFeatureState = createFeatureSelector<TimeClockLogsState>(TIME_CLOCK_LOGS_FEATURE_KEY);
export const getPaginatedTimeClockLogs = createSelector(getFeatureState, (state: TimeClockLogsState) => ({
  ...state.paginatedList,
  data: Model.fromJsonList(state.paginatedList.data),
}));
export const getPaginatingStatus = createSelector(
  getFeatureState,
  (state: TimeClockLogsState) => state.paginatingStatus
);
export const getSelectedTimeClockLog = createSelector(getFeatureState, (state: TimeClockLogsState) => state.selected);
export const getError = createSelector(getFeatureState, (state: TimeClockLogsState) => state.error);
export const getSelectingStatus = createSelector(getFeatureState, (state: TimeClockLogsState) => state.selectingStatus);
export const getCreatingStatus = createSelector(getFeatureState, (state: TimeClockLogsState) => state.creatingStatus);
export const getUpdatingStatus = createSelector(getFeatureState, (state: TimeClockLogsState) => state.updatingStatus);
export const getDeletingStatus = createSelector(getFeatureState, (state: TimeClockLogsState) => state.deletingStatus);
export const getSubCostCenters = createSelector(getFeatureState, (state: TimeClockLogsState) => state.subCostCenters);
export const getPeopleInsideCount = createSelector(getFeatureState, (state: TimeClockLogsState) => state.peopleInside);
export const getEmployeeTimeClockData = createSelector(getFeatureState, (state: TimeClockLogsState) =>
  getEmployeeTimeClockDataFromApiError(state.error)
);

function getEmployeeTimeClockDataFromApiError(apiError: ApiError) {
  const knownErrorCodes = [1051, 1053, 1054, 1055, 1056];
  let errors: any[] = get(apiError, 'error.errors', []);
  errors = isArray(errors) ? errors : [];
  const firstErrorOccurrence = errors.filter((error) => knownErrorCodes.includes(error.code)).shift();

  return get(firstErrorOccurrence, 'meta');
}
