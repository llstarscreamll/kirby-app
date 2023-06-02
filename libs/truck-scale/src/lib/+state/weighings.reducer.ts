import { ApiError, Pagination, emptyPagination } from '@kirby/shared';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Driver, Vehicle, Weighing } from './models';
import { actions as a } from './weighings.actions';

export const WEIGHINGS_FEATURE_KEY = 'weighings';

export interface WeighingsState {
  loaded: boolean;
  paginatedWeighings: Pagination<any>;
  vehicles: Vehicle[];
  drivers: Driver[];
  error: ApiError | null;
}

export interface WeighingsPartialState {
  readonly [WEIGHINGS_FEATURE_KEY]: WeighingsState;
}

export const initialWeighingsState: WeighingsState = {
  loaded: false,
  paginatedWeighings: emptyPagination(),
  vehicles: [],
  drivers: [],
  error: null,
};

const reducer = createReducer(
  initialWeighingsState,
  on(a.searchWeighingsOk, (state, { paginatedWeighings }) => ({ ...state, paginatedWeighings, loaded: true })),
  on(a.searchVehiclesOk, (state, { vehicles }) => ({ ...state, vehicles })),
  on(a.searchDriversOk, (state, { drivers }) => ({ ...state, drivers })),
  on(a.createWeighingOk, (state) => ({ ...state, error: null })),
  on(a.createWeighingError, (state, { error }) => ({ ...state, error })),
  on(a.searchWeighingsError, (state, { error }) => ({ ...state, error })),
  on(a.exportWeighingsError, (state, { error }) => ({ ...state, error })),
  on(a.searchDriversError, (state, { error }) => ({ ...state, error })),
  on(a.searchVehiclesError, (state, { error }) => ({ ...state, error }))
);

export function weighingsReducer(state: WeighingsState | undefined, action: Action) {
  return reducer(state, action);
}
