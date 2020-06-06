import {
  CostCentersAction,
  CostCentersActionTypes
} from './cost-centers.actions';

import { Pagination, emptyPagination } from '@kirby/shared';
import { CostCenter } from '@kirby/cost-centers/data';

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
  list: Entity[]; // list of CostCenters; analogous to a sql normalized table
  paginatedList: Pagination<CostCenter>;
  selectedId?: string | number; // which CostCenters record has been selected
  loaded: boolean; // has the CostCenters list been loaded
  error?: any; // last none error (if any)
}

export interface CostCentersPartialState {
  readonly [COST_CENTERS_FEATURE_KEY]: CostCentersState;
}

export const initialState: CostCentersState = {
  list: [],
  loaded: false,
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
        loaded: true
      };
      break;
    }
  }
  return state;
}
