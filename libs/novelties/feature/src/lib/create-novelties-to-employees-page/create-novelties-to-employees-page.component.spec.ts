import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { CreateNoveltiesToEmployeesPageComponent } from './create-novelties-to-employees-page.component';

class NoveltiesFacadeMock {
  createNoveltiesToEmployeesStatus$ = from([]);
}
class EmployeesFacadeMock {}

describe('CreateNoveltiesToEmployeesPageComponent', () => {
  let component: CreateNoveltiesToEmployeesPageComponent;
  let fixture: ComponentFixture<CreateNoveltiesToEmployeesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CreateNoveltiesToEmployeesPageComponent],
      providers: [
        { provide: NoveltiesFacade, useClass: NoveltiesFacadeMock },
        { provide: EmployeesFacade, useClass: EmployeesFacadeMock },
        { provide: MatSnackBar, useValue: {} },
        { provide: Router, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
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
