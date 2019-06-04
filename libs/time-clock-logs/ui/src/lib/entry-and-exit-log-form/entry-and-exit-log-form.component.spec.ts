import { ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from '@angular/material/radio';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ChangeDetectionStrategy, SimpleChange } from '@angular/core';

import { LoadStatuses } from '@llstarscreamll/shared';
import { EntryAndExitLogFormComponent } from './entry-and-exit-log-form.component';

describe('EntryAndExitLogFormComponent', () => {
  let component: EntryAndExitLogFormComponent;
  let fixture: ComponentFixture<EntryAndExitLogFormComponent>;
  let template: HTMLDivElement;
  let actionBtnSelector = 'form .action[type=button]';
  let codeInputSelector = 'form [formControlName="identification_code"]';
  let noveltyTypeInputSelector = 'form [formControlName="novelty_type"]';
  let workShiftInputSelector = 'form [formControlName="work_shift_id"]';
  let submitBtnSelector = 'form button[type="submit"]';
  const noveltyTypes = [
    { id: 1, name: 'Novelty 1' },
    { id: 2, name: 'Novelty 2' },
  ];
  const workShifts = [
    { id: 1, name: 'Work shift 1' },
    { id: 2, name: 'Work shift 2' },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatRadioModule,
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

    expect(component.submitted.emit).toHaveBeenCalledWith({
      action: 'check_in',
      identification_code: 'fake-code',
      work_shift_id: null,
      novelty_type: null,
    });
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

  it('should make required and show `novelty_type` form control when apiError has code == 1055', () => {
    expect(component.hasError1055).toBe(false);
    // novelty_type control is not required by default
    expect(component.form.get('novelty_type').valid).toBe(true);
    expect(component.form.get('novelty_type').validator).toBe(null);
    expect(template.querySelector(noveltyTypeInputSelector)).toBeFalsy();

    component.apiError = {
      message: 'Unprocessable entity',
      ok: false,
      error: {
        message: 'crap',
        errors: [
          {
            code: 1055,
            title: 'novelty error',
            detail: 'error detail',
            meta: { novelty_types: noveltyTypes }
          }
        ]
      }
    };

    component.ngOnChanges({ apiError: new SimpleChange(null, component.apiError, true) });
    fixture.detectChanges();

    expect(component.hasError1055).toBe(true);
    expect(component.noveltyTypes.length).toBe(2);
    // novelty_type should be now required
    expect(component.form.get('novelty_type').validator('')).toEqual({ required: true });
    expect(template.querySelector(noveltyTypeInputSelector)).toBeTruthy();
    expect(template.querySelector(noveltyTypeInputSelector).textContent).toContain(noveltyTypes[0].name);
    expect(template.querySelector(noveltyTypeInputSelector).textContent).toContain(noveltyTypes[1].name);
  });

  it('should make required and show `novelty_type` form control when apiError has code == 1053', () => {
    expect(component.hasError1053).toBe(false);
    // novelty_type control is not required by default
    expect(component.form.get('novelty_type').valid).toBe(true);
    expect(component.form.get('novelty_type').validator).toBe(null);
    expect(template.querySelector(noveltyTypeInputSelector)).toBeFalsy();

    component.apiError = {
      message: 'Unprocessable entity',
      ok: false,
      error: {
        message: 'crap!!',
        errors: [
          {
            code: 1053,
            title: 'another novelty error',
            detail: 'error detail',
            meta: { novelty_types: noveltyTypes }
          }
        ]
      }
    };

    component.ngOnChanges({ apiError: new SimpleChange(null, component.apiError, true) });
    fixture.detectChanges();

    expect(component.hasError1053).toBe(true);
    expect(component.noveltyTypes.length).toBe(2);
    // novelty_type should be now required
    expect(component.form.get('novelty_type').validator('')).toEqual({ required: true });
    expect(template.querySelector(noveltyTypeInputSelector)).toBeTruthy();
    expect(template.querySelector(noveltyTypeInputSelector).textContent).toContain(noveltyTypes[0].name);
    expect(template.querySelector(noveltyTypeInputSelector).textContent).toContain(noveltyTypes[1].name);
  });

  it('should make required and show `work_shift_id` form control when apiError has code == 1051', () => {
    expect(component.hasError1051).toBe(false);
    // work_shift_id control is not required by default
    expect(component.form.get('work_shift_id').valid).toBe(true);
    expect(component.form.get('work_shift_id').validator).toBe(null);
    expect(template.querySelector(workShiftInputSelector)).toBeFalsy();

    component.apiError = {
      message: 'Unprocessable entity',
      ok: false,
      error: {
        message: 'crap!!',
        errors: [
          {
            code: 1051,
            title: 'work shift error',
            detail: 'error detail',
            meta: { work_shifts: workShifts }
          }
        ]
      }
    };

    component.ngOnChanges({ apiError: new SimpleChange(null, component.apiError, true) });
    fixture.detectChanges();

    expect(component.hasError1051).toBe(true);
    expect(component.workShifts.length).toBe(2);
    // work_shift_id should be now required
    expect(component.form.get('work_shift_id').validator('')).toEqual({ required: true });
    expect(template.querySelector(workShiftInputSelector)).toBeTruthy();
    expect(template.querySelector(workShiftInputSelector).textContent).toContain(workShifts[0].name);
    expect(template.querySelector(workShiftInputSelector).textContent).toContain(workShifts[1].name);
  });

});
