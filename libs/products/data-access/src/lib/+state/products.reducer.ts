import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProductsActions from './products.actions';
import { ProductsEntity } from './products.models';
import { emptyPagination, Pagination } from '@kirby/shared';
import { IProduct } from '@kirby/products/data/src';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface State extends EntityState<ProductsEntity> {
  paginated: Pagination<IProduct>;
  selectedId?: string | number; // which Products record has been selected
  loaded: boolean; // has the Products list been loaded
  error?: string | null; // last known error (if any)
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: State;
}

export const productsAdapter: EntityAdapter<ProductsEntity> = createEntityAdapter<
  ProductsEntity
>();

export const initialState: State = productsAdapter.getInitialState({
  // set initial required properties
  paginated: emptyPagination(),
  loaded: false,
});

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.searchProducts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProductsActions.searchProductsOk, (state, { paginatedProducts }) => ({
    ...state,
    paginated: paginatedProducts,
    loaded: true,
  })),
  on(ProductsActions.searchProductsError, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
