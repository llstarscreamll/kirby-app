import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { createEmployee } from '@kirby/employees/testing';
import { createNoveltyType } from '@kirby/novelty-types/testing';
import { CreateNoveltiesToEmployeesFormComponent } from './create-novelties-to-employees-form.component';

describe('CreateNoveltiesToEmployeesFormComponent', () => {
  let component: CreateNoveltiesToEmployeesFormComponent;
  let fixture: ComponentFixture<CreateNoveltiesToEmployeesFormComponent>;
  let template: HTMLDivElement;
  const employeeFieldSelector = 'form [formControlName="employee"]';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatAutocompleteModule
      ],
      declarations: [CreateNoveltiesToEmployeesFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(CreateNoveltiesToEmployeesFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNoveltiesToEmployeesFormComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have submit button disabled by default', () => {
    expect(
      template.querySelector('form button[type="submit"]:disabled')
    ).toBeTruthy();
  });

  it('should emit searchEmployees when employee form field changes', fakeAsync(() => {
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

  it('should display employees found in autocomplete employee field', () => {
    // Tony Stark will be set as selected, should not displayed on options list
    const tonyStark = createEmployee('e1');
    component.employees = [
      tonyStark,
      createEmployee('e2'),
      createEmployee('e3')
    ];
    component.form.get('selected_employees').setValue([tonyStark]);

    fixture.detectChanges();

    const employeeField: HTMLInputElement = template.querySelector(
      employeeFieldSelector
    );

    employeeField.focus();
    employeeField.value = 'John';
    employeeField.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(document.querySelectorAll('mat-option').length).toBe(
      component.employees.length - 1
    );
  });

  it('should add to selected employees list and clean employee field when an employee is selected', () => {
    component.employees = [createEmployee('e1'), createEmployee('e2')];

    fixture.detectChanges();

    const employeeField: HTMLInputElement = template.querySelector(
      employeeFieldSelector
    );

    employeeField.focus();
    employeeField.value = 'John';
    employeeField.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    const employeeOption: any = document.querySelectorAll('mat-option')[0];
    employeeOption.click();

    fixture.detectChanges();

    expect(component.selectedEmployees.length).toBe(1);
    expect(component.form.get('employee').value).toBe('');
  });

  it('should display selected employees in mat-chip-list', () => {
    component.form
      .get('selected_employees')
      .setValue([
        createEmployee('e1'),
        createEmployee('e2'),
        createEmployee('e3')
      ]);

    fixture.detectChanges();

    expect(template.querySelectorAll('mat-chip-list mat-chip').length).toBe(3);
  });

  it('should remove selected employee when mat-chip-list item is clicked on cancel button', () => {
    component.form
      .get('selected_employees')
      .setValue([
        createEmployee('e1'),
        createEmployee('e2'),
        createEmployee('e3')
      ]);

    fixture.detectChanges();

    const removeElement: HTMLDivElement = template.querySelector(
      'mat-chip-list mat-chip:first-child mat-icon'
    );
    removeElement.click();

    fixture.detectChanges();

    expect(component.selectedEmployees.length).toBe(2);
    expect(template.querySelectorAll('mat-chip-list mat-chip').length).toBe(2);
  });

  it('should display message when no employees are selected', () => {
    // no employees are selected by default, so the message should be displayed
    expect(template.querySelector('.no-employees-selected')).toBeTruthy();
  });

  it('should NOT display message when there are employees selected', () => {
    component.form.get('selected_employees').setValue([createEmployee('e1')]);

    fixture.detectChanges();

    expect(template.querySelector('.no-employees-selected')).toBeFalsy();
  });

  // ************************************************************************ //
  //                      novelty types array controls                        //
  // ************************************************************************ //

  it('should have one novelty type form control array group by default', () => {
    expect(component.form.get('novelty_types').value.length).toBe(1);
    expect(
      template.querySelectorAll('.novelty-type-options .option').length
    ).toBe(1);
  });

  it('should have certain elements in novelty type form controls array group', () => {
    const firstOption = template.querySelector(
      '.novelty-type-options .option:first-child'
    );

    expect(
      firstOption.querySelector('[formControlName="novelty_type"]')
    ).toBeTruthy();
    expect(
      firstOption.querySelector('[formControlName="scheduled_start_at"]')
    ).toBeTruthy();
    expect(
      firstOption.querySelector('[formControlName="scheduled_end_at"]')
    ).toBeTruthy();
    expect(firstOption.querySelector('button mat-icon')).toBeTruthy();
    expect(
      firstOption.querySelector('[formControlName="comment"]')
    ).toBeTruthy();
  });

  it('should remove item from novelty type form controls array group on cancel button click', () => {
    const firstOption = template.querySelector(
      '.novelty-type-options .option:first-child'
    );

    firstOption.querySelector<HTMLButtonElement>('button').click();
    fixture.detectChanges();

    expect(component.form.get('novelty_types').value.length).toBe(0);
  });

  it('should add item from novelty type form controls array group on button click', () => {
    const addOptionBtn: HTMLButtonElement = template.querySelector(
      'button.add-novelty-option'
    );
    addOptionBtn.click();

    fixture.detectChanges();

    expect(component.form.get('novelty_types').value.length).toBe(1 + 1); // one from default + one added;
  });

  it('should set comment field required if novelty type requires a comment', () => {
    let formData = {
      novelty_types: [
        {
          novelty_type: {
            ...createNoveltyType('n1'),
            requires_comment: true // this novelty type requires comment
          },
          scheduled_start_at: '2019-01-01 10:00:00',
          scheduled_end_at: '2019-01-01 12:00:00',
          comment: '' // empty comment
        }
      ]
    };

    component.form.patchValue(formData);

    fixture.detectChanges();

    let formArray: FormArray = component.form.get('novelty_types') as FormArray;
    let commentFormControl: AbstractControl = formArray.at(0).get('comment');

    expect(commentFormControl.valid).toBe(false); // the field should not be invalid because now is required and is empty

    commentFormControl.setValue('test comment');

    expect(commentFormControl.valid).toBe(true);
  });

  it('should emit submitted form values', () => {
    spyOn(component.submitted, 'emit');

    component.form.patchValue(
      {
        selected_employees: [createEmployee('e1'), createEmployee('e2')],
        employee: null,
        novelty_types: [
          {
            novelty_type: createNoveltyType('n1'),
            scheduled_start_at: '2019-01-01 10:00:00',
            scheduled_end_at: '2019-01-01 12:00:00',
            comment: 'test comment'
          }
        ]
      },
      { emitEvent: false }
    );

    fixture.detectChanges();

    expect(component.form.valid).toBe(true);

    const submitBtn: HTMLButtonElement = template.querySelector(
      'form button[type="submit"]'
    );
    submitBtn.click();

    expect(component.submitted.emit).toHaveBeenCalledWith({
      employee_ids: ['e1', 'e2'],
      novelties: [
        {
          novelty_type_id: 'n1',
          scheduled_start_at: '2019-01-01 10:00:00',
          scheduled_end_at: '2019-01-01 12:00:00',
          comment: 'test comment'
        }
      ]
    });
  });
});
