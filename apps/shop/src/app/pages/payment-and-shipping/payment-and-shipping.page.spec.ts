import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopFacade } from '../../+state/shop.facade';
import { PaymentAndShippingPage } from './payment-and-shipping.page';

describe('PaymentAndShippingPage', () => {
  let component: PaymentAndShippingPage;
  let fixture: ComponentFixture<PaymentAndShippingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PaymentAndShippingPage],
      providers: [
        {
          provide: ShopFacade,
          useValue: { setAddress: () => true, setPaymentMethod: () => true },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: () => true },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAndShippingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
