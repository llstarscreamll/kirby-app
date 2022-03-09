import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';

import { User } from '@kirby/users/util';
import { ProductionLogFormComponent } from './production-log-form.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LoadStatus } from '@kirby/shared';

describe('ProductionLogFormComponent', function () {
  let component: ProductionLogFormComponent;
  let fixture: ComponentFixture<ProductionLogFormComponent>;
  const user = User.fromJson({
    id: 1,
    name: 'John Doe',
    roles: [],
    permissions: [{ name: 'production-logs.create-on-behalf-of-another-person' }],
  });
  const formData = {
    product: { id: 'P1', short_name: 'pencil', name: 'Great Pencil' },
    machine: { id: 'M1', name: 'pencil machine' },
    customer: { id: 'C1', name: 'John Doe' },
    batch: 123,
    tare_weight: 10.5,
    gross_weight: 25.2,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatAutocompleteModule],
      declarations: [ProductionLogFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductionLogFormComponent);
    component = fixture.componentInstance;
    component.user = user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    const html = fixture.nativeElement;

    expect(html.querySelector('form [formControlName="employee"]')).toBeTruthy();
    expect(html.querySelector('form [formControlName="product"]')).toBeTruthy();
    expect(html.querySelector('form [formControlName="machine"]')).toBeTruthy();
    expect(html.querySelector('form [formControlName="customer"]')).toBeTruthy();
    expect(html.querySelector('form [formControlName="batch"][type=number]')).toBeTruthy();
    expect(html.querySelector('form [formControlName="tare_weight"][type=number]')).toBeTruthy();
    expect(html.querySelector('form [formControlName="gross_weight"][type=number]')).toBeTruthy();
    expect(html.querySelector('form button[type="submit"]:disabled')).toBeTruthy();
  });

  it('should disable employee form control when user has not permission', () => {
    // user does not have the role the make the employee field enabled
    component.user = User.fromJson({
      id: 2,
      name: 'John Doe',
      roles: [],
      permissions: [],
    });

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.user.id).toBe(2);
    expect(component.form.get('employee').disabled).toBeTruthy();
  });

  it('should emit save event when form button is clicked', () => {
    component.form.patchValue(formData);

    spyOn(component.saveAndAddOther, 'emit');

    fixture.detectChanges();

    // submit button should be enabled
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('form button.save-and-add-other');
    expect(btn).toBeTruthy();
    btn.click();

    expect(component.saveAndAddOther.emit).toBeCalledWith({
      employee_id: user.id,
      product_id: 'P1',
      machine_id: 'M1',
      customer_id: 'C1',
      batch: 123,
      tare_weight: 10.5,
      gross_weight: 25.2,
      tag: null,
    });
  });

  it('should disable buttons when form is disabled', () => {
    component.form.disable();

    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('form button[type="submit"]:disabled')).toBeTruthy();
  });

  it('should disable form on save and create another btn click', () => {
    // formulario con datos validos
    component.form.patchValue(formData);
    expect(component.form.valid).toBeTruthy();

    // programamos la emisión de estados para cuando se realice la suscripción
    component.status = LoadStatus.Loading;
    component.emitSaveAndAddOther();

    expect(component.form.disabled).toBeTruthy();
  });

  it('should set to null some controls and enable form when creation status is completed', () => {
    // formulario con datos validos
    component.form.patchValue(formData);
    expect(component.form.valid).toBeTruthy();

    // programamos la emisión de estados para cuando se realice la suscripción
    component.status = LoadStatus.Empty;
    fixture.detectChanges();

    component.emitSaveAndAddOther();
    component.ngOnChanges({ status: new SimpleChange(LoadStatus.Empty, LoadStatus.Completed, false) });

    fixture.detectChanges();

    // el formulario no debe estar deshabilitado
    // @todo: check why this assert does not work
    // expect(component.form.enabled).toBeTruthy();
    // el formulario no debe ser válido ya que debió vaciar los datos de los
    // campos tare_weight y gross_weight los cuales son obligatorios
    expect(component.form.valid).toBeFalsy();
    expect(component.form.get('tare_weight').value).toBeNull();
    expect(component.form.get('gross_weight').value).toBeNull();
    // los demás campos debieron mantener sus valores
    expect(component.form.get('product').value).not.toBeNull();
    expect(component.form.get('machine').value).not.toBeNull();
    expect(component.form.get('customer').value).not.toBeNull();
    expect(component.form.get('batch').value).not.toBeNull();
  });
});
