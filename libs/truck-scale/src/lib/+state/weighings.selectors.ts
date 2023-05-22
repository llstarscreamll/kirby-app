import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEIGHINGS_FEATURE_KEY, WeighingsState, weighingsAdapter } from './weighings.reducer';

const { selectAll } = weighingsAdapter.getSelectors();
export const selectWeighingsState = createFeatureSelector<WeighingsState>(WEIGHINGS_FEATURE_KEY);
export const selectWeighingsError = createSelector(selectWeighingsState, (state: WeighingsState) => state.error);
export const selectAllWeighings = createSelector(selectWeighingsState, (state: WeighingsState) => selectAll(state));
