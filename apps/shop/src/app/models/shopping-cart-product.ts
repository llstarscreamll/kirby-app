import { Product, IProduct } from '@kirby/products/data';

export interface IShoppingCartProduct extends IProduct {
  requested_qty: number;
}

export class ShoppingCartProduct extends Product implements IShoppingCartProduct {
  id = '';
  name = '';
  code = '';
  slug = '';
  sm_image_url = '';
  md_image_url = '';
  lg_image_url = '';
  cost = 0;
  price = 0;
  unity = '';
  quantity = 0;
  pum_unity = 'UND';
  pum_price = 0;
  active = undefined;
  categories = [];
  created_at = undefined;
  updated_at = undefined;

  requested_qty = 0;

  static fromJson(data: any): Product {
    return Object.assign(new ShoppingCartProduct(), { ...data });
  }
}
