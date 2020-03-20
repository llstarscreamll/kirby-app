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
  const timeFieldSelector = 'form [formControlName="total_time_in_minutes"]';
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

  it('should have certain form fields', () => {
    expect(template.querySelector(employeeFieldSelector)).toBeTruthy();
    expect(template.querySelector(noveltyTypeFieldSelector)).toBeTruthy();
    expect(template.querySelector(timeFieldSelector)).toBeTruthy();
    expect(template.querySelector(formButtonSelector)).toBeTruthy();
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
      novelty_type: noveltyType
    };

    // manually trigger ngOnInit
    component.ngOnInit();

    fixture.detectChanges();

    expect(component.form.get('employee').value).toEqual(employee);
    expect(component.form.get('novelty_type').value).toEqual(noveltyType);
    expect(component.form.get('total_time_in_minutes').value).toBe(500);
  });

  it('should emit form values when submit button is clicked', () => {
    spyOn(component.submitted, 'emit');

    // @todo duplicated code here
    const employee = { id: 1, user: { first_name: 'John', last_name: 'Doe' } };
    const noveltyType = { id: 2, name: 'Foo' };
    component.form.patchValue({
      employee_id: employee.id,
      novelty_type_id: noveltyType.id,
      total_time_in_minutes: 500,
      employee: employee,
      novelty_type: noveltyType
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
      total_time_in_minutes: 500
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

    const trashBtn: HTMLButtonElement = template.querySelector(trashButtonSelector);

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

    const trashBtn: HTMLButtonElement = template.querySelector(trashButtonSelector);
    trashBtn.click();

    expect(component.trashed.emit).toHaveBeenCalledWith(novelty);
  });

  
});
