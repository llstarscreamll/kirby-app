import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  COST_CENTERS_FEATURE_KEY,
  CostCentersState
} from './cost-centers.reducer';

const getCostCentersState = createFeatureSelector<CostCentersState>(
  COST_CENTERS_FEATURE_KEY
);

const getPaginated = createSelector(
  getCostCentersState,
  (state: CostCentersState) => state.paginatedList
);

const getError = createSelector(
  getCostCentersState,
  (state: CostCentersState) => state.error
);

export const costCentersQuery = {
  getError,
  getPaginated
};
