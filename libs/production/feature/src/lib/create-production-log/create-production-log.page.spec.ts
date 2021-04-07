import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductionLogPage } from './create-production-log.page';

describe('CreateProductionLogPage', () => {
  let component: CreateProductionLogPage;
  let fixture: ComponentFixture<CreateProductionLogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductionLogPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductionLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
