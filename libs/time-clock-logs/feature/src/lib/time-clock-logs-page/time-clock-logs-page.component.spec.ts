import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { createUser } from '@kirby/users/testing';
import { AuthFacade } from '@kirby/authentication/data-access';
import { AuthorizationUiTestModule } from '@kirby/authorization/ui';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TimeClockLogsFacade } from '@kirby/time-clock-logs/data-access';

import { emptyPagination } from '@kirby/shared';
import { EmployeesFacade } from '@kirby/employees/data-access';

import { TimeClockLogsPageComponent } from './time-clock-logs-page.component';

describe('TimeClockLogsPageComponent', () => {
  const user = createUser('U1', { roles: [], permissions: [] });
  let template: HTMLDivElement;
  let timeClockFacade: TimeClockLogsFacade;
  let component: TimeClockLogsPageComponent;
  let fixture: ComponentFixture<TimeClockLogsPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AuthorizationUiTestModule, HttpClientTestingModule, RouterTestingModule, MatAutocompleteModule],
      declarations: [TimeClockLogsPageComponent],
      providers: [
        { provide: AuthFacade, useValue: { authUser$: of(user) } },
        { provide: EmployeesFacade, useValue: { paginatedEmployees$: of(emptyPagination), search: (q) => true } },
        {
          provide: TimeClockLogsFacade,
          useValue: {
            cleanError: () => true,
            createEntryAndExitLog: (data) => true,
            getStatistics: (query) => true,
            getTimeClockData: (code) => true,
            search: (query) => true,
            searchSubCostCenters: (code) => true,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockLogsPageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    timeClockFacade = TestBed.inject(TimeClockLogsFacade);

    jest.spyOn(timeClockFacade, 'search');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(timeClockFacade.search).toHaveBeenCalledTimes(1);
  });

  it('should have certain elements', () => {
    expect(template.querySelector('h1')).toBeTruthy();
    expect(template.querySelector('a[routerLink="entry-and-exit-log"]')).toBeTruthy();
    expect(template.querySelector('kirby-time-clock-logs-table')).toBeTruthy();
    expect(template.querySelectorAll('kirby-pagination').length).toBe(1);
  });
});
