import { IProduct } from '@kirby/products/data/src';
import { Pagination } from '@kirby/shared';
import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from './products.models';

export const searchProducts = createAction(
  '[Products] search',
  props<{ query: any }>()
);

export const searchProductsOk = createAction(
  '[Products] search ok',
  props<{ paginatedProducts: Pagination<IProduct> }>()
);

export const searchProductsError = createAction(
  '[Products] search error',
  props<{ error: any }>()
);
