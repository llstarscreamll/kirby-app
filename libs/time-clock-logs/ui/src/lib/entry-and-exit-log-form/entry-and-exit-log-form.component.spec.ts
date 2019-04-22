import { ReactiveFormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';

import { LoadStatuses } from '@llstarscreamll/shared';
import { EntryAndExitLogFormComponent } from './entry-and-exit-log-form.component';

describe('EntryAndExitLogFormComponent', () => {
  let component: EntryAndExitLogFormComponent;
  let fixture: ComponentFixture<EntryAndExitLogFormComponent>;
  let template: HTMLDivElement;
  let actionBtnSelector = 'form .action[type=button]';
  let codeInputSelector = 'form [formControlName="identification_code"]';
  let submitBtnSelector = 'form button[type="submit"]';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [EntryAndExitLogFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(EntryAndExitLogFormComponent, {
      set: { changeDetection: ChangeDetectionStrategy.Default }
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryAndExitLogFormComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain reactive form fields', () => {
    expect(component.form.get('action')).toBeTruthy();
    expect(component.form.get('identification_code')).toBeTruthy();
  });

  it('should have certain form elements', () => {
    expect(template.querySelector(actionBtnSelector)).toBeTruthy();
    expect(template.querySelector(codeInputSelector)).toBeTruthy();
    expect(template.querySelector(submitBtnSelector)).toBeTruthy();
  });

  it('button should have certain properties based on action control value', () => {
    // default button text label
    const actionBtn = template.querySelector(actionBtnSelector);
    expect(actionBtn.textContent).toContain('Entrada');
    expect(actionBtn.classList).toContain('check_in');
    expect(actionBtn.classList).not.toContain('check_out');

    component.form.patchValue({ action: 'check_out' });
    fixture.detectChanges();

    expect(actionBtn.textContent).toContain('Salida');
    expect(actionBtn.classList).toContain('check_out');
    expect(actionBtn.classList).not.toContain('check_in');
  });

  it('should disable submit button when form is invalid', () => {
    // initial status
    expect(component.form.valid).toBe(false);
    expect(template.querySelector(`${submitBtnSelector}:disabled`)).toBeTruthy();

    component.form.patchValue({ identification_code: 'fake-code' });
    fixture.detectChanges();

    expect(template.querySelector(`${submitBtnSelector}:disabled`)).toBeFalsy();
  });

  it('should disable submit button when status == loading', () => {
    // initial status
    expect(component.status).toBeFalsy();

    component.form.patchValue({ identification_code: 'fake-code' });
    fixture.detectChanges();

    expect(template.querySelector(`${submitBtnSelector}:disabled`)).toBeFalsy();

    component.status = LoadStatuses.Loading;
    fixture.detectChanges();

    expect(template.querySelector(`${submitBtnSelector}:disabled`)).toBeTruthy();
  });

  it('should emit reactive form values when form submitted', () => {
    spyOn(component.submitted, 'emit');
    component.form.patchValue({ identification_code: 'fake-code' });

    fixture.detectChanges();
    const submitBtn: HTMLButtonElement = template.querySelector(submitBtnSelector);

    submitBtn.click();
    fixture.detectChanges();

    expect(component.submitted.emit).toHaveBeenCalledWith(component.form.value);
  });

  it('should set check_in/check_out on form control value and code input focus when action button clicked', () => {
    expect(component.form.get('action').value).toBe('check_in'); // default value
    const actionBtn: HTMLButtonElement = template.querySelector(actionBtnSelector);

    actionBtn.click();
    fixture.detectChanges();

    expect(component.form.get('action').value).toBe('check_out');
    expect(actionBtn.textContent).toContain('Salida');
    expect(template.querySelector(`${codeInputSelector}:focus`)).toBeTruthy();
  });

});
