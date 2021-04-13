import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductionLog } from './production.models';
import { PRODUCTION_FEATURE_KEY, State, ProductionPartialState, productionAdapter } from './production.reducer';

// Lookup the 'Production' feature state managed by NgRx
export const getProductionState = createFeatureSelector<ProductionPartialState, State>(PRODUCTION_FEATURE_KEY);

const { selectAll, selectEntities } = productionAdapter.getSelectors();

export const getProductionLoaded = createSelector(getProductionState, (state: State) => state.loaded);
export const getCreationStatus = createSelector(getProductionState, (state: State) => state.creationStatus);
export const getProductionError = createSelector(getProductionState, (state: State) => state.error);
export const getProducts = createSelector(getProductionState, (state: State) => state.products);
export const getMachines = createSelector(getProductionState, (state: State) => state.machines);
export const getCustomers = createSelector(getProductionState, (state: State) => state.customers);
export const getProductionLogs = createSelector(getProductionState, (state: State) =>
  ProductionLog.fromJsonList(selectAll(state))
);
export const getProductionEntities = createSelector(getProductionState, (state: State) => selectEntities(state));
export const getSelectedId = createSelector(getProductionState, (state: State) => state.selectedId);

export const getSelected = createSelector(
  getProductionEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
