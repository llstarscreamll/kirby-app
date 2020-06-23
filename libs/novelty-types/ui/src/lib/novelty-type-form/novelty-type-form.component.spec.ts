import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoveltyTypeFormComponent } from './novelty-type-form.component';
import { MatRadioModule } from '@angular/material/radio';

describe('NoveltyTypeFormComponent', () => {
  let template: HTMLDivElement;
  let component: NoveltyTypeFormComponent;
  let fixture: ComponentFixture<NoveltyTypeFormComponent>;
  const codeFieldSelector = 'form [formControlName=code]';
  const nameFieldSelector = 'form [formControlName=name]';
  const operatorFieldSelector = 'form [formControlName=operator]';
  const requiresCommentFieldSelector =
    'form [formControlName=requires_comment]';
  const keepInReportFieldSelector = 'form [formControlName=requires_comment]';
  const submitBtnSelector = 'form  button[type=submit]';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatRadioModule, ReactiveFormsModule],
      declarations: [NoveltyTypeFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyTypeFormComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component.defaults should be undefined by default', () => {
    expect(component.defaults).toBeUndefined();
  });

  it('should have certain elements', () => {
    expect(template.querySelector(codeFieldSelector)).toBeTruthy();
    expect(template.querySelector(nameFieldSelector)).toBeTruthy();
    expect(template.querySelector(operatorFieldSelector)).toBeTruthy();
    component.operators.forEach((operator, i) =>
      expect(
        template.querySelector(
          `${operatorFieldSelector} mat-radio-button:nth-child(${i + 1})`
        ).textContent
      ).toContain(operator.name)
    );
    expect(template.querySelector(requiresCommentFieldSelector)).toBeTruthy();
    expect(
      template.querySelector(
        `${requiresCommentFieldSelector} mat-radio-button:first-child`
      ).textContent
    ).toContain('Si');
    expect(
      template.querySelector(
        `${requiresCommentFieldSelector} mat-radio-button:last-child`
      ).textContent
    ).toContain('No');
    expect(template.querySelector(keepInReportFieldSelector)).toBeTruthy();
    expect(
      template.querySelector(
        `${keepInReportFieldSelector} mat-radio-button:first-child`
      ).textContent
    ).toContain('Si');
    expect(
      template.querySelector(
        `${keepInReportFieldSelector} mat-radio-button:last-child`
      ).textContent
    ).toContain('No');
    expect(template.querySelector(submitBtnSelector)).toBeTruthy();
  });

  it('should have submit button disabled when form is not valid', () => {
    expect(component.form.valid).toBe(false);
    expect(
      template.querySelector(`${submitBtnSelector}:disabled`)
    ).toBeTruthy();
  });

  it('should patch form values when defaults are given', () => {
    component.defaults = {
      code: 'AAA',
      name: 'Foo',
      operator: 'addition',
      time_zone: 'America/Bogota',
      requires_comment: true,
      keep_in_report: false,
    };

    component.ngOnInit();

    expect(component.form.value).toEqual({
      code: 'AAA',
      name: 'Foo',
      operator: 'addition',
      time_zone: 'America/Bogota',
      requires_comment: true,
      keep_in_report: false,
    });
  });

  it('should emit form values on submit button clicked', () => {
    component.form.patchValue({
      code: 'AAA',
      name: 'Foo',
      operator: 'addition',
      time_zone: 'America/Bogota',
      requires_comment: true,
      keep_in_report: false,
    });

    fixture.detectChanges();

    spyOn(component.submitted, 'emit');
    const submitBtn: HTMLButtonElement = template.querySelector(
      submitBtnSelector
    );
    submitBtn.click();

    expect(component.submitted.emit).toHaveBeenCalledWith({
      code: 'AAA',
      name: 'Foo',
      operator: 'addition',
      time_zone: 'America/Bogota',
      requires_comment: true,
      keep_in_report: false,
    });
  });
});
