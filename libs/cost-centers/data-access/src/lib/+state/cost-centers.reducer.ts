import { createFeature, createReducer, on } from '@ngrx/store';

import { CostCenter } from '@kirby/cost-centers/data';
import { Pagination, emptyPagination } from '@kirby/shared';
import { costCentersActions as actions } from './cost-centers.actions';

export const COST_CENTERS_FEATURE_KEY = 'costCenters';

export interface CostCentersState {
  paginatedList: Pagination<CostCenter>;
  error: any | null;
}

export const initialState: CostCentersState = {
  paginatedList: emptyPagination(),
  error: null,
};

export const costCentersReducer = createFeature({
  name: COST_CENTERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(actions.searchOk, (state, { payload }) => ({ ...state, paginatedList: payload }))
  ),
});
