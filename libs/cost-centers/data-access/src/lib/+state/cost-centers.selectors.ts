import { createFeatureSelector, createSelector } from '@ngrx/store';

import { COST_CENTERS_FEATURE_KEY, CostCentersState } from './cost-centers.reducer';

const selectFeature = (state) => state[COST_CENTERS_FEATURE_KEY];
export const getPaginated = createSelector(selectFeature, (state: CostCentersState) => state.paginatedList);
export const getError = createSelector(selectFeature, (state: CostCentersState) => state.error);
