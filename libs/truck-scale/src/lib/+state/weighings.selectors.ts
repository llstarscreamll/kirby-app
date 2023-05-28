import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEIGHINGS_FEATURE_KEY, WeighingsState, adapter } from './weighings.reducer';

const { selectAll } = adapter.getSelectors();
const selectWeighingsState = createFeatureSelector<WeighingsState>(WEIGHINGS_FEATURE_KEY);
export const selectVehicles = createSelector(selectWeighingsState, (state: WeighingsState) => state.vehicles || []);
export const selectDrivers = createSelector(selectWeighingsState, (state: WeighingsState) => state.drivers || []);
export const selectWeighings = createSelector(selectWeighingsState, (state: WeighingsState) => selectAll(state));
export const selectError = createSelector(selectWeighingsState, (state: WeighingsState) => state.error);
