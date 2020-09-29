import { createAction, props } from '@ngrx/store';

import { Category } from '@kirby/products/data';
import { Pagination, ApiError } from '@kirby/shared';

export interface QuerySearch {
  filter?: {
    active?: boolean;
  };
  sort?: 'position';
  include?: string;
}

export const searchCategories = createAction(
  '[Categories] search',
  props<{ query: QuerySearch }>()
);

export const searchCategoriesOk = createAction(
  '[Categories] search ok',
  props<{ response: Pagination<Category> }>()
);

export const searchCategoriesFailure = createAction(
  '[Categories] search error',
  props<{ error: ApiError }>()
);
