import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProductionActions from './production.actions';
import { ProductionLog } from './production.models';

export const PRODUCTION_FEATURE_KEY = 'production';

export interface State extends EntityState<ProductionLog> {
  selectedId?: string | number; // which Production record has been selected
  loaded: boolean; // has the Production list been loaded
  error?: string | null; // last none error (if any)
}

export interface ProductionPartialState {
  readonly [PRODUCTION_FEATURE_KEY]: State;
}

export const productionAdapter: EntityAdapter<ProductionLog> = createEntityAdapter<ProductionLog>();

export const initialState: State = productionAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const productionReducer = createReducer(
  initialState,
  on(ProductionActions.loadProduction, (state) => ({ ...state, loaded: false, error: null })),
  on(ProductionActions.loadProductionSuccess, (state, { production }) =>
    productionAdapter.addAll(production, { ...state, loaded: true })
  ),
  on(ProductionActions.loadProductionFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return productionReducer(state, action);
}
