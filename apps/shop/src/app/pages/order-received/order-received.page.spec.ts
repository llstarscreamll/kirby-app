import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderReceivedPage } from './order-received.page';

describe('OrderReceivedPage', () => {
  let component: OrderReceivedPage;
  let fixture: ComponentFixture<OrderReceivedPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderReceivedPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReceivedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
