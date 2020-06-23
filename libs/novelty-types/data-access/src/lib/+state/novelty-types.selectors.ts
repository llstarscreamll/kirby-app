import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  NOVELTY_TYPES_FEATURE_KEY,
  NoveltyTypesState,
} from './novelty-types.reducer';

const getNoveltyTypesState = createFeatureSelector<NoveltyTypesState>(
  NOVELTY_TYPES_FEATURE_KEY
);

const getPaginated = createSelector(
  getNoveltyTypesState,
  (state: NoveltyTypesState) => state.paginatedList
);

const getSelected = createSelector(
  getNoveltyTypesState,
  (state: NoveltyTypesState) => state.selected
);

const getError = createSelector(
  getNoveltyTypesState,
  (state: NoveltyTypesState) => state.error
);

export const noveltyTypesQuery = {
  getError,
  getSelected,
  getPaginated,
};
