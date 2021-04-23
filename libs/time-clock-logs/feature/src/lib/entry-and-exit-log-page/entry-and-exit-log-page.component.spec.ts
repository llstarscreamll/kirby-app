import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Output, EventEmitter, Input } from '@angular/core';

import { EntryAndExitLogPageComponent } from './entry-and-exit-log-page.component';
import { TimeClockLogsFacade } from '@kirby/time-clock-logs/data-access';

@Component({
  selector: 'kirby-entry-and-exit-log-form',
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
  selector: 'kirby-api-errors',
  template: ``
})
export class FakeErrorsComponent {
  @Input()
  apiError;

  constructor() {}
}

describe('EntryAndExitLogPageComponent', () => {
  let template: HTMLDivElement;
  let fakeFormComponent: FakeFormComponent;
  let component: EntryAndExitLogPageComponent;
  let timeClockLogFacade: TimeClockLogsFacade;
  let fixture: ComponentFixture<EntryAndExitLogPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        EntryAndExitLogPageComponent,
        FakeErrorsComponent,
        FakeFormComponent
      ],
      providers: [
        {
          provide: TimeClockLogsFacade,
          useValue: {
            cleanError: () => true,
            createEntryAndExitLog: data => true,
            getTimeClockData: code => true,
            searchSubCostCenters: code => true
          }
        }
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
      template.querySelector('kirby-entry-and-exit-log-form')
    ).toBeTruthy();
  });

  it('should listen `submitted` event from form kirby-entry-and-exit-log-form component', () => {
    spyOn(timeClockLogFacade, 'createEntryAndExitLog');

    const eventData = { some: 'data' };
    fakeFormComponent = fixture.debugElement.query(
      By.css('kirby-entry-and-exit-log-form')
    ).componentInstance;
    fakeFormComponent.submitted.emit(eventData);

    fixture.detectChanges();

    expect(timeClockLogFacade.createEntryAndExitLog).toHaveBeenCalledWith(
      eventData
    );
  });

  it('should listen `codeObtained` event from form kirby-entry-and-exit-log-form component', () => {
    spyOn(timeClockLogFacade, 'getTimeClockData');

    const eventData = { action: 'check_in', code: 'some-code-here' };
    fakeFormComponent = fixture.debugElement.query(
      By.css('kirby-entry-and-exit-log-form')
    ).componentInstance;
    fakeFormComponent.codeObtained.emit(eventData);

    fixture.detectChanges();

    expect(timeClockLogFacade.getTimeClockData).toHaveBeenCalledWith(eventData);
  });

  it('should listen `searchSubCostCenters` event from form kirby-entry-and-exit-log-form component', () => {
    spyOn(timeClockLogFacade, 'searchSubCostCenters');

    const eventData = { action: 'check_in', code: 'some-code-here' };
    fakeFormComponent = fixture.debugElement.query(
      By.css('kirby-entry-and-exit-log-form')
    ).componentInstance;
    fakeFormComponent.searchSubCostCenters.emit(eventData);

    fixture.detectChanges();

    expect(timeClockLogFacade.searchSubCostCenters).toHaveBeenCalledWith({
      ...eventData,
      orderBy: 'code',
      searchFields: 'code:like'
    });
  });
});
