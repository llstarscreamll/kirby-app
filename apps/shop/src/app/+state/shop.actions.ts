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

export const setShoppingCartAddress = createAction(
  '[Shop] set shopping cart address',
  props<{ address: any }>()
);

export const setShoppingCartPaymentMethod = createAction(
  '[Shop] set shopping cart payment method',
  props<{ paymentMethod: { name: string; display_name: string } }>()
);

export const shoppingCartUpdated = createAction('[Shop] shopping cart updated');
export const placeOrder = createAction('[Shop] place order');
export const placeOrderOk = createAction('[Shop] place order ok');
export const placeOrderError = createAction(
  '[Shop] place order error',
  props<{ error: ApiError }>()
);

export const setError = createAction(
  '[Shop] set error',
  props<{ error: ApiError }>()
);
