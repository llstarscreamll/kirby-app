import { NO_ERRORS_SCHEMA, Output, EventEmitter, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryAndExitLogPageComponent } from './entry-and-exit-log-page.component';
import {
  TimeClockLogsFacade,
  TimeClockLogsDataAccessModule
} from '@llstarscreamll/time-clock-logs/data-access';
import { StoreRootModule, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'llstarscreamll-entry-and-exit-log-form',
  template: ``
})
export class FakeFormComponent {
  @Input()
  status;
  @Input()
  apiError;
  @Input()
  subCostCenters;
  @Input()
  timeClockData;

  @Output()
  submitted = new EventEmitter();
  @Output()
  codeObtained = new EventEmitter();
  @Output()
  searchSubCostCenters = new EventEmitter();

  constructor() {}
}
@Component({
  selector: 'llstarscreamll-api-errors',
  template: ``
})
export class FakeErrorsComponent {
  @Input()
  apiError;

  constructor() {}
}

describe('EntryAndExitLogPageComponent', () => {
  let component: EntryAndExitLogPageComponent;
  let fakeFormComponent: FakeFormComponent;
  let fixture: ComponentFixture<EntryAndExitLogPageComponent>;
  let template: HTMLDivElement;
  let timeClockLogFacade: TimeClockLogsFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        TimeClockLogsDataAccessModule
      ],
      declarations: [
        EntryAndExitLogPageComponent,
        FakeErrorsComponent,
        FakeFormComponent
      ],
      //schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryAndExitLogPageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    timeClockLogFacade = TestBed.get(TimeClockLogsFacade);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    expect(
      template.querySelector('llstarscreamll-entry-and-exit-log-form')
    ).toBeTruthy();
  });

  it('should listen `submitted` event from form llstarscreamll-entry-and-exit-log-form component', () => {
    spyOn(timeClockLogFacade, 'createEntryAndExitLog');

    const eventData = { some: 'data' };
    fakeFormComponent = fixture.debugElement.query(
      By.css('llstarscreamll-entry-and-exit-log-form')
    ).componentInstance;
    fakeFormComponent.submitted.emit(eventData);

    fixture.detectChanges();

    expect(timeClockLogFacade.createEntryAndExitLog).toHaveBeenCalledWith(
      eventData
    );
  });

  it('should listen `codeObtained` event from form llstarscreamll-entry-and-exit-log-form component', () => {
    spyOn(timeClockLogFacade, 'getTimeClockData');

    const eventData = { action: 'check_in', code: 'some-code-here' };
    fakeFormComponent = fixture.debugElement.query(
      By.css('llstarscreamll-entry-and-exit-log-form')
    ).componentInstance;
    fakeFormComponent.codeObtained.emit(eventData);

    fixture.detectChanges();

    expect(timeClockLogFacade.getTimeClockData).toHaveBeenCalledWith(eventData);
  });

  it('should listen `searchSubCostCenters` event from form llstarscreamll-entry-and-exit-log-form component', () => {
    spyOn(timeClockLogFacade, 'searchSubCostCenters');

    const eventData = { action: 'check_in', code: 'some-code-here' };
    fakeFormComponent = fixture.debugElement.query(
      By.css('llstarscreamll-entry-and-exit-log-form')
    ).componentInstance;
    fakeFormComponent.searchSubCostCenters.emit(eventData);

    fixture.detectChanges();

    expect(timeClockLogFacade.searchSubCostCenters).toHaveBeenCalledWith(
      eventData
    );
  });
});
