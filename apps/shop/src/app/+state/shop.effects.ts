import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromShop from './shop.reducer';
import * as ShopActions from './shop.actions';
import { LocalStorageService } from '@kirby/shared';
import { ShoppingCart } from '../models/shopping-cart';
import { ShopService } from '../services/shop.service';
import { CategoryPage } from '../pages/category/category.page';
import { CategoriesFacade, ProductsFacade } from '@kirby/products/data-access';

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

  setShoppingCart$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(ShopActions.shoppingCartUpdated, {
      run: (_, state) =>
        this.localStorage.setItem(fromShop.SHOP_FEATURE_KEY, {
          shoppingCart: state?.[fromShop.SHOP_FEATURE_KEY].shoppingCart,
        }),
      undoAction: (_, error) => ShopActions.setError(error),
    })
  );

  updateShoppingCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ShopActions.setShoppingCart,
        ShopActions.setShoppingCartAddress,
        ShopActions.setShoppingCartPaymentMethod
      ),
      map((_) => ShopActions.shoppingCartUpdated())
    )
  );

  placeOrder$ = createEffect(() =>
    this.dataPersistence.optimisticUpdate(ShopActions.placeOrder, {
      run: (_, state) =>
        this.shopService
          .placeOrder(state?.[fromShop.SHOP_FEATURE_KEY]?.shoppingCart)
          .pipe(map(ShopActions.placeOrderOk)),
      undoAction: (_, error) => ShopActions.placeOrderError(error),
    })
  );

  placeOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.placeOrderOk),
      map((_) =>
        ShopActions.setShoppingCart({ shoppingCart: new ShoppingCart() })
      ),
      tap((_) => this.router.navigateByUrl('/order-received'))
    )
  );

  categoryPage$ = createEffect(() =>
    this.dataPersistence.navigation(CategoryPage, {
      run: (router) => {
        this.categoryFacade.getBySlug(router.params['category-slug'], {
          active: true,
        });
        this.productsFacade.search({
          filter: {
            'products.active': true,
            category_slug: router.params['category-slug'],
          },
        });
      },
    })
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private shopService: ShopService,
    private productsFacade: ProductsFacade,
    private categoryFacade: CategoriesFacade,
    private localStorage: LocalStorageService,
    private dataPersistence: DataPersistence<fromShop.ShopPartialState>
  ) {}
}
