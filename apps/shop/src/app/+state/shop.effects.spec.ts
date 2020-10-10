import { Observable, of } from 'rxjs';
import { hot } from '@nrwl/angular/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { provideMockActions } from '@ngrx/effects/testing';

import {
  initialState,
  ShopPartialState,
  SHOP_FEATURE_KEY,
} from './shop.reducer';
import { ShopEffects } from './shop.effects';
import * as ShopActions from './shop.actions';
import { LocalStorageService } from '@kirby/shared';
import { createProduct } from '@kirby/products/testing';

describe('ShopEffects', () => {
  const pencil = createProduct({ name: 'pencil' });
  let actions$: Observable<any>;
  let localStorageService: LocalStorageService;
  let effects: ShopEffects;
  const state: ShopPartialState = {
    [SHOP_FEATURE_KEY]: {
      ...initialState,
      shoppingCart: { products: [{ product: pencil, requested_quantity: 1 }] },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ShopEffects,
        DataPersistence,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: state }),
        {
          provide: LocalStorageService,
          useValue: {
            setItem: (key: string, data: any) => true,
          },
        },
      ],
    });

    effects = TestBed.inject(ShopEffects);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  describe('addProduct$', () => {
    it('should dispatch setShoppingCart', () => {
      const product = createProduct();
      actions$ = hot('-a-|', { a: ShopActions.addProduct({ product }) });

      const expected = hot('-a-|', {
        a: ShopActions.setShoppingCart({
          shoppingCart: {
            products: [
              { product: pencil, requested_quantity: 1 },
              { product: product, requested_quantity: 1 },
            ],
          },
        }),
      });

      expect(effects.addProduct$).toBeObservable(expected);
    });
  });

  describe('removeProduct$', () => {
    it('should dispatch setShoppingCart', () => {
      actions$ = hot('-a-|', {
        a: ShopActions.removeProduct({ product: pencil }),
      });

      const expected = hot('-a-|', {
        a: ShopActions.setShoppingCart({
          shoppingCart: { products: [] },
        }),
      });

      expect(effects.removeProduct$).toBeObservable(expected);
    });
  });

  describe('setShoppingCart$', () => {
    it('should call localStorageService.setItem', (done: any) => {
      actions$ = of(
        ShopActions.setShoppingCart({
          shoppingCart: { products: [{ product: pencil, requested_quantity: 1 }] },
        })
      );

      spyOn(localStorageService, 'setItem');

      effects.setShoppingCart$.subscribe(() => {
        expect(localStorageService.setItem).toHaveBeenCalledWith(
          SHOP_FEATURE_KEY,
          {
            shoppingCart: { products: [{ product: pencil, requested_quantity: 1 }] },
          }
        );
        done();
      });
    });
  });
});
