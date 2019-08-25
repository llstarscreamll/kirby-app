import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeClockLogsPageComponent } from './time-clock-logs-page.component';
import {
  TimeClockLogsDataAccessModule,
  TimeClockLogsFacade
} from '@llstarscreamll/time-clock-logs/data-access';
import { AuthFacade } from '@llstarscreamll/authentication-data-access';
import { of } from 'rxjs';
import { createUser } from '@llstarscreamll/users/util';

describe('TimeClockLogsPageComponent', () => {
  let template: HTMLDivElement;
  let component: TimeClockLogsPageComponent;
  let fixture: ComponentFixture<TimeClockLogsPageComponent>;
  let timeClockFacade: TimeClockLogsFacade;
  const user = createUser();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        TimeClockLogsDataAccessModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [TimeClockLogsPageComponent],
      providers: [
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
        { provide: AuthFacade, useValue: { authUser$: of(user) } }
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
      template.querySelector('llstarscreamll-time-clock-logs-table')
    ).toBeTruthy();
    expect(template.querySelectorAll('llstarscreamll-pagination').length).toBe(
      2
    );
  });
});
