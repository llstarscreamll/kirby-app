import { createAction, props } from '@ngrx/store';

import { ApiError } from '@kirby/shared';
import { IProduct } from '@kirby/products/data';
import { IShoppingCart } from '../models/shopping-cart';

export const addProduct = createAction(
  '[Shop] add product to shopping cart',
  props<{ product: IProduct }>()
);

export const removeProduct = createAction(
  '[Shop] remove product from shopping cart',
  props<{ product: IProduct }>()
);

export const setShoppingCart = createAction(
  '[Shop] set shopping cart',
  props<{ shoppingCart: IShoppingCart }>()
);

export const setError = createAction(
  '[Shop] set error',
  props<{ error: ApiError }>()
);
