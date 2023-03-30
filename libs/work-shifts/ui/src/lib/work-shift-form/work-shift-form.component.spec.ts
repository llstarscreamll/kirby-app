import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoadStatus } from '@kirby/shared';
import { WorkShiftFormComponent } from './work-shift-form.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

describe('WorkShiftFormComponent', () => {
  let component: WorkShiftFormComponent;
  let fixture: ComponentFixture<WorkShiftFormComponent>;
  let template: HTMLDivElement;
  const validWorkShift = {
    name: '6-2',
    grace_minutes_before_start_times: 10,
    grace_minutes_after_start_times: 10,
    grace_minutes_before_end_times: 10,
    grace_minutes_after_end_times: 10,
    meal_time_in_minutes: 0,
    min_minutes_required_to_discount_meal_time: 0,
    applies_on_days: [1, 2, 3, 4, 5],
    time_zone: 'UTC',
    time_slots: [{ start: '07:00', end: '17:00' }],
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatInputModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [WorkShiftFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkShiftFormComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain certain form fields', () => {
    expect(template.querySelector('form input[formControlName="name"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="grace_minutes_before_start_times"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="grace_minutes_after_start_times"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="grace_minutes_before_end_times"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="grace_minutes_after_end_times"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="meal_time_in_minutes"]')).toBeTruthy();
    expect(
      template.querySelector('form input[formControlName="min_minutes_required_to_discount_meal_time"]')
    ).toBeTruthy();

    // 7 days from monday to sunday
    expect(template.querySelectorAll('form .apply_on_days mat-checkbox').length).toBe(7);

    // time slots
    expect(template.querySelector('form .time-slots div input[formControlName="start"]')).toBeTruthy();
    expect(template.querySelector('form .time-slots div input[formControlName="end"]')).toBeTruthy();

    expect(template.querySelector('form button[type="submit"]')).toBeTruthy();
  });

  it('should start as invalid with submit button disabled', () => {
    expect(component.form.valid).toBe(false);
    expect(template.querySelector('form button[type="submit"]:disabled')).toBeTruthy();
  });

  it('should enable submit button when form is valid', () => {
    component.form.patchValue(validWorkShift);

    fixture.detectChanges();

    expect(template.querySelector('form button[type="submit"]:disabled')).toBeFalsy();
  });

  it('should emit form value on form submit', () => {
   jest.spyOn(component.submitted, 'emit');
    component.form.patchValue(validWorkShift);

    fixture.detectChanges();

    const submitBtn: HTMLButtonElement = template.querySelector('form button[type="submit"]');
    submitBtn.click();

    fixture.detectChanges();

    expect(component.submitted.emit).toHaveBeenCalledWith(validWorkShift);
  });

  it('should patch form value if default values given', () => {
    component.defaults = validWorkShift;

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.value).toEqual(validWorkShift);
  });

  it('should disable form when @Input disable == true', () => {
    component.defaults = validWorkShift;
    component.disable = true;

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.disabled).toBe(true);
  });

  it('should disable submit button when @Input status == loading', () => {
    component.defaults = validWorkShift;
    component.status = LoadStatus.Loading;

    component.ngOnInit();
    fixture.detectChanges();

    expect(template.querySelector('form button[type="submit"]:disabled')).toBeTruthy();
  });
});
