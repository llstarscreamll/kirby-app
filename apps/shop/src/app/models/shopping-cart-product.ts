import { Product, IProduct } from '@kirby/products/data';

export interface IShoppingCartProduct {
  product: IProduct;
  requested_quantity: number;
}

export class ShoppingCartProduct implements IShoppingCartProduct {
  product = new Product();
  requested_quantity = 0;

  static fromJson(data: IShoppingCartProduct): ShoppingCartProduct {
    return Object.assign(new ShoppingCartProduct(), {
      ...data,
      product: Product.fromJson(data.product),
    });
  }
}
