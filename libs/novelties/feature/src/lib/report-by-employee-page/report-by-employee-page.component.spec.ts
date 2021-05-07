import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { User } from '@kirby/users/util';
import { USER } from '@kirby/authentication/utils';
import { CanDirective } from '@kirby/authorization/ui';
import { AuthFacade } from '@kirby/authentication/data-access';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { ReportByEmployeePageComponent } from './report-by-employee-page.component';

describe('ReportByEmployeePageComponent', () => {
  let component: ReportByEmployeePageComponent;
  let fixture: ComponentFixture<ReportByEmployeePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatAutocompleteModule, MatMenuModule, ReactiveFormsModule],
      declarations: [ReportByEmployeePageComponent, CanDirective],
      providers: [
        { provide: AuthFacade, useValue: { authUser$: of(User.fromJson(USER)) } },
        {
          provide: NoveltiesFacade,
          useValue: { reportByEmployee$: of(), error$: of() },
        },
        { provide: EmployeesFacade, useValue: { paginatedEmployees$: of() } },
        { provide: ActivatedRoute, useValue: { queryParamMap: of() } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportByEmployeePageComponent);
    component = fixture.componentInstance;
  });

  xit('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
