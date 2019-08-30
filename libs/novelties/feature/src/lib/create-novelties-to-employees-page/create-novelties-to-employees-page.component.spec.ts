import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNoveltiesToEmployeesPageComponent } from './create-novelties-to-employees-page.component';
import { NoveltiesFacade } from '@llstarscreamll/novelties/data-access';
import { EmployeesFacade } from '@llstarscreamll/employees/data-access';

class NoveltiesFacadeMock {}
class EmployeesFacadeMock {}

describe('CreateNoveltiesToEmployeesPageComponent', () => {
  let component: CreateNoveltiesToEmployeesPageComponent;
  let fixture: ComponentFixture<CreateNoveltiesToEmployeesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNoveltiesToEmployeesPageComponent],
      providers: [
        { provide: NoveltiesFacade, useClass: NoveltiesFacadeMock },
        { provide: EmployeesFacade, useClass: EmployeesFacadeMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoveltiesToEmployeesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
