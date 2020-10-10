import { select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import * as fromShop from './shop.reducer';
import * as shopActions from './shop.actions';
import { IProduct } from '@kirby/products/data';
import * as ShopSelectors from './shop.selectors';

@Injectable()
export class ShopFacade {
  shoppingCart$ = this.store.pipe(select(ShopSelectors.getShoppingCart));
  hasOrderCreated$ = this.store.pipe(select(ShopSelectors.hasOrderCreated));

  constructor(private store: Store<fromShop.ShopPartialState>) {}

  addProductToShoppingCart(product: IProduct) {
    this.store.dispatch(shopActions.addProduct({ product }));
  }

  removeProductFromShoppingCart(product: IProduct) {
    this.store.dispatch(shopActions.removeProduct({ product }));
  }

  setAddress(address: any) {
    this.store.dispatch(shopActions.setShoppingCartAddress({ address }));
  }

  setPaymentMethod(paymentMethod: { name: string; display_name: string }) {
    this.store.dispatch(
      shopActions.setShoppingCartPaymentMethod({ paymentMethod })
    );
  }

  placeOrder() {
    this.store.dispatch(shopActions.placeOrder());
  }
}
