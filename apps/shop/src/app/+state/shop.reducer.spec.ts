import { ShopEntity } from './shop.models';
import * as ShopActions from './shop.actions';
import { State, initialState, reducer } from './shop.reducer';
import { createProduct } from '@kirby/products/testing/src';

describe('Shop Reducer', () => {
  beforeEach(() => {});

  describe('valid Shop actions', () => {
    it('should return set shopping cart data', () => {
      const product = { ...createProduct('P1'), quantity: 2 };
      const shoppingCart = { products: [product] };
      const action = ShopActions.setShoppingCart({ shoppingCart });

      const result: State = reducer(initialState, action);

      expect(result.shoppingCart.products.length).toBe(1);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
