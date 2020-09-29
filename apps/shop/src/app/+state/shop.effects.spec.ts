import { Observable, of } from 'rxjs';
import { hot } from '@nrwl/angular/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TestBed, async } from '@angular/core/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { provideMockActions } from '@ngrx/effects/testing';

import {
  initialState,
  ShopPartialState,
  SHOP_FEATURE_KEY,
} from './shop.reducer';
import { ShopEffects } from './shop.effects';
import * as ShopActions from './shop.actions';
import { createProduct } from '@kirby/products/testing/src';
import { LocalStorageService } from '@kirby/shared';

describe('ShopEffects', () => {
  const pencil = createProduct({ name: 'pencil' });
  let actions$: Observable<any>;
  let localStorageService: LocalStorageService;
  let effects: ShopEffects;
  const state: ShopPartialState = {
    [SHOP_FEATURE_KEY]: {
      ...initialState,
      shoppingCart: { products: [{ ...pencil, quantity: 1 }] },
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
              { ...pencil, quantity: 1 },
              { ...product, quantity: 1 },
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
          shoppingCart: { products: [pencil] },
        })
      );

      spyOn(localStorageService, 'setItem');

      effects.setShoppingCart$.subscribe(() => {
        expect(
          localStorageService.setItem
        ).toHaveBeenCalledWith(SHOP_FEATURE_KEY, {
          shoppingCart: { products: [pencil] },
        });
        done();
      });
    });
  });
});
