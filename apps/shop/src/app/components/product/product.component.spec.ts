import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Product } from '@kirby/products/data/src';
import { createProduct } from '@kirby/products/testing';
import { ProductComponent } from './product.component';
import { ShoppingCartProduct } from '../../models/shopping-cart-product';
import { ShoppingCart } from '../../models/shopping-cart';

describe('ProductComponent', () => {
  let template: HTMLDivElement;
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  const product = Product.fromJson(createProduct({ id: 'P-1' }));
  const emptyShoppingCart = ShoppingCart.fromJson({ products: [] });
  const filledShoppingCart = ShoppingCart.fromJson({
    products: [ShoppingCartProduct.fromJson({ ...product, quantity: 1 })],
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
    })
      .overrideComponent(ProductComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render certain product data', () => {
    const product = Product.fromJson(createProduct({ id: 'P-1' }));
    component.product = product;

    fixture.detectChanges();

    expect(template.querySelector('.name')?.textContent).toContain(
      product.name
    );
    expect(template.querySelector('.price')?.textContent).toContain(
      product.price
    );
    expect(
      template.querySelector(`img.image[src="${product.sm_image_url}"]`)
    ).toBeTruthy();
    expect(template.querySelector('.pum')?.textContent).toContain(
      product.pum_unity
    );
    expect(template.querySelector('.pum')?.textContent).toContain(
      product.pum_price
    );
    expect(template.querySelector('.unity')?.textContent).toContain(
      product.unity
    );
    expect(template.querySelector('.quantity')?.textContent).toContain(
      product.quantity
    );
    expect(template.querySelector('button.add')).toBeTruthy();
    // product can be removed if there is at least one added
    expect(template.querySelector('button.remove')).toBeFalsy();
    expect(template.querySelector('button.add-more')).toBeFalsy();
  });

  it('should hide .add button and show .add-more button when there is at least one item on shopping cart', () => {
    component.product = product;
    component.shoppingCart = filledShoppingCart;

    fixture.detectChanges();

    expect(template.querySelector('.add')).toBeFalsy();
    expect(template.querySelector('.add-more')).toBeTruthy();
    expect(template.querySelector('.remove')).toBeTruthy();
  });

  it('should emit product data on .add button click', () => {
    component.product = product;
    component.shoppingCart = emptyShoppingCart;

    spyOn(component.add, 'emit');

    fixture.detectChanges();

    const addBtn: HTMLButtonElement | null = template.querySelector(
      '.add'
    );
    addBtn?.click();

    expect(component.add.emit).toBeCalledWith({ ...product });
  });
  
  it('should emit product data on .add-more button click', () => {
    component.product = product;
    component.shoppingCart = filledShoppingCart;

    spyOn(component.add, 'emit');

    fixture.detectChanges();

    const addBtn: HTMLButtonElement | null = template.querySelector(
      '.add-more'
    );
    addBtn?.click();

    expect(component.add.emit).toBeCalledWith({ ...product });
  });

  it('should emit product data on .remove button click', () => {
    component.product = product;
    component.shoppingCart = filledShoppingCart;

    spyOn(component.remove, 'emit');

    fixture.detectChanges();

    const addBtn: HTMLButtonElement | null = template.querySelector(
      '.remove'
    );
    addBtn?.click();

    expect(component.remove.emit).toBeCalledWith({ ...product });
  });
});
