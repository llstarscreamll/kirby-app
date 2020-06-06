import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COST_CENTERS_FEATURE_KEY,
  CostCentersState
} from './cost-centers.reducer';

// Lookup the 'CostCenters' feature state managed by NgRx
const getCostCentersState = createFeatureSelector<CostCentersState>(
  COST_CENTERS_FEATURE_KEY
);

const getLoaded = createSelector(
  getCostCentersState,
  (state: CostCentersState) => state.loaded
);

const getPaginated = createSelector(
  getCostCentersState,
  (state: CostCentersState) => state.paginatedList
);

const getError = createSelector(
  getCostCentersState,
  (state: CostCentersState) => state.error
);

const getAllCostCenters = createSelector(
  getCostCentersState,
  getLoaded,
  (state: CostCentersState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getCostCentersState,
  (state: CostCentersState) => state.selectedId
);
const getSelectedCostCenters = createSelector(
  getAllCostCenters,
  getSelectedId,
  (costCenters, id) => {
    const result = costCenters.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const costCentersQuery = {
  getLoaded,
  getError,
  getAllCostCenters,
  getSelectedCostCenters,
  getPaginated,
};
