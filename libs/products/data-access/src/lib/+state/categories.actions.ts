import { createAction, props } from '@ngrx/store';

import { Category, ICategory } from '@kirby/products/data';
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

export const getCategoryBySlug = createAction(
  '[Categories] get by slug',
  props<{ slug: string, query: any }>()
);

export const getCategoryBySlugOk = createAction(
  '[Categories] get by slug ok',
  props<{ category: ICategory }>()
);

export const getCategoryBySlugError = createAction(
  '[Categories] get by slug error',
  props<{ error: ApiError }>()
);
