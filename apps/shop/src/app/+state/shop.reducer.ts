import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ApiError } from '@kirby/shared';
import { ShopEntity } from './shop.models';
import * as ShopActions from './shop.actions';
import { ICategory } from '@kirby/products/data';
import { IShoppingCart } from '../models/shopping-cart';

export const SHOP_FEATURE_KEY = 'shop';

export enum OrderPlacementStatus {
  waitingUser = 'waiting-user',
  waitingServer = 'waiting-server',
  created = 'order-created',
  failed = 'failed',
}

export interface State extends EntityState<ShopEntity> {
  orderPlacementStatus: OrderPlacementStatus;
  shoppingCart: IShoppingCart;
  errors?: ApiError | null;
}

export interface ShopPartialState {
  readonly [SHOP_FEATURE_KEY]: State;
}

export const shopAdapter: EntityAdapter<ShopEntity> = createEntityAdapter<
  ShopEntity
>();

export const initialState: State = shopAdapter.getInitialState({
  orderPlacementStatus: OrderPlacementStatus.waitingUser,
  shoppingCart: {
    products: [],
    payment_method: { name: 'cash', display_name: 'Efectivo' },
    shipping: {
      price: 4000,
      address_street_type: '',
      address_line_1: '',
      address_line_2: '',
      address_line_3: '',
      address_additional_info: '',
    },
  },
});

const shopReducer = createReducer(
  initialState,
  on(ShopActions.addProduct, (state) => ({
    ...state,
    orderPlacementStatus: OrderPlacementStatus.waitingUser,
  })),
  on(ShopActions.removeProduct, (state) => ({
    ...state,
    orderPlacementStatus: OrderPlacementStatus.waitingUser,
  })),
  on(ShopActions.setShoppingCart, (state, { shoppingCart }) => ({
    ...state,
    shoppingCart,
  })),
  on(ShopActions.setShoppingCartAddress, (state, { address }) => ({
    ...state,
    shoppingCart: {
      ...state.shoppingCart,
      shipping: { ...state.shoppingCart.shipping, ...address },
    },
  })),
  on(ShopActions.setShoppingCartPaymentMethod, (state, { paymentMethod }) => ({
    ...state,
    shoppingCart: { ...state.shoppingCart, payment_method: paymentMethod },
  })),
  on(ShopActions.placeOrder, (state) => ({
    ...state,
    orderPlacementStatus: OrderPlacementStatus.waitingServer,
  })),
  on(ShopActions.placeOrderOk, (state) => ({
    ...state,
    orderPlacementStatus: OrderPlacementStatus.created,
    errors: null,
  })),
  on(ShopActions.setError, (state, { error }) => ({
    ...state,
    errors: error,
  })),
  on(ShopActions.placeOrderError, (state, { error }) => ({
    ...state,
    orderPlacementStatus: OrderPlacementStatus.failed,
    errors: error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return shopReducer(state, action);
}
