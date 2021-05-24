import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLogDetailsPage } from './production-log-details.page';

describe('ProductionLogDetailsPage', () => {
  let component: ProductionLogDetailsPage;
  let fixture: ComponentFixture<ProductionLogDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionLogDetailsPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionLogDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
