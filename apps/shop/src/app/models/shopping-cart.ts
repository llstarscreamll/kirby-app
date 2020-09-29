import {
  ShoppingCartProduct,
  IShoppingCartProduct,
} from './shopping-cart-product';
import { IProduct, Product } from '@kirby/products/data';

export interface IShoppingCart {
  products: IShoppingCartProduct[];
}

export class ShoppingCart implements IShoppingCart {
  products: IShoppingCartProduct[] = [];

  static fromJson(data: IShoppingCart): ShoppingCart {
    return Object.assign(new ShoppingCart(), {
      ...data,
      products: data.products.map(ShoppingCartProduct.fromJson),
    });
  }

  addProduct(product: IProduct) {
    const productAlreadyAdded = this.isProductAlreadyAdded(product);

    if (!productAlreadyAdded) {
      this.products.push({ ...product, requested_qty: 0 });
    }

    this.products.map((added) => {
      if (added.id === product.id) {
        added.requested_qty++;
      }

      return added;
    });
  }

  removeProduct(product: IProduct) {
    const comparator = (added: IShoppingCartProduct) => added.id === product.id;
    const addedProduct = this.products.find(comparator);
    const addedProductIndex = this.products.findIndex(comparator);

    if (!!addedProduct && addedProduct.requested_qty === 1) {
      this.products.splice(addedProductIndex, 1);
    }

    if (!!addedProduct && addedProduct.requested_qty > 1) {
      addedProduct.requested_qty--;
      this.products.splice(addedProductIndex, 1, addedProduct);
    }
  }

  isProductAlreadyAdded(product: IProduct): boolean {
    const addedProduct = this.products.find((added) => added.id === product.id);

    return addedProduct !== undefined && addedProduct.requested_qty > 0;
  }

  totalProducts(): number {
    return this.products.reduce(
      (acc, product) => acc + product.requested_qty,
      0
    );
  }
}
