import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WorkShiftFormComponent } from './work-shift-form.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe('WorkShiftFormComponent', () => {
  let component: WorkShiftFormComponent;
  let fixture: ComponentFixture<WorkShiftFormComponent>;
  let template: HTMLDivElement;
  const validWorkShift = {
    name: '6-2',
    start_time: '06:00',
    end_time: '14:00',
    grace_minutes_for_start_time: 30,
    grace_minutes_for_end_time: 30,
    meal_start_time: null,
    meal_time_in_minutes: null,
    min_minutes_required_to_discount_meal_time: null,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      declarations: [WorkShiftFormComponent]
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
    expect(template.querySelector('form input[formControlName="start_time"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="end_time"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="grace_minutes_for_start_time"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="grace_minutes_for_end_time"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="meal_start_time"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="meal_time_in_minutes"]')).toBeTruthy();
    expect(template.querySelector('form input[formControlName="min_minutes_required_to_discount_meal_time"]')).toBeTruthy();
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
    spyOn(component.submitted, 'emit');
    component.form.patchValue(validWorkShift);

    fixture.detectChanges();

    let submitBtn: HTMLButtonElement = template.querySelector('form button[type="submit"]');
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

  it('should disable form when @Input default == true', () => {
    component.defaults = validWorkShift;
    component.disable = true;

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.disabled).toBe(true);
  });
});
