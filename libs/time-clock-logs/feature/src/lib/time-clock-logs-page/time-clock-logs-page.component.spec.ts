import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { createUser } from '@kirby/users/util';
import { AuthFacade } from '@kirby/authentication-data-access';
import { TimeClockLogsPageComponent } from './time-clock-logs-page.component';
import { TimeClockLogsFacade } from '@kirby/time-clock-logs/data-access';

describe('TimeClockLogsPageComponent', () => {
  const user = createUser();
  let template: HTMLDivElement;
  let timeClockFacade: TimeClockLogsFacade;
  let component: TimeClockLogsPageComponent;
  let fixture: ComponentFixture<TimeClockLogsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [TimeClockLogsPageComponent],
      providers: [
        { provide: AuthFacade, useValue: { authUser$: of(user) } },
        {
          provide: TimeClockLogsFacade,
          useValue: {
            cleanError: () => true,
            createEntryAndExitLog: data => true,
            getTimeClockData: code => true,
            searchSubCostCenters: code => true,
            search: query => true
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeClockLogsPageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    timeClockFacade = TestBed.get(TimeClockLogsFacade);

    spyOn(timeClockFacade, 'search').and.callThrough();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(timeClockFacade.search).toHaveBeenCalledTimes(1);
  });

  it('should have certain elements', () => {
    expect(template.querySelector('h1')).toBeTruthy();
    expect(
      template.querySelector('a[routerLink="entry-and-exit-log"]')
    ).toBeTruthy();
    expect(
      template.querySelector('kirby-time-clock-logs-table')
    ).toBeTruthy();
    expect(template.querySelectorAll('kirby-pagination').length).toBe(
      1
    );
  });
});
