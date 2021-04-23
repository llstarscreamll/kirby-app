import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { createEmployee } from '@kirby/employees/testing';
import { EmployeeFormComponent } from './employee-form.component';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  const submitButtonSelector = 'form button[type=submit]';
  const costCenterSelector = 'form [formControlName=cost_center]';
  const firstNameSelector = 'form [formControlName=first_name]';
  const lastNameSelector = 'form [formControlName=last_name]';
  const codeSelector = 'form [formControlName=code]';
  const identificationSelector = 'form [formControlName=identification_number]';
  const positionSelector = 'form [formControlName=position]';
  const locationSelector = 'form [formControlName=location]';
  const addressSelector = 'form [formControlName=address]';
  const phoneSelector = 'form [formControlName=phone]';
  const salarySelector = 'form [formControlName=salary]';
  const workShiftsSelector = 'form [formControlName=work_shifts]';
  const identificationNameSelector =
    'form .identifications div [formControlName=name]';
  const identificationCodeSelector =
    'form .identifications div [formControlName=code]';
  const addIdentificationBtnSelector = 'form .add-identification-code';

  /**
   * @todo test that the cost_center form changes emits a searchCostCenter event
   */
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
      ],
      declarations: [EmployeeFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(EmployeeFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have not valid reactive form by default when no defaults are provided', () => {
    component.employee = null;

    fixture.detectChanges();

    expect(component.form.valid).toBe(false);
  });

  it('should disable form submit button when reactive form is not valid or when status == loading', () => {
    component.employee = null;
    component.status = null;
    const html: HTMLDivElement = fixture.nativeElement;

    fixture.detectChanges();

    expect(html.querySelector(submitButtonSelector + ':disabled')).toBeTruthy();
  });

  it('should have certain elements by default', () => {
    const html: HTMLDivElement = fixture.nativeElement;

    fixture.detectChanges();

    expect(html.querySelector(submitButtonSelector)).toBeTruthy();
    expect(html.querySelector(costCenterSelector)).toBeTruthy();
    expect(html.querySelector(firstNameSelector)).toBeTruthy();
    expect(html.querySelector(lastNameSelector)).toBeTruthy();
    expect(html.querySelector(codeSelector)).toBeTruthy();
    expect(html.querySelector(identificationSelector)).toBeTruthy();
    expect(html.querySelector(positionSelector)).toBeTruthy();
    expect(html.querySelector(locationSelector)).toBeTruthy();
    expect(html.querySelector(addressSelector)).toBeTruthy();
    expect(html.querySelector(phoneSelector)).toBeTruthy();
    expect(html.querySelector(salarySelector)).toBeTruthy();
    expect(html.querySelector(workShiftsSelector)).toBeTruthy();
    expect(html.querySelector(identificationNameSelector)).toBeTruthy();
    expect(html.querySelector(identificationCodeSelector)).toBeTruthy();
  });

  it('should add identification to array form group on button click', () => {
    const html: HTMLDivElement = fixture.nativeElement;

    fixture.detectChanges();

    component.form.patchValue({
      identifications: [{ name: 'PIN', code: '123456' }]
    });

    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = html.querySelector(
      addIdentificationBtnSelector
    );
    buttonElement.click();

    fixture.detectChanges();

    expect(component.form.get('identifications').value.length).toBe(2);
  });

  it('should remove identification from array form group on button click', () => {
    const html: HTMLDivElement = fixture.nativeElement;

    fixture.detectChanges();

    component.form.patchValue({
      identifications: [{ name: 'PIN', code: '123456' }]
    });

    fixture.detectChanges();

    const buttonElement: HTMLButtonElement = html.querySelector(
      'form .identifications div:first-child .remove-identification-code'
    );
    buttonElement.click();

    fixture.detectChanges();

    expect(component.form.get('identifications').value.length).toBe(0);
  });

  it('should have add and remove identification code buttons disabled by default', () => {
    fixture.detectChanges();

    const html: HTMLDivElement = fixture.nativeElement;
    const addButton: HTMLButtonElement = html.querySelector(
      addIdentificationBtnSelector
    );
    const removeButton: HTMLButtonElement = html.querySelector(
      'form .identifications div:first-child .remove-identification-code'
    );

    expect(addButton.disabled).toBe(true);
    expect(removeButton.disabled).toBe(true);
  });

  it('should emit form value con form submit button click', () => {
    fixture.detectChanges();

    const employee = {
      ...createEmployee('A1'),
      cost_center: { id: 'CC1', name: 'Cost Center 1' },
      work_shifts: [{ id: 'WS1', name: 'Work Shift 1' }],
      identifications: [{ name: 'PIN', code: '123456ABC' }]
    };

    component.form.patchValue(employee);

    fixture.detectChanges();

    expect(component.form.valid).toBe(true);

    spyOn(component.submitted, 'emit');
    const submitBtn = fixture.nativeElement.querySelector(submitButtonSelector);
    submitBtn.click();

    expect(component.submitted.emit).toHaveBeenCalledWith(component.form.value);
  });
});
