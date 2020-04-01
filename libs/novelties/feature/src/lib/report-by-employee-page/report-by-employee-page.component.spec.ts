import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { USER } from '@kirby/authentication/utils';
import { AuthFacade } from '@kirby/authentication-data-access';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { ReportByEmployeePageComponent } from './report-by-employee-page.component';

describe('ReportByEmployeePageComponent', () => {
  let component: ReportByEmployeePageComponent;
  let fixture: ComponentFixture<ReportByEmployeePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule, ReactiveFormsModule],
      declarations: [ReportByEmployeePageComponent],
      providers: [
        { provide: AuthFacade, useValue: { authUser$: of(USER) } },
        {
          provide: NoveltiesFacade,
          useValue: { reportByEmployee$: of(), error$: of() }
        },
        { provide: EmployeesFacade, useValue: { paginatedEmployees$: of() } },
        { provide: ActivatedRoute, useValue: { queryParamMap: of() } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
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
