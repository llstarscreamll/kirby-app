import { ApiError } from '@kirby/shared';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Vehicle, Weighing } from './models';
import { actions as a } from './weighings.actions';

export const WEIGHINGS_FEATURE_KEY = 'weighings';

export interface WeighingsState extends EntityState<Weighing> {
  loaded: boolean;
  vehicles: Vehicle[];
  error: ApiError | null;
}

export interface WeighingsPartialState {
  readonly [WEIGHINGS_FEATURE_KEY]: WeighingsState;
}

export const adapter: EntityAdapter<Weighing> = createEntityAdapter<Weighing>();

export const initialWeighingsState: WeighingsState = adapter.getInitialState({
  loaded: false,
  vehicles: [],
  error: null,
});

const reducer = createReducer(
  initialWeighingsState,
  on(a.searchWeighingsOk, (state, { weighings }) => adapter.setAll(weighings, { ...state, loaded: true })),
  on(a.searchWeighingsError, (state, { error }) => ({ ...state, error })),
  on(a.searchVehiclesOk, (state, { vehicles }) => ({ ...state, vehicles })),
);

export function weighingsReducer(state: WeighingsState | undefined, action: Action) {
  return reducer(state, action);
}
