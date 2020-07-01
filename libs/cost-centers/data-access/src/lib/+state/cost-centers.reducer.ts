import {
  CostCentersAction,
  CostCentersActionTypes
} from './cost-centers.actions';
import { CostCenter } from '@kirby/cost-centers/data';
import { Pagination, emptyPagination } from '@kirby/shared';

export const COST_CENTERS_FEATURE_KEY = 'costCenters';

/**
 * Interface for the 'CostCenters' data used in
 *  - CostCentersState, and the reducer function
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface CostCentersState {
  paginatedList: Pagination<CostCenter>;
  error?: any; // last none error (if any)
}

export interface CostCentersPartialState {
  readonly [COST_CENTERS_FEATURE_KEY]: CostCentersState;
}

export const initialState: CostCentersState = {
  paginatedList: emptyPagination()
};

export function reducer(
  state: CostCentersState = initialState,
  action: CostCentersAction
): CostCentersState {
  switch (action.type) {
    case CostCentersActionTypes.SearchCostCentersOk: {
      state = {
        ...state,
        paginatedList: action.payload,
      };
      break;
    }
  }
  return state;
}
