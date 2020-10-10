import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@kirby/authentication-data-access';

import { IProduct } from '@kirby/products/data';
import { ShopFacade } from '../../+state/shop.facade';

@Component({
  selector: 'shop-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  shoppingCart$ = this.shopFacade.shoppingCart$;
  userIsLoggedIn$ = this.authFacade.isLoggedIn$;

  constructor(private shopFacade: ShopFacade, private authFacade: AuthFacade) {}

  ngOnInit(): void {}

  addProduct(product: IProduct) {
    this.shopFacade.addProductToShoppingCart(product);
  }

  removeProduct(product: IProduct) {
    this.shopFacade.removeProductFromShoppingCart(product);
  }
}
