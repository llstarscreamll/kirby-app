import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingCart } from '../models/shopping-cart';
import { SHOP_FEATURE_KEY, State, ShopPartialState } from './shop.reducer';

export const getShopState = createFeatureSelector<ShopPartialState, State>(
  SHOP_FEATURE_KEY
);

export const getShopError = createSelector(
  getShopState,
  (state: State) => state.errors
);

export const getShoppingCart = createSelector(getShopState, (state: State) =>
  ShoppingCart.fromJson(state.shoppingCart)
);
