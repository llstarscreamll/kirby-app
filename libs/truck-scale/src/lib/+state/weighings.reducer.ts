import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ApiError } from '@kirby/shared';

import { actions as a } from './weighings.actions';
import { WeighingsEntity } from './weighings.models';

export const WEIGHINGS_FEATURE_KEY = 'weighings';

export interface WeighingsState extends EntityState<WeighingsEntity> {
  loaded: boolean;
  error: ApiError | null;
}

export interface WeighingsPartialState {
  readonly [WEIGHINGS_FEATURE_KEY]: WeighingsState;
}

export const adapter: EntityAdapter<WeighingsEntity> = createEntityAdapter<WeighingsEntity>();

export const initialWeighingsState: WeighingsState = adapter.getInitialState({
  loaded: false,
  error: null,
});

const reducer = createReducer(
  initialWeighingsState,
  on(a.searchWeighingsOk, (state, { weighings }) => adapter.setAll(weighings, { ...state, loaded: true })),
  on(a.searchWeighingsError, (state, { error }) => ({ ...state, error }))
);

export function weighingsReducer(state: WeighingsState | undefined, action: Action) {
  return reducer(state, action);
}
