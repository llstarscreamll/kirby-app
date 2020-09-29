import {
  State,
  shopAdapter,
  initialState,
  ShopPartialState,
  SHOP_FEATURE_KEY,
} from './shop.reducer';
import * as selectors from './shop.selectors';

describe('Shop Selectors', () => {
  let state: ShopPartialState;

  beforeEach(() => {
    state = {
      [SHOP_FEATURE_KEY]: {
        ...initialState,
        shoppingCart: {
          products: [],
        },
      },
    };
  });

  describe('Shop Selectors', () => {
    it('should return shopping cart', () => {
      const result = selectors.getShoppingCart(state);

      expect(result.products.length).toBe(0);
    });
  });
});
