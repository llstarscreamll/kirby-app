import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoadStatuses } from '@kirby/shared';
import { NoveltyFormComponent } from './novelty-form.component';

describe('NoveltyFormComponent', () => {
  let component: NoveltyFormComponent;
  let fixture: ComponentFixture<NoveltyFormComponent>;
  let template: HTMLDivElement;
  // form elements
  const employeeFieldSelector = 'form [formControlName="employee"]';
  const noveltyTypeFieldSelector = 'form [formControlName="novelty_type"]';
  const scheduledStartFieldSelector = 'form [formControlName="scheduled_start_at"]';
  const scheduledEndFieldSelector = 'form [formControlName="scheduled_end_at"]';
  const timeFieldSelector = 'form [formControlName="total_time_in_minutes"]';
  const commentFieldSelector = 'form [formControlName="comment"]';
  const formButtonSelector = 'form button';
  const trashButtonSelector = 'form button.trash';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule
      ],
      declarations: [NoveltyFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(NoveltyFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoveltyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    template = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain form fields by default', () => {
    expect(template.querySelector(employeeFieldSelector)).toBeTruthy();
    expect(template.querySelector(noveltyTypeFieldSelector)).toBeTruthy();
    expect(template.querySelector(timeFieldSelector)).toBeFalsy();
    expect(template.querySelector(scheduledStartFieldSelector)).toBeTruthy();
    expect(template.querySelector(scheduledEndFieldSelector)).toBeTruthy();
    expect(template.querySelector(commentFieldSelector)).toBeTruthy();
    expect(template.querySelector(formButtonSelector)).toBeTruthy();
  });

  it('should have certain form fields validity by default', () => {
    expect(component.form.get('employee').valid).toBeFalsy();
    expect(component.form.get('novelty_type').valid).toBeFalsy();
    expect(component.form.get('scheduled_start_at').valid).toBeFalsy();
    expect(component.form.get('scheduled_end_at').valid).toBeFalsy();
    expect(component.form.get('total_time_in_minutes').valid).toBeTruthy();
    expect(component.form.get('comment').valid).toBeTruthy();
  });

  it('should have certain form fields validity when default values have filled total_time_in_minutes and empty scheduled times', () => {
    const employee = { id: 1, user: { first_name: 'John', last_name: 'Doe' } };
    const noveltyType = { id: 2, name: 'Foo' };
    const defaults = {
      employee: employee,
      employee_id: employee.id,
      novelty_type: noveltyType,
      novelty_type_id: noveltyType.id,
      scheduled_end_at: null,
      scheduled_start_at: null,
      total_time_in_minutes: 120,
      comment: null
    };

    component.defaults = defaults;
    component.ngOnInit();
    component.form.patchValue({total_time_in_minutes: null});

    fixture.detectChanges();

    expect(component.form.get('employee').valid).toBeTruthy();
    expect(component.form.get('novelty_type').valid).toBeTruthy();
    // this fields should be not required since they were empty on default values and total_time_in_minutes is not empty
    expect(component.form.get('scheduled_start_at').valid).toBeTruthy();
    expect(component.form.get('scheduled_end_at').valid).toBeTruthy();
    // this field should be invalid because should be now required since there are no scheduled times setted
    expect(component.form.get('total_time_in_minutes').valid).toBeFalsy();
    expect(component.form.get('comment').valid).toBeTruthy();
  });

  it('should have certain form fields validity when default values have empty scheduled times and total_time_in_minutes', () => {
    const employee = { id: 1, user: { first_name: 'John', last_name: 'Doe' } };
    const noveltyType = { id: 2, name: 'Foo' };
    const defaults = {
      employee: employee,
      employee_id: employee.id,
      novelty_type: noveltyType,
      novelty_type_id: noveltyType.id,
      scheduled_end_at: null,
      scheduled_start_at: null,
      total_time_in_minutes: null,
      comment: null
    };

    component.defaults = defaults;
    component.ngOnInit();
    component.form.patchValue({total_time_in_minutes: null});

    fixture.detectChanges();

    expect(component.form.get('employee').valid).toBeTruthy();
    expect(component.form.get('novelty_type').valid).toBeTruthy();
    expect(component.form.get('scheduled_start_at').valid).toBeFalsy();
    expect(component.form.get('scheduled_end_at').valid).toBeFalsy();
    expect(component.form.get('total_time_in_minutes').valid).toBeTruthy();
    expect(component.form.get('comment').valid).toBeTruthy();
  });

  it('should show scheduled times fields and hide time field when those default values are not empty', () => {
    const employee = { id: 1, user: { first_name: 'John', last_name: 'Doe' } };
    const noveltyType = { id: 2, name: 'Foo' };
    component.form.patchValue({
      employee_id: employee.id,
      novelty_type_id: noveltyType.id,
      scheduled_end_at: '2020-03-01T15:00:00.000000Z', // not empty
      scheduled_start_at: '2020-03-01T13:00:00.000000Z', // not empty
      total_time_in_minutes: 120,
      employee: employee,
      novelty_type: noveltyType,
      comment: 'foo'
    });

    fixture.detectChanges();

    expect(template.querySelector(timeFieldSelector)).toBeFalsy();
    expect(template.querySelector(scheduledStartFieldSelector)).toBeTruthy();
    expect(template.querySelector(scheduledEndFieldSelector)).toBeTruthy();
  });

  it('should hide scheduled times fields and show time field when those default values are empty', () => {
    const employee = { id: 1, user: { first_name: 'John', last_name: 'Doe' } };
    const noveltyType = { id: 2, name: 'Foo' };
    const defaults = {
      employee_id: employee.id,
      novelty_type_id: noveltyType.id,
      scheduled_end_at: null, // empty
      scheduled_start_at: null, // empty
      total_time_in_minutes: 120,
      employee: employee,
      novelty_type: noveltyType,
      comment: 'foo'
    };

    component.defaults = defaults;
    component.form.patchValue(defaults);

    fixture.detectChanges();

    expect(template.querySelector(timeFieldSelector)).toBeTruthy();
    expect(template.querySelector(scheduledStartFieldSelector)).toBeFalsy();
    expect(template.querySelector(scheduledEndFieldSelector)).toBeFalsy();
  });

  it('should have submit button disabled by default because invalid form', () => {
    expect(
      template.querySelector(formButtonSelector + ':disabled')
    ).toBeTruthy();
  });

  it('should have submit button disabled when status is == Loading', () => {
    component.status = LoadStatuses.Loading;
    expect(
      template.querySelector(formButtonSelector + ':disabled')
    ).toBeTruthy();
  });

  it('should emit searchEmployees when employee_id form field changes', fakeAsync(() => {
    spyOn(component.searchEmployees, 'emit');

    const search = 'John Doe';
    fixture.detectChanges();

    const employeeInput: HTMLInputElement = template.querySelector(
      employeeFieldSelector
    );

    expect(employeeInput).toBeTruthy();

    employeeInput.focus();
    employeeInput.value = search;
    employeeInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick(700);

    expect(component.searchEmployees.emit).toHaveBeenCalledWith({ search });
  }));

  it('should emit searchNoveltyTypes when novelty_type form field changes', fakeAsync(() => {
    spyOn(component.searchNoveltyTypes, 'emit');

    const search = 'example';
    fixture.detectChanges();

    const noveltyTypeInput: HTMLInputElement = template.querySelector(
      noveltyTypeFieldSelector
    );

    expect(noveltyTypeInput).toBeTruthy();

    noveltyTypeInput.focus();
    noveltyTypeInput.value = search;
    noveltyTypeInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick(700);

    expect(component.searchNoveltyTypes.emit).toHaveBeenCalledWith({ search });
  }));

  it('should patch form when defaults values are given', () => {
    const employee = { id: 1, user: { first_name: 'John', last_name: 'Doe' } };
    const noveltyType = { id: 2, name: 'Foo' };
    component.defaults = {
      employee_id: employee.id,
      novelty_type_id: noveltyType.id,
      total_time_in_minutes: 500,
      employee: employee,
      novelty_type: noveltyType,
      comment: 'foo'
    };

    // manually trigger ngOnInit
    component.ngOnInit();

    fixture.detectChanges();

    expect(component.form.get('employee').value).toEqual(employee);
    expect(component.form.get('novelty_type').value).toEqual(noveltyType);
    expect(component.form.get('total_time_in_minutes').value).toBe(500);
    expect(component.form.get('comment').value).toBe('foo');
  });

  it('should emit form values when submit button is clicked', () => {
    spyOn(component.submitted, 'emit');

    // @todo duplicated code here
    const employee = { id: 1, user: { first_name: 'John', last_name: 'Doe' } };
    const noveltyType = { id: 2, name: 'Foo' };
    component.form.patchValue({
      employee_id: employee.id,
      novelty_type_id: noveltyType.id,
      scheduled_end_at: '2020-03-01T15:00:00.000000Z',
      scheduled_start_at: '2020-03-01T13:00:00.000000Z',
      total_time_in_minutes: 120,
      employee: employee,
      novelty_type: noveltyType,
      comment: 'foo'
    });

    fixture.detectChanges();

    const submitBtn: HTMLButtonElement = template.querySelector(
      formButtonSelector
    );
    submitBtn.click();

    expect(component.submitted.emit).toHaveBeenCalledWith({
      id: null,
      employee_id: employee.id,
      novelty_type_id: noveltyType.id,
      scheduled_end_at: '2020-03-01T15:00:00.000Z',
      scheduled_start_at: '2020-03-01T13:00:00.000Z',
      total_time_in_minutes: 120,
      comment: 'foo'
    });
  });

  /**
   * ***************************************************************************
   * Trash actions
   * ***************************************************************************
   */
  it('should not show trash button when there are not defaults', () => {
    component.defaults = null;
    fixture.detectChanges();

    const trashBtn: HTMLButtonElement = template.querySelector(
      trashButtonSelector
    );

    expect(trashBtn).toBeFalsy();
  });

  it('should emit trashed event when trash button is clicked', () => {
    spyOn(component.trashed, 'emit');

    // @todo duplicated code here
    const employee = { id: 1, user: { first_name: 'John', last_name: 'Doe' } };
    const noveltyType = { id: 2, name: 'Foo' };
    const novelty = {
      id: 10,
      employee_id: employee.id,
      novelty_type_id: noveltyType.id,
      total_time_in_minutes: 500,
      employee: employee,
      novelty_type: noveltyType
    };
    component.defaults = novelty;
    component.form.patchValue(novelty);

    fixture.detectChanges();

    const trashBtn: HTMLButtonElement = template.querySelector(
      trashButtonSelector
    );
    trashBtn.click();

    expect(component.trashed.emit).toHaveBeenCalledWith(novelty);
  });
});
