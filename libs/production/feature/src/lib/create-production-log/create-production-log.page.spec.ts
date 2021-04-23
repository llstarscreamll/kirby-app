import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { hot, cold, time, readFirst, readAll, getTestScheduler } from '@nrwl/angular/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { User } from '@kirby/users/util';
import { LoadStatus } from '@kirby/shared';
import { ProductionFacade } from '../+state/production.facade';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { AuthFacade } from '@kirby/authentication-data-access';
import { CreateProductionLogPage } from './create-production-log.page';

describe('CreateProductionLogPage', () => {
  let authFacade: AuthFacade;
  let productionFacade: ProductionFacade;
  let component: CreateProductionLogPage;
  let fixture: ComponentFixture<CreateProductionLogPage>;
  const user = User.fromJson({
    id: 1,
    name: 'John Doe',
    roles: [],
    permissions: [{ name: 'production-logs.create-on-behalf-of-another-person' }],
  });
  const formData = {
    product: { id: 'P1', name: 'pencil' },
    machine: { id: 'M1', name: 'pencil machine' },
    customer: { id: 'C1', name: 'John Doe' },
    batch: 123,
    tare_weight: 10.5,
    gross_weight: 25.2,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatAutocompleteModule],
      declarations: [CreateProductionLogPage],
      providers: [
        {
          provide: ProductionFacade,
          useValue: {
            products$: of([{ id: 1, name: 'pencil' }]),
            error$: of(null),
            creationStatus$: of(LoadStatus.Empty),
            createProductionLog: (_) => true,
          },
        },
        {
          provide: EmployeesFacade,
          useValue: {
            paginatedEmployees$: of([{ id: 1, name: 'EMP 1' }]),
            search: (_) => true,
          },
        },
        {
          provide: AuthFacade,
          useValue: {
            authUser$: of(user),
            creationStatus$: of(LoadStatus.Empty),
            createProductionLog: (_) => true,
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductionLogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    authFacade = TestBed.inject(AuthFacade);
    productionFacade = TestBed.inject(ProductionFacade);
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
    component.user$ = of(
      User.fromJson({
        id: 2,
        name: 'John Doe',
        roles: [],
        permissions: [],
      })
    );

    component.ngOnInit();
    fixture.detectChanges();
    const html = fixture.nativeElement;

    expect(component.user.id).toBe(2);
    expect(component.form.get('employee').disabled).toBeTruthy();
  });

  it('should call products facade method on form button click', () => {
    component.form.patchValue(formData);

    spyOn(productionFacade, 'createProductionLog');

    fixture.detectChanges();

    // submit button should be enabled
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('form button[type="submit"]');
    expect(btn).toBeTruthy();
    btn.click();

    expect(productionFacade.createProductionLog).toBeCalledWith({
      employee_id: user.id,
      product_id: 'P1',
      machine_id: 'M1',
      customer_id: 'C1',
      batch: 123,
      tare_weight: 10.5,
      gross_weight: 25.2,
    });
  });

  it('should call products facade method when batch and customer are missing', () => {
    component.form.patchValue({ ...formData, batch: null, customer: null });

    spyOn(productionFacade, 'createProductionLog');

    fixture.detectChanges();

    // submit button should be enabled
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('form button[type="submit"]');
    expect(btn).toBeTruthy();
    btn.click();

    expect(productionFacade.createProductionLog).toBeCalledWith({
      employee_id: user.id,
      product_id: 'P1',
      machine_id: 'M1',
      customer_id: '',
      batch: '',
      tare_weight: 10.5,
      gross_weight: 25.2,
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
    component.creationStatus$ = of(LoadStatus.Empty, LoadStatus.Loading);
    component.saveAndCreateOther();

    expect(component.form.disabled).toBeTruthy();
  });

  it('should set to null some controls and enable form when creation status is completed', () => {
    // formulario con datos validos
    component.form.patchValue(formData);
    expect(component.form.valid).toBeTruthy();

    // programamos la emisión de estados para cuando se realice la suscripción
    component.creationStatus$ = of(LoadStatus.Empty, LoadStatus.Loading, LoadStatus.Completed);
    component.saveAndCreateOther();

    fixture.detectChanges();

    // el formulario no debe estar deshabilitado
    expect(component.form.enabled).toBeTruthy();
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
