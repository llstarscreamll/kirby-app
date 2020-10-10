import { Component, OnInit } from '@angular/core';

import { ShopFacade } from '../../+state/shop.facade';

@Component({
  selector: 'shop-order-verify',
  templateUrl: './order-verify.page.html',
  styleUrls: ['./order-verify.page.scss'],
})
export class OrderVerifyPage implements OnInit {
  shoppingCart$ = this.shopFacade.shoppingCart$;
  placingOrder = false;

  constructor(private shopFacade: ShopFacade) {}

  ngOnInit(): void {}

  placeOrder() {
    this.placingOrder = true;
    this.shopFacade.placeOrder();
  }
}
