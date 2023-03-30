import { createFeature, createReducer, on } from '@ngrx/store';

import { INoveltyType } from '@kirby/novelty-types/data';
import { Pagination, emptyPagination } from '@kirby/shared';

import { noveltyTypesActions as actions } from './novelty-types.actions';

export const NOVELTY_TYPES_FEATURE_KEY = 'noveltyTypes';

export interface NoveltyTypesState {
  paginatedList: Pagination<INoveltyType>;
  selected: INoveltyType | null;
  error: any;
}

export const initialState: NoveltyTypesState = {
  paginatedList: emptyPagination(),
  selected: null,
  error: null,
};

export const reducer = createFeature({
  name: NOVELTY_TYPES_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(actions.searchOk, (state, { payload }) => ({
      ...state,
      paginatedList: payload,
    })),

    on(actions.searchError, (state, { payload }) => ({
      ...state,
      error: payload,
    })),

    on(actions.getOk, (state, { payload }) => ({
      ...state,
      selected: payload,
    })),

    on(actions.getError, (state, { payload }) => ({
      ...state,
      selected: null,
      error: payload,
    })),

    on(actions.createError, (state, { payload }) => ({
      ...state,
      error: payload,
    })),

    on(actions.updateError, (state, { payload }) => ({
      ...state,
      error: payload,
    })),

    on(actions.trashOk, (state, { payload }) => ({
      ...state,
      paginatedList: {
        ...state.paginatedList,
        data: [...state.paginatedList.data.filter((noveltyType) => noveltyType.id !== payload)],
      },
    })),

    on(actions.setError, (state, { payload }) => ({
      ...state,
      error: payload,
    }))
  ),
});
