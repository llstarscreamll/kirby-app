import { Component, OnInit } from '@angular/core';

import { IProduct } from '@kirby/products/data';
import { ShopFacade } from '../../+state/shop.facade';

@Component({
  selector: 'shop-order-verify',
  templateUrl: './order-verify.page.html',
  styleUrls: ['./order-verify.page.scss'],
})
export class OrderVerifyPage implements OnInit {
  shoppingCart$ = this.shopFacade.shoppingCart$;

  constructor(private shopFacade: ShopFacade) {}

  ngOnInit(): void {}
}
