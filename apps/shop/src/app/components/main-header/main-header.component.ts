import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'shop-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input()
  shoppingCart: ShoppingCart | null = new ShoppingCart();

  constructor() {}

  ngOnInit(): void {}
}
