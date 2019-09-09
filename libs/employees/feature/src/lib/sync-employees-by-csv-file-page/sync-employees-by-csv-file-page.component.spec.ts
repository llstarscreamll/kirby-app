import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesFacade } from '@llstarscreamll/employees/data-access';
import { SyncEmployeesByCsvFilePageComponent } from './sync-employees-by-csv-file-page.component';

describe('SyncEmployeesByCsvFilePageComponent', () => {
  let component: SyncEmployeesByCsvFilePageComponent;
  let fixture: ComponentFixture<SyncEmployeesByCsvFilePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SyncEmployeesByCsvFilePageComponent],
      providers: [{ provide: EmployeesFacade, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncEmployeesByCsvFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
