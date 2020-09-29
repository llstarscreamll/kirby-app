import { Component, OnInit } from '@angular/core';

import { IProduct } from '@kirby/products/data';
import { ShopFacade } from '../../+state/shop.facade';

@Component({
  selector: 'shop-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
})
export class ShoppingCartPage implements OnInit {
  shoppingCart$ = this.shopFacade.shoppingCart$;

  constructor(private shopFacade: ShopFacade) {}

  ngOnInit(): void {}

  addProduct(product: IProduct) {
    this.shopFacade.addProductToShoppingCart(product);
  }

  removeProduct(product: IProduct) {
    this.shopFacade.removeProductFromShoppingCart(product);
  }
}
