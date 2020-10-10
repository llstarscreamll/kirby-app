import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopFacade } from '../../+state/shop.facade';

import { ShoppingCartPage } from './shopping-cart.page';

describe('ShoppingCartPage', () => {
  let component: ShoppingCartPage;
  let fixture: ComponentFixture<ShoppingCartPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingCartPage],
      providers: [
        {
          provide: ShopFacade,
          useValue: {
            addProductToShoppingCart: () => true,
            removeProductFromShoppingCart: () => true,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
