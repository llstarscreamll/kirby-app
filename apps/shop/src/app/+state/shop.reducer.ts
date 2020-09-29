import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ApiError } from '@kirby/shared';
import { ShopEntity } from './shop.models';
import * as ShopActions from './shop.actions';
import { IShoppingCart } from '../models/shopping-cart';

export const SHOP_FEATURE_KEY = 'shop';

export interface State extends EntityState<ShopEntity> {
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
  shoppingCart: {
    products: [],
  },
});

const shopReducer = createReducer(
  initialState,
  on(ShopActions.setShoppingCart, (state, { shoppingCart }) => ({
    ...state,
    shoppingCart,
  })),
  on(ShopActions.setError, (state, { error }) => ({
    ...state,
    errors: error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return shopReducer(state, action);
}
