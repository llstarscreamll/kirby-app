import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as WeighingsActions from './weighings.actions';
import { WeighingsEntity } from './weighings.models';

export const WEIGHINGS_FEATURE_KEY = 'weighings';

export interface WeighingsState extends EntityState<WeighingsEntity> {
  selectedId?: string | number; // which Weighings record has been selected
  loaded: boolean; // has the Weighings list been loaded
  error?: string | null; // last known error (if any)
}

export interface WeighingsPartialState {
  readonly [WEIGHINGS_FEATURE_KEY]: WeighingsState;
}

export const weighingsAdapter: EntityAdapter<WeighingsEntity> = createEntityAdapter<WeighingsEntity>();

export const initialWeighingsState: WeighingsState = weighingsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialWeighingsState,
  on(WeighingsActions.initWeighings, (state) => ({ ...state, loaded: false, error: null })),
  on(WeighingsActions.loadWeighingsSuccess, (state, { weighings }) =>
    weighingsAdapter.setAll(weighings, { ...state, loaded: true })
  ),
  on(WeighingsActions.loadWeighingsFailure, (state, { error }) => ({ ...state, error }))
);

export function weighingsReducer(state: WeighingsState | undefined, action: Action) {
  return reducer(state, action);
}
