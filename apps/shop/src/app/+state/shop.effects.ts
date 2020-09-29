import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromShop from './shop.reducer';
import * as ShopActions from './shop.actions';
import { ShoppingCart } from '../models/shopping-cart';
import { LocalStorageService } from '@kirby/shared';

@Injectable()
export class ShopEffects {
  addProduct$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(ShopActions.addProduct, {
      run: (
        action: ReturnType<typeof ShopActions.addProduct>,
        state: fromShop.ShopPartialState
      ) => {
        const product = action.product;
        const shoppingCart = ShoppingCart.fromJson(
          state[fromShop.SHOP_FEATURE_KEY].shoppingCart
        );

        shoppingCart.addProduct(product);

        return ShopActions.setShoppingCart({
          shoppingCart: { ...shoppingCart },
        });
      },
      undoAction: (
        action: ReturnType<typeof ShopActions.addProduct>,
        error: any
      ) => {
        return ShopActions.setError(error);
      },
    })
  );

  removeProduct$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(ShopActions.removeProduct, {
      run: (
        action: ReturnType<typeof ShopActions.removeProduct>,
        state: fromShop.ShopPartialState
      ) => {
        const product = action.product;
        const shoppingCart = ShoppingCart.fromJson(
          state[fromShop.SHOP_FEATURE_KEY].shoppingCart
        );

        shoppingCart.removeProduct(product);

        return ShopActions.setShoppingCart({
          shoppingCart: { ...shoppingCart },
        });
      },
      undoAction: (
        action: ReturnType<typeof ShopActions.removeProduct>,
        error: any
      ) => {
        return ShopActions.setError(error);
      },
    })
  );

  setShoppingCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ShopActions.setShoppingCart),
        tap((action: ReturnType<typeof ShopActions.setShoppingCart>) =>
          this.localStorage.setItem(fromShop.SHOP_FEATURE_KEY, {
            shoppingCart: action.shoppingCart,
          })
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private localStorage: LocalStorageService,
    private dataPersistence: DataPersistence<fromShop.ShopPartialState>
  ) {}
}
