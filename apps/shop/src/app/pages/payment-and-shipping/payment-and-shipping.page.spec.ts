import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAndShippingPage } from './payment-and-shipping.page';

describe('PaymentAndShippingPage', () => {
  let component: PaymentAndShippingPage;
  let fixture: ComponentFixture<PaymentAndShippingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentAndShippingPage ]
    })
    .compileComponents();
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
