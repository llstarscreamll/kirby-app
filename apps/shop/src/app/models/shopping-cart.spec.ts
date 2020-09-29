import { Product } from '@kirby/products/data';
import { ShoppingCart } from './shopping-cart';
import { createProduct } from '@kirby/products/testing';
import { ShoppingCartProduct } from './shopping-cart-product';

describe('ShoppingCart', () => {
  const pencil = Product.fromJson(createProduct({ id: 'P-1', name: 'pencil' }));
  const book = Product.fromJson(createProduct({ id: 'P-2', name: 'book' }));

  describe('isProductAlreadyAdded', () => {
    it('should return false if added products = []', () => {
      const shoppingCart = ShoppingCart.fromJson({ products: [] });

      expect(shoppingCart.isProductAlreadyAdded(pencil)).toBe(false);
    });

    it('should return true if product is added and has quantity > 0', () => {
      const shoppingCart = ShoppingCart.fromJson({
        products: [ShoppingCartProduct.fromJson({ ...pencil, quantity: 1 })],
      });

      expect(shoppingCart.isProductAlreadyAdded(pencil)).toBe(true);
    });

    it('should return false if product is added and has quantity < 1', () => {
      const shoppingCart = ShoppingCart.fromJson({
        products: [ShoppingCartProduct.fromJson({ ...pencil, quantity: 0 })],
      });

      expect(shoppingCart.isProductAlreadyAdded(pencil)).toBe(false);
    });
  });

  it('should add products to shopping cart', () => {
    const shoppingCart = ShoppingCart.fromJson({ products: [] });

    shoppingCart.addProduct(pencil);
    expect(shoppingCart.products.length).toBe(1);

    shoppingCart.addProduct(pencil);
    expect(shoppingCart.products.length).toBe(1);
    expect(shoppingCart.products[0].id).toBe(pencil.id);
    expect(shoppingCart.products[0].quantity).toBe(2);
    
    shoppingCart.addProduct(pencil);
    shoppingCart.addProduct(pencil);
    expect(shoppingCart.products[0].id).toBe(pencil.id);
    expect(shoppingCart.products[0].quantity).toBe(4);
    
    shoppingCart.addProduct(book);
    expect(shoppingCart.products[0].id).toBe(pencil.id);
    expect(shoppingCart.products[1].id).toBe(book.id);
    expect(shoppingCart.products[1].quantity).toBe(1);
  });

  it('should remove products from shopping cart', () => {
    const shoppingCart = ShoppingCart.fromJson({
      products: [ShoppingCartProduct.fromJson({ ...pencil, requested_qty: 2 })],
    });

    shoppingCart.removeProduct(pencil);
    expect(shoppingCart.products.length).toBe(1);
    expect(shoppingCart.products[0].quantity).toBe(1);

    shoppingCart.removeProduct(pencil);
    expect(shoppingCart.products.length).toBe(0);

    // remove not added product
    shoppingCart.removeProduct(pencil);
    expect(shoppingCart.products.length).toBe(0);
  });

  it('should return total products added', () => {
    const shoppingCart = ShoppingCart.fromJson({
      products: [{ ...pencil, requested_qty: 2 }, {...book, requested_qty: 6}],
    });

    expect(shoppingCart.totalProducts()).toEqual(8);
  });
});
