import { Product } from '@kirby/products/data';
import { ShoppingCart } from './shopping-cart';
import { createProduct } from '@kirby/products/testing';
import { ShoppingCartProduct } from './shopping-cart-product';

describe('ShoppingCart', () => {
  const pencil = Product.fromJson(createProduct({ id: 'P-1', name: 'pencil' }));
  const book = Product.fromJson(createProduct({ id: 'P-2', name: 'book' }));
  const shipping = {
    price: 0,
    address_street_type: '',
    address_line_1: '',
    address_line_2: '',
    address_line_3: '',
    address_additional_info: '',
  };
  const payment_method = { name: 'cash', display_name: 'cash' };

  describe('isProductAlreadyAdded', () => {
    it('should return false if added products = []', () => {
      const shoppingCart = ShoppingCart.fromJson({
        products: [],
        shipping,
        payment_method,
      });

      expect(shoppingCart.isProductAlreadyAdded(pencil)).toBe(false);
    });

    it('should return true if product is added and has quantity > 0', () => {
      const shoppingCart = ShoppingCart.fromJson({
        products: [
          ShoppingCartProduct.fromJson({
            product: pencil,
            requested_quantity: 1,
          }),
        ],
        shipping,
        payment_method,
      });

      expect(shoppingCart.isProductAlreadyAdded(pencil)).toBe(true);
    });

    it('should return false if product is added and has quantity < 1', () => {
      const shoppingCart = ShoppingCart.fromJson({
        products: [
          ShoppingCartProduct.fromJson({
            product: pencil,
            requested_quantity: 0,
          }),
        ],
        shipping,
        payment_method,
      });

      expect(shoppingCart.isProductAlreadyAdded(pencil)).toBe(false);
    });
  });

  it('should add products to shopping cart', () => {
    const shoppingCart = ShoppingCart.fromJson({
      products: [],
      shipping,
      payment_method,
    });

    shoppingCart.addProduct(pencil);
    expect(shoppingCart.products.length).toBe(1);

    shoppingCart.addProduct(pencil);
    expect(shoppingCart.products.length).toBe(1);
    expect(shoppingCart.products[0].product.id).toBe(pencil.id);
    expect(shoppingCart.products[0].requested_quantity).toBe(2);

    shoppingCart.addProduct(pencil);
    shoppingCart.addProduct(pencil);
    expect(shoppingCart.products[0].product.id).toBe(pencil.id);
    expect(shoppingCart.products[0].requested_quantity).toBe(4);

    shoppingCart.addProduct(book);
    expect(shoppingCart.products[0].product.id).toBe(pencil.id);
    expect(shoppingCart.products[1].product.id).toBe(book.id);
    expect(shoppingCart.products[1].requested_quantity).toBe(1);
  });

  it('should remove products from shopping cart', () => {
    const shoppingCart = ShoppingCart.fromJson({
      products: [
        ShoppingCartProduct.fromJson({
          product: pencil,
          requested_quantity: 2,
        }),
      ],
      shipping,
      payment_method,
    });

    shoppingCart.removeProduct(pencil);
    expect(shoppingCart.products.length).toBe(1);
    expect(shoppingCart.products[0].requested_quantity).toBe(1);

    shoppingCart.removeProduct(pencil);
    expect(shoppingCart.products.length).toBe(0);

    // remove not added product
    shoppingCart.removeProduct(pencil);
    expect(shoppingCart.products.length).toBe(0);
  });

  it('should return total products added', () => {
    const shoppingCart = ShoppingCart.fromJson({
      products: [
        { product: pencil, requested_quantity: 2 },
        { product: book, requested_quantity: 6 },
      ],
      shipping,
      payment_method,
    });

    expect(shoppingCart.totalProducts()).toEqual(8);
  });

  it('should return added product quantity', () => {
    const shoppingCart = ShoppingCart.fromJson({
      products: [
        { product: pencil, requested_quantity: 2 },
        { product: book, requested_quantity: 6 },
      ],
      shipping,
      payment_method,
    });

    expect(shoppingCart.productQuantity(pencil.id)).toEqual(2);
    expect(shoppingCart.productQuantity(book.id)).toEqual(6);
  });
});
