import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  NO_ERRORS_SCHEMA,
  ChangeDetectionStrategy,
  SimpleChange
} from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { LoadStatuses } from '@kirby/shared';
import { createWorkShift } from '@kirby/work-shifts/testing';
import { EntryAndExitLogFormComponent } from './entry-and-exit-log-form.component';

/**
 * @todo test fallback work shift selection
 * @todo test sub cost center field displaying when fallback work shift is selected
 * @todo test that sub_cost_center and novelty_type_id are required when work_shift_id == -1
 */
describe('EntryAndExitLogFormComponent', () => {
  let component: EntryAndExitLogFormComponent;
  let fixture: ComponentFixture<EntryAndExitLogFormComponent>;
  let template: HTMLDivElement;
  // code form fields selectors
  const actionBtnSelector = 'form#code-form .action[type=button]';
  const codeInputSelector =
    'form#code-form [formControlName="identification_code"]';
  const submitCodeFormBtnSelector = 'form#code-form button[type="submit"]';
  // check in/out form fields selectors
  const workShiftFieldSelector =
    'form#check-form [formControlName="work_shift_id"]';
  const workShiftOptionSelector = workShiftFieldSelector + ' mat-radio-button';
  const noveltyTypeFieldSelector =
    'form#check-form [formControlName="novelty_type_id"]';
  const noveltySubCostCenterInputSelector =
    'form#check-form [formControlName="novelty_sub_cost_center"]';
  const subCostCenterInputSelector =
    'form#check-form [formControlName="sub_cost_center"]';
  const submitCheckFormBtnSelector = 'form#check-form button[type="submit"]';

  let earlyTimeClockData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatRadioModule, ReactiveFormsModule, MatAutocompleteModule],
      declarations: [EntryAndExitLogFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(EntryAndExitLogFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryAndExitLogFormComponent);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();

    earlyTimeClockData = {
      action: 'check_in',
      employee: { id: '1', name: 'John Doe' },
      punctuality: -1, // to early
      work_shifts: [
        {
          id: '1',
          name: '7-18',
          grace_minutes_for_start_times: 15,
          grace_minutes_for_end_times: 15,
          meal_time_in_minutes: 60,
          min_minutes_required_to_discount_meal_time: 60 * 11,
          applies_on_days: [1, 2, 3, 4, 5], // work days
          time_slots: [
            { start: '07:00', end: '12:00' },
            { start: '13:00', end: '18:00' }
          ]
        }
      ],
      novelty_types: [
        {
          id: '1',
          code: 'N-1',
          name: 'Test novelty',
          operator: 'addition',
          apply_on_days_of_type: 'workday'
        },
        {
          id: '2',
          code: 'N-2',
          name: 'Another test novelty',
          operator: 'addition',
          apply_on_days_of_type: 'workday'
        }
      ],
      sub_cost_centers: [
        {
          id: '1',
          name: 'Sub cost center test',
          selected_at: '2019-01-01 10:00:00'
        },
        {
          id: '2',
          name: 'Another sub cost center test',
          selected_at: '2018-12-24 10:00:00'
        }
      ]
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * code form tests
   */
  it('should have certain code form elements', () => {
    expect(template.querySelector(actionBtnSelector)).toBeTruthy();
    expect(template.querySelector(codeInputSelector)).toBeTruthy();
    expect(template.querySelector(submitCodeFormBtnSelector)).toBeTruthy();
  });

  it('should have certain code form button properties based on action control value', () => {
    // default button text label
    const actionBtn = template.querySelector(actionBtnSelector);
    expect(actionBtn.textContent).toContain('Entrada');
    expect(actionBtn.classList).toContain('check_in');
    expect(actionBtn.classList).not.toContain('check_out');

    component.codeForm.patchValue({ action: 'check_out' });
    fixture.detectChanges();

    expect(actionBtn.textContent).toContain('Salida');
    expect(actionBtn.classList).toContain('check_out');
    expect(actionBtn.classList).not.toContain('check_in');
  });

  it('should disable submit button when code form is invalid', () => {
    // initial status
    expect(component.codeForm.valid).toBe(false);
    expect(
      template.querySelector(`${submitCodeFormBtnSelector}:disabled`)
    ).toBeTruthy();

    component.codeForm.patchValue({ identification_code: 'fake-code' });
    fixture.detectChanges();

    expect(
      template.querySelector(`${submitCodeFormBtnSelector}:disabled`)
    ).toBeFalsy();
  });

  it('should disable code form submit button when status == loading', () => {
    // initial status
    expect(component.status).toBeFalsy();

    component.codeForm.patchValue({ identification_code: 'fake-code' });
    fixture.detectChanges();

    expect(
      template.querySelector(`${submitCodeFormBtnSelector}:disabled`)
    ).toBeFalsy();

    component.status = LoadStatuses.Loading;
    fixture.detectChanges();

    expect(
      template.querySelector(`${submitCodeFormBtnSelector}:disabled`)
    ).toBeTruthy();
  });

  it('should set check_in/check_out on code form control value and code input focus when action button clicked', () => {
    expect(component.codeForm.get('action').value).toBe('check_in'); // default value
    const actionBtn: HTMLButtonElement = template.querySelector(
      actionBtnSelector
    );

    actionBtn.click();
    fixture.detectChanges();

    expect(component.codeForm.get('action').value).toBe('check_out');
    expect(actionBtn.textContent).toContain('Salida');
    expect(template.querySelector(`${codeInputSelector}:focus`)).toBeTruthy();
  });

  it('should emit form values when code form is submitted', () => {
    spyOn(component.submitted, 'emit');
    component.codeForm.patchValue({ identification_code: 'fake-code' });

    fixture.detectChanges();
    const submitBtn: HTMLButtonElement = template.querySelector(
      submitCodeFormBtnSelector
    );

    submitBtn.click();
    fixture.detectChanges();

    expect(component.submitted.emit).toHaveBeenCalledWith({
      action: 'check_in',
      identification_code: 'fake-code'
    });
  });

  /**
   * check in/out form tests
   */

  it('should display check form and remove code form when time clock data is set', () => {
    component.timeClockData = earlyTimeClockData;

    fixture.detectChanges();

    expect(template.querySelector('form#check-form')).toBeTruthy();
    expect(template.querySelector('form#code-form')).toBeFalsy();
  });

  it('should set sub_cost_center as required when action == check_out', () => {
    // when action is check in, then sub_cost_center is not required
    component.codeForm.patchValue({ action: 'check_in' });
    expect(component.checkForm.get('sub_cost_center').valid).toBe(true);

    component.codeForm.patchValue({ action: 'check_out' });
    component.timeClockData = earlyTimeClockData;

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    // remove sub_cost_center field suggested value
    component.checkForm.get('sub_cost_center').setValue(null);
    expect(component.checkForm.get('sub_cost_center').valid).toBe(false);
  });

  it("should NOT set novelty type field as required if time clock data doesn't have novelty types", () => {
    // when action is check in, then sub_cost_center is not required
    component.codeForm.patchValue({ action: 'check_in' });
    expect(component.checkForm.get('novelty_type_id').valid).toBe(true);
    expect(component.checkForm.get('novelty_type_id').validator).toBe(null);

    // fake a late check out
    component.codeForm.patchValue({ action: 'check_out' });
    component.timeClockData = earlyTimeClockData;
    component.timeClockData.action = 'check_out';

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });

    fixture.detectChanges();

    // sub_cost_center field should not be empty
    expect(component.checkForm.get('sub_cost_center').value).toBeTruthy();
    expect(component.checkForm.get('novelty_type_id').valid).toBe(true);
    expect(component.checkForm.get('novelty_type_id').validator).toBe(null);
    expect(component.checkForm.get('novelty_sub_cost_center').valid).toBe(true);
    expect(
      template.querySelector('form button[type="submit"]:disabled')
    ).toBeFalsy();
  });

  it('should set work shift as selected if there is only one option on check form', () => {
    component.timeClockData = earlyTimeClockData;

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    // work shift field must be present and selected because there is only one
    expect(
      template.querySelector(workShiftFieldSelector + ' input:checked')
    ).toBeTruthy();
    expect(
      template.querySelector(workShiftFieldSelector).textContent
    ).toContain(earlyTimeClockData.work_shifts[0].name);
  });

  it('should not set as selected the work shift if there is more than one on check form', () => {
    component.timeClockData = earlyTimeClockData;
    component.timeClockData.work_shifts.push(createWorkShift('2'));

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    // work shift field must be present with two options and no one selected
    expect(
      template.querySelector(workShiftFieldSelector + ' input:checked')
    ).toBeFalsy();
    expect(template.querySelectorAll(workShiftOptionSelector).length).toBe(2);
    expect(
      template.querySelectorAll(workShiftOptionSelector)[0].textContent
    ).toContain(earlyTimeClockData.work_shifts[0].name);
    expect(
      template.querySelectorAll(workShiftOptionSelector)[1].textContent
    ).toContain(earlyTimeClockData.work_shifts[1].name);
  });

  it('should have certain form fields when timeClockData is too EARLY for check in on check form', () => {
    component.timeClockData = earlyTimeClockData;

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    // work shift field must be present
    expect(template.querySelector(workShiftFieldSelector)).toBeTruthy();

    // novelty type field must be present
    expect(template.querySelector(noveltyTypeFieldSelector)).toBeTruthy();
    expect(
      template.querySelector(noveltyTypeFieldSelector).textContent
    ).toContain(earlyTimeClockData.novelty_types[0].name);
    expect(
      template.querySelector(noveltyTypeFieldSelector).textContent
    ).toContain(earlyTimeClockData.novelty_types[1].name);

    // novelty sub cost center field must be present because novelty type operator is addition
    expect(
      template.querySelector(noveltySubCostCenterInputSelector)
    ).toBeTruthy();
    // novelty sub cost center field must have selected the latest sub cost center given on timeClockData
    expect(component.checkForm.get('novelty_sub_cost_center').value).toBe(
      earlyTimeClockData.sub_cost_centers[0]
    );
  });

  it('should have certain form fields when timeClockData is too EARLY for check out on check form', () => {
    component.timeClockData = earlyTimeClockData;
    component.timeClockData.action = 'check_out';
    component.timeClockData.novelty_types[0].name = 'Test novelty';
    component.timeClockData.novelty_types[0].operator = 'subtraction';
    component.timeClockData.novelty_types[1].name = 'Another test novelty';
    component.timeClockData.novelty_types[1].operator = 'subtraction';

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    // work shift field must not to be present
    expect(template.querySelector(workShiftFieldSelector)).toBeFalsy();

    // novelty type field must be present
    expect(template.querySelector(noveltyTypeFieldSelector)).toBeTruthy();
    expect(
      template.querySelector(noveltyTypeFieldSelector).textContent
    ).toContain(earlyTimeClockData.novelty_types[0].name);
    expect(
      template.querySelector(noveltyTypeFieldSelector).textContent
    ).toContain(earlyTimeClockData.novelty_types[1].name);

    // novelty sub cost center field must not to be present because novelty type operator is subtraction
    expect(
      template.querySelector(noveltySubCostCenterInputSelector)
    ).toBeFalsy();
    // sub cost center field must be present because action is check out
    expect(template.querySelector(subCostCenterInputSelector)).toBeTruthy();
    // sub cost center field must have selected the latest sub cost center given on timeClockData
    expect(component.checkForm.get('sub_cost_center').value).toBe(
      earlyTimeClockData.sub_cost_centers[0]
    );
  });

  it('should have certain form fields when timeClockData is too LATE for check in on check form', () => {
    component.timeClockData = earlyTimeClockData;
    component.timeClockData.punctuality = 1; // too late
    component.timeClockData.novelty_types[0].name = 'Test novelty';
    component.timeClockData.novelty_types[0].operator = 'subtraction';
    component.timeClockData.novelty_types[1].name = 'Another test novelty';
    component.timeClockData.novelty_types[1].operator = 'subtraction';

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    // work shift field must be present
    expect(template.querySelector(workShiftFieldSelector)).toBeTruthy();

    // novelty type field must be present
    expect(template.querySelector(noveltyTypeFieldSelector)).toBeTruthy();
    expect(
      template.querySelector(noveltyTypeFieldSelector).textContent
    ).toContain(earlyTimeClockData.novelty_types[0].name);
    expect(
      template.querySelector(noveltyTypeFieldSelector).textContent
    ).toContain(earlyTimeClockData.novelty_types[1].name);

    // novelty sub cost center field must not to be present because novelty type operator is subtraction
    expect(
      template.querySelector(noveltySubCostCenterInputSelector)
    ).toBeFalsy();
  });

  it('should have certain form fields when timeClockData is too LATE for check out on check form', () => {
    component.timeClockData = earlyTimeClockData;
    component.timeClockData.punctuality = 1; // too late
    component.timeClockData.action = 'check_out';
    component.timeClockData.novelty_types[0].name = 'Test novelty';
    component.timeClockData.novelty_types[0].operator = 'addition';
    component.timeClockData.novelty_types[1].name = 'Another test novelty';
    component.timeClockData.novelty_types[1].operator = 'addition';

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    // work shift field must not to be present
    expect(template.querySelector(workShiftFieldSelector)).toBeFalsy();

    // novelty type field must be present
    expect(template.querySelector(noveltyTypeFieldSelector)).toBeTruthy();
    expect(
      template.querySelector(noveltyTypeFieldSelector).textContent
    ).toContain(earlyTimeClockData.novelty_types[0].name);
    expect(
      template.querySelector(noveltyTypeFieldSelector).textContent
    ).toContain(earlyTimeClockData.novelty_types[1].name);

    // novelty sub cost center field must be present because novelty type operator is addition
    expect(
      template.querySelector(noveltySubCostCenterInputSelector)
    ).toBeTruthy();
    // novelty sub cost center field must have selected the most recent sub cost center given on timeClockData
    expect(component.checkForm.get('novelty_sub_cost_center').value).toBe(
      earlyTimeClockData.sub_cost_centers[0]
    );
    // sub cost center field must be present because action is check out
    expect(template.querySelector(subCostCenterInputSelector)).toBeTruthy();
    // sub cost center field must have selected the latest sub cost center given on timeClockData
    expect(component.checkForm.get('sub_cost_center').value).toBe(
      earlyTimeClockData.sub_cost_centers[0]
    );
  });

  it('should emit searchSubCostCenters when novelty_sub_cost_center form field changes', fakeAsync(() => {
    spyOn(component.searchSubCostCenters, 'emit');

    const search = 'some search text';
    component.timeClockData = earlyTimeClockData;
    component.timeClockData.action = 'check_out';

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    const noveltySubCostCenterInput: HTMLInputElement = template.querySelector(
      noveltySubCostCenterInputSelector
    );

    // sub cost center field must be present because action is check out
    expect(noveltySubCostCenterInput).toBeTruthy();

    noveltySubCostCenterInput.focus();
    noveltySubCostCenterInput.value = search;
    noveltySubCostCenterInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick(700);

    expect(component.searchSubCostCenters.emit).toHaveBeenCalledWith({
      search
    });
  }));

  it('should emit searchSubCostCenters when sub_cost_center form field changes', fakeAsync(() => {
    spyOn(component.searchSubCostCenters, 'emit');

    const search = 'some search text';
    component.timeClockData = earlyTimeClockData;
    component.timeClockData.action = 'check_out';

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    const subCostCenterInput: HTMLInputElement = template.querySelector(
      subCostCenterInputSelector
    );

    // sub cost center field must be present because action is check out
    expect(subCostCenterInput).toBeTruthy();

    subCostCenterInput.focus();
    subCostCenterInput.value = search;
    subCostCenterInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick(700);

    expect(component.searchSubCostCenters.emit).toHaveBeenCalledWith({
      search
    });
  }));

  it('should display sub cost center list on novelty_sub_cost_center input focus', () => {
    component.timeClockData = earlyTimeClockData;
    component.timeClockData.action = 'check_out';
    component.subCostCenters = [
      { id: '1', name: 'Sub Cost Center First' },
      { id: '2', name: 'Sub Cost Center Second' }
    ];

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    const noveltySubCostCenterInput: HTMLInputElement = template.querySelector(
      noveltySubCostCenterInputSelector
    );

    // manually trigger focus and input events
    noveltySubCostCenterInput.focus();
    noveltySubCostCenterInput.value = 'sub';
    noveltySubCostCenterInput.dispatchEvent(new Event('input'));

    const options = document.querySelectorAll(
      '.mat-autocomplete-panel mat-option'
    );

    expect(noveltySubCostCenterInput).toBeTruthy();
    expect(options.length).toBe(4); // 2 suggested + 2 found
  });

  it('should display sub cost center list on sub_cost_center input focus', () => {
    component.timeClockData = earlyTimeClockData;
    component.timeClockData.action = 'check_out';
    component.subCostCenters = [
      { id: '1', name: 'Sub Cost Center First' },
      { id: '2', name: 'Sub Cost Center Second' }
    ];

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    const subCostCenterInput: HTMLInputElement = template.querySelector(
      subCostCenterInputSelector
    );

    // manually trigger focus and input events
    subCostCenterInput.focus();
    subCostCenterInput.value = 'sub';
    subCostCenterInput.dispatchEvent(new Event('input'));

    const options = document.querySelectorAll(
      '.mat-autocomplete-panel mat-option'
    );

    expect(subCostCenterInput).toBeTruthy();
    expect(options.length).toBe(4); // 2 suggested + 2 found
  });

  it('should emit data on check form submitted', () => {
    spyOn(component.submitted, 'emit');
    component.timeClockData = earlyTimeClockData;

    const checkFormData = {
      action: 'check_out',
      identification_code: 'some-code-123',
      novelty_type_id: earlyTimeClockData.novelty_types[0].id,
      work_shift_id: earlyTimeClockData.work_shifts[0].id,
      sub_cost_center: earlyTimeClockData.sub_cost_centers[0],
      novelty_sub_cost_center: earlyTimeClockData.sub_cost_centers[0],
      sub_cost_center_id: earlyTimeClockData.sub_cost_centers[0].id,
      novelty_sub_cost_center_id: earlyTimeClockData.sub_cost_centers[0].id
    };

    component.codeForm.patchValue(checkFormData);
    component.checkForm.patchValue(checkFormData);

    component.ngOnChanges({
      timeClockData: new SimpleChange(null, component.timeClockData, true)
    });
    fixture.detectChanges();

    const submitBtn: HTMLButtonElement = template.querySelector(
      submitCheckFormBtnSelector
    );
    expect(component.checkForm.valid).toBe(true);
    expect(submitBtn).toBeTruthy();
    submitBtn.click();

    expect(component.submitted.emit).toHaveBeenCalledWith(checkFormData);
  });

  it('should clean forms when status == Completed', () => {
    component.timeClockData = earlyTimeClockData;
    const checkFormData = {
      action: 'check_out',
      identification_code: 'some-code-123',
      novelty_type_id: earlyTimeClockData.novelty_types.shift().id,
      work_shift_id: earlyTimeClockData.work_shifts.shift().id,
      sub_cost_center: earlyTimeClockData.sub_cost_centers[0],
      novelty_sub_cost_center: earlyTimeClockData.sub_cost_centers[0],
      sub_cost_center_id: earlyTimeClockData.sub_cost_centers[0].id,
      novelty_sub_cost_center_id: earlyTimeClockData.sub_cost_centers[0].id
    };
    component.codeForm.patchValue(checkFormData);
    component.checkForm.patchValue(checkFormData);

    expect(component.codeForm.valid).toBe(true);
    expect(component.checkForm.valid).toBe(true);

    component.status = LoadStatuses.Completed;
    component.ngOnChanges({
      status: new SimpleChange(
        LoadStatuses.Empty,
        LoadStatuses.Completed,
        false
      )
    });
    fixture.detectChanges();

    expect(component.codeForm.value).toEqual({
      action: 'check_in',
      identification_code: null
    });
    expect(component.checkForm.value).toEqual({
      novelty_type_id: null,
      work_shift_id: null,
      sub_cost_center: null,
      novelty_sub_cost_center: null
    });
  });

  it('should show employee name when time clock data is available', () => {
    component.timeClockData = earlyTimeClockData;

    fixture.detectChanges();

    expect(template.querySelector('h4').textContent).toContain('John Doe');
  });
});
