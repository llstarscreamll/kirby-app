import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionRecordByWeightComponent } from './production-record-by-weight.component';

describe('ProductionRecordByWeightComponent', () => {
  let component: ProductionRecordByWeightComponent;
  let fixture: ComponentFixture<ProductionRecordByWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionRecordByWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionRecordByWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
