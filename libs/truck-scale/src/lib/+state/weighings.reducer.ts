import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ApiError } from '@kirby/shared';

import { actions } from './weighings.actions';
import { WeighingsEntity } from './weighings.models';

export const WEIGHINGS_FEATURE_KEY = 'weighings';

export interface WeighingsState extends EntityState<WeighingsEntity> {
  loaded: boolean;
  error: ApiError | null;
}

export interface WeighingsPartialState {
  readonly [WEIGHINGS_FEATURE_KEY]: WeighingsState;
}

export const weighingsAdapter: EntityAdapter<WeighingsEntity> = createEntityAdapter<WeighingsEntity>();

export const initialWeighingsState: WeighingsState = weighingsAdapter.getInitialState({
  loaded: false,
  error: null,
});

const reducer = createReducer(
  initialWeighingsState,
  on(actions.loadWeighingsSuccess, (state, { weighings }) =>
    weighingsAdapter.setAll(weighings, { ...state, loaded: true })
  ),
  on(actions.loadWeighingsFailure, (state, { error }) => ({ ...state, error }))
);

export function weighingsReducer(state: WeighingsState | undefined, action: Action) {
  return reducer(state, action);
}
