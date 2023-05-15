import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WEIGHINGS_FEATURE_KEY, WeighingsState, weighingsAdapter } from './weighings.reducer';

// Lookup the 'Weighings' feature state managed by NgRx
export const selectWeighingsState = createFeatureSelector<WeighingsState>(WEIGHINGS_FEATURE_KEY);

const { selectAll, selectEntities } = weighingsAdapter.getSelectors();

export const selectWeighingsLoaded = createSelector(selectWeighingsState, (state: WeighingsState) => state.loaded);

export const selectWeighingsError = createSelector(selectWeighingsState, (state: WeighingsState) => state.error);

export const selectAllWeighings = createSelector(selectWeighingsState, (state: WeighingsState) => selectAll(state));

export const selectWeighingsEntities = createSelector(selectWeighingsState, (state: WeighingsState) =>
  selectEntities(state)
);

export const selectSelectedId = createSelector(selectWeighingsState, (state: WeighingsState) => state.selectedId);

export const selectEntity = createSelector(selectWeighingsEntities, selectSelectedId, (entities, selectedId) =>
  selectedId ? entities[selectedId] : undefined
);
