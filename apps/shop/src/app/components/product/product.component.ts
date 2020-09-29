import {
  Input,
  OnInit,
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

import { Product } from '@kirby/products/data';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'shop-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit {
  @Input() product: Product|null = new Product();
  @Input() shoppingCart: ShoppingCart|null = new ShoppingCart();

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitAddProduct() {
    this.add.emit({ ...this.product });
  }

  emitRemoveProduct() {
    this.remove.emit({ ...this.product });
  }
}
