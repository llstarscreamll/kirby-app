import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CATEGORIES_FEATURE_KEY,
  State,
  CategoriesPartialState,
  categoriesAdapter,
} from './categories.reducer';
import { Category } from '@kirby/products/data/src';
import { Pagination } from '@kirby/shared';

export const getCategoriesState = createFeatureSelector<
  CategoriesPartialState,
  State
>(CATEGORIES_FEATURE_KEY);

const { selectEntities } = categoriesAdapter.getSelectors();

export const getCategoriesLoaded = createSelector(
  getCategoriesState,
  (state: State) => state.paginationStatus
);

export const getCategoriesError = createSelector(
  getCategoriesState,
  (state: State) => state.error
);

export const getPaginated = createSelector(
  getCategoriesState,
  (state: State): Pagination<Category> => ({
    ...state.paginated,
    data: Category.fromJsonList(state.paginated.data),
  })
);

export const getSelected = createSelector(
  getCategoriesState,
  (state: State) => state.selected
);

export const getCategoriesEntities = createSelector(
  getCategoriesState,
  (state: State) => selectEntities(state)
);
