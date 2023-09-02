import { createReducer, on, Action } from '@ngrx/store';
import { ApiError, Pagination, emptyPagination } from '@kirby/shared';

import { Driver, Vehicle } from './models';
import { actions as a } from './weighings.actions';

export const WEIGHINGS_FEATURE_KEY = 'weighings';

export interface WeighingsState {
  paginatedWeighings: Pagination<any>;
  selectedWeighing: any | null;
  vehicles: Vehicle[];
  drivers: Driver[];
  clients: { name: string }[];
  commodities: { name: string }[];
  settings: { key: string; value: string }[];
  error: ApiError | null;
}

export interface WeighingsPartialState {
  readonly [WEIGHINGS_FEATURE_KEY]: WeighingsState;
}

export const initialWeighingsState: WeighingsState = {
  paginatedWeighings: emptyPagination(),
  selectedWeighing: null,
  vehicles: [],
  drivers: [],
  clients: [],
  commodities: [],
  settings: [],
  error: null,
};

const reducer = createReducer(
  initialWeighingsState,
  on(a.getWeighingMachineLectureFlagOk, (state, { settings }) => ({ ...state, settings })),
  on(a.searchWeighingsOk, (state, { paginatedWeighings }) => ({ ...state, paginatedWeighings })),
  on(a.getWeighingOk, (state, { data }) => ({ ...state, selectedWeighing: data })),
  on(a.searchVehiclesOk, (state, { vehicles }) => ({ ...state, vehicles })),
  on(a.searchDriversOk, (state, { drivers }) => ({ ...state, drivers })),
  on(a.searchCommoditiesOk, (state, { commodities }) => ({ ...state, commodities })),
  on(a.searchClientsOk, (state, { clients }) => ({ ...state, clients })),
  on(a.createWeighingOk, (state) => ({ ...state, error: null })),
  on(a.updateWeighingOk, (state) => ({ ...state, error: null })),
  on(a.cleanSelected, (state) => ({ ...state, selectedWeighing: null })),
  on(
    a.getWeighingError,
    a.searchDriversError,
    a.searchClientsError,
    a.searchVehiclesError,
    a.createWeighingError,
    a.updateWeighingError,
    a.exportWeighingsError,
    a.searchWeighingsError,
    a.searchCommoditiesError,
    a.manualFinishWeighingError,
    (state, { error }) => ({ ...state, error })
  ),
  on(a.cleanErrors, (state) => ({ ...state, error: null }))
);

export function weighingsReducer(state: WeighingsState | undefined, action: Action) {
  return reducer(state, action);
}
