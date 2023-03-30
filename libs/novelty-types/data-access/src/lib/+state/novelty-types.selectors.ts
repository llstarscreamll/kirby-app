import { createFeatureSelector, createSelector } from '@ngrx/store';

import { NOVELTY_TYPES_FEATURE_KEY, NoveltyTypesState } from './novelty-types.reducer';

const selectFeature = (state) => state[NOVELTY_TYPES_FEATURE_KEY];
export const getPaginated = createSelector(selectFeature, (s: NoveltyTypesState) => s.paginatedList);
export const getSelected = createSelector(selectFeature, (s: NoveltyTypesState) => s.selected);
export const getError = createSelector(selectFeature, (s: NoveltyTypesState) => s.error);
