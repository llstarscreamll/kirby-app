import { createProduct } from "@kirby/products/testing";
import { Product } from './product';

describe('Product', () => {
    it('should return fix sized name', () => {
        const product = Product.fromJson(createProduct({name: 'name too long'}));

        expect(product.sizedName(7)).toBe('name...');
        expect(product.sizedName(13)).toBe('name too long');
    });
});