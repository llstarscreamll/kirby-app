import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByEmployeePageComponent } from './report-by-employee-page.component';

describe('ReportByEmployeePageComponent', () => {
  let component: ReportByEmployeePageComponent;
  let fixture: ComponentFixture<ReportByEmployeePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportByEmployeePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByEmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
