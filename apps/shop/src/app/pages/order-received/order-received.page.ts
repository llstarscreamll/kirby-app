import { Component, OnInit } from '@angular/core';
import { ShopFacade } from '../../+state/shop.facade';

@Component({
  selector: 'shop-order-received',
  templateUrl: './order-received.page.html',
  styleUrls: ['./order-received.page.scss'],
})
export class OrderReceivedPage implements OnInit {
  hasOrderCreated$ = this.shopFacade.hasOrderCreated$;

  constructor(public shopFacade: ShopFacade) {}

  ngOnInit(): void {}
}
