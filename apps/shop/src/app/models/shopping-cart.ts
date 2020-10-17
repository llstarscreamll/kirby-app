import {
  ShoppingCartProduct,
  IShoppingCartProduct,
} from './shopping-cart-product';
import { IProduct, Product } from '@kirby/products/data';

export interface IShoppingCart {
  products: IShoppingCartProduct[];
  shipping: {
    price: number;
    address_street_type: string;
    address_line_1: string;
    address_line_2: string;
    address_line_3: string;
    address_additional_info: string;
  };
  payment_method: { name: string; display_name: string };
}

export class ShoppingCart implements IShoppingCart {
  products: ShoppingCartProduct[] = [];
  shipping = {
    price: 4000,
    address_street_type: '',
    address_line_1: '',
    address_line_2: '',
    address_line_3: '',
    address_additional_info: '',
  };
  payment_method = { name: 'cash', display_name: 'Efectivo' };

  static fromJson(data: IShoppingCart): ShoppingCart {
    return Object.assign(new ShoppingCart(), {
      ...data,
      products: data.products.map(ShoppingCartProduct.fromJson),
    });
  }

  addProduct(product: IProduct) {
    const productAlreadyAdded = this.isProductAlreadyAdded(product);

    if (!productAlreadyAdded) {
      this.products.push({
        product: Product.fromJson(product),
        requested_quantity: 0,
      });
    }

    this.products.map((added) => {
      if (added.product.id === product.id) {
        added.requested_quantity++;
      }

      return added;
    });
  }

  removeProduct(product: IProduct) {
    const comparator = (added: IShoppingCartProduct) =>
      added.product.id === product.id;
    const addedProduct = this.products.find(comparator);
    const addedProductIndex = this.products.findIndex(comparator);

    if (!!addedProduct && addedProduct.requested_quantity === 1) {
      this.products.splice(addedProductIndex, 1);
    }

    if (!!addedProduct && addedProduct.requested_quantity > 1) {
      addedProduct.requested_quantity--;
      this.products.splice(addedProductIndex, 1, addedProduct);
    }
  }

  isProductAlreadyAdded(product: IProduct): boolean {
    const addedProduct = this.products.find(
      (added) => added.product.id === product.id
    );

    return addedProduct !== undefined && addedProduct.requested_quantity > 0;
  }

  areThereSelectedProducts(): boolean {
    return this.products.length > 0;
  }

  totalProducts(): number {
    return this.products.reduce(
      (acc, product) => acc + product.requested_quantity,
      0
    );
  }

  grandTotal(): number {
    return this.products.reduce(
      (acc, cartItem) =>
        acc + cartItem.requested_quantity * cartItem.product.price,
      0
    );
  }
}
