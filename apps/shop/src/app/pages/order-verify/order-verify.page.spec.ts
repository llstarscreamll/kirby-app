import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderVerifyPage } from './order-verify.page';

describe('OrderVerifyPage', () => {
  let component: OrderVerifyPage;
  let fixture: ComponentFixture<OrderVerifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderVerifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
