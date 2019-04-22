import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryAndExitLogPageComponent } from './entry-and-exit-log-page.component';

describe('EntryAndExitLogPageComponent', () => {
  let component: EntryAndExitLogPageComponent;
  let fixture: ComponentFixture<EntryAndExitLogPageComponent>;
  let template: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EntryAndExitLogPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryAndExitLogPageComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    expect(template.querySelector('llstarscreamll-entry-and-exit-log-form')).toBeTruthy();
  });
});
