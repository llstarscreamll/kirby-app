import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionLogsPage } from './production-logs.page';

describe('ProductionLogsPage', () => {
  let component: ProductionLogsPage;
  let fixture: ComponentFixture<ProductionLogsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionLogsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
