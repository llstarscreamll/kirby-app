import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { ShopFacade } from './shop.facade';
import { addProduct, removeProduct } from './shop.actions';
import { ShopEffects } from './shop.effects';
import { createProduct } from '@kirby/products/testing/src';
import { SHOP_FEATURE_KEY, State, reducer } from './shop.reducer';
import { LocalStorageService } from '@kirby/shared';

interface TestSchema {
  shop: State;
}

describe('ShopFacade', () => {
  let facade: ShopFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SHOP_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ShopEffects]),
        ],
        providers: [
          ShopFacade,
          {
            provide: LocalStorageService,
            useValue: {
              setItem: (key: string, data: any) => true,
            },
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ShopFacade);
    });

    it('should dispatch AddProduct(...) action on addProductToShoppingCart', () => {
      const product = createProduct();
      spyOn(store, 'dispatch');

      facade.addProductToShoppingCart(product);

      expect(store.dispatch).toHaveBeenCalledWith(addProduct({ product }));
    });

    it('should dispatch RemoveProduct(...) action on removeProductFromShoppingCart', () => {
      const product = createProduct();
      spyOn(store, 'dispatch');

      facade.removeProductFromShoppingCart(product);

      expect(store.dispatch).toHaveBeenCalledWith(removeProduct({ product }));
    });
  });
});
