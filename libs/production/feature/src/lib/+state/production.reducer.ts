import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { LoadStatus } from '@kirby/shared';
import * as actions from './production.actions';
import { IProductionLog } from './production.models';

export const PRODUCTION_FEATURE_KEY = 'production';

export interface State extends EntityState<IProductionLog> {
  pagination?: any;
  selectedId?: string | number;
  loaded: boolean;
  creationStatus: LoadStatus;
  error?: string | null;
  products: any[];
  machines: any[];
  customers: any[];
}

export interface ProductionPartialState {
  readonly [PRODUCTION_FEATURE_KEY]: State;
}

export const productionAdapter: EntityAdapter<IProductionLog> = createEntityAdapter<IProductionLog>();

export const initialState: State = productionAdapter.getInitialState({
  loaded: false,
  creationStatus: LoadStatus.Empty,
  products: [],
  machines: [],
  customers: [],
});

const productionReducer = createReducer(
  initialState,
  on(actions.searchLogs, (state) => ({ ...state, loaded: false, error: null })),
  on(actions.searchLogsOk, (state, { data, meta }) =>
    productionAdapter.setAll(data, { ...state, pagination: meta, loaded: true })
  ),
  on(actions.searchLogsError, (state, { error }) => ({ ...state, error })),

  on(actions.createLogError, (state) => ({ ...state, creationStatus: LoadStatus.Loading, error: null })),
  on(actions.createLogOk, (state, log) =>
    productionAdapter.addOne(log, { ...state, creationStatus: LoadStatus.Completed, error: null })
  ),
  on(actions.createLogError, (state, { error }) => ({ ...state, creationStatus: LoadStatus.Error, error })),

  // ######################################################################## //

  on(actions.searchProducts, (state) => ({ ...state, error: null })),
  on(actions.searchProductsOk, (state, { data }) => ({ ...state, products: data })),
  on(actions.searchProductsError, (state, { error }) => ({ ...state, error })),

  on(actions.searchMachines, (state) => ({ ...state, error: null })),
  on(actions.searchMachinesOk, (state, { data }) => ({ ...state, machines: data })),
  on(actions.searchMachinesError, (state, { error }) => ({ ...state, error })),

  on(actions.searchCustomers, (state) => ({ ...state, error: null })),
  on(actions.searchCustomersOk, (state, { data }) => ({ ...state, customers: data })),
  on(actions.searchCustomersError, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return productionReducer(state, action);
}
