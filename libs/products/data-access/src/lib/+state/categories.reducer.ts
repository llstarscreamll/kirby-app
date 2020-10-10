import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ICategory } from '@kirby/products/data';
import * as CategoriesActions from './categories.actions';
import { Pagination, emptyPagination, ApiError } from '@kirby/shared';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface State extends EntityState<ICategory> {
  paginated: Pagination<ICategory>;
  paginationStatus: boolean;
  selected?: ICategory;
  error?: ApiError | null;
}

export interface CategoriesPartialState {
  readonly [CATEGORIES_FEATURE_KEY]: State;
}

export const categoriesAdapter: EntityAdapter<ICategory> = createEntityAdapter<
  ICategory
>();

export const initialState: State = categoriesAdapter.getInitialState({
  paginationStatus: false,
  paginated: emptyPagination(),
});

const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.searchCategories, (state) => ({
    ...state,
    error: null,
    paginationStatus: false,
  })),
  on(CategoriesActions.searchCategoriesOk, (state, { response }) => ({
    ...state,
    paginated: response,
    paginationStatus: true,
  })),
  on(CategoriesActions.searchCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(CategoriesActions.getCategoryBySlugOk, (state, { category }) => ({
    ...state,
    selected: category,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return categoriesReducer(state, action);
}
