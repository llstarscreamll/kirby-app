import { timer, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounce, filter, tap, takeUntil, take } from 'rxjs/operators';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { User } from '@kirby/users/util';
import { LoadStatus } from '@kirby/shared';
import { ProductionFacade } from '../+state/production.facade';
import { AuthFacade } from '@kirby/authentication-data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';

@Component({
  selector: 'kirby-create-production-log',
  templateUrl: './create-production-log.page.html',
  styleUrls: ['./create-production-log.page.scss'],
})
export class CreateProductionLogPage implements OnInit, OnDestroy {
  destroy$ = new Subject();
  error$ = this.production.errors$;
  user$ = this.authFacade.authUser$;
  products$ = this.production.products$;
  machines$ = this.production.machines$;
  customers$ = this.production.customers$;
  creationStatus$ = this.production.creationStatus$;
  paginatedEmployees$ = this.employeesFacade.paginatedEmployees$;

  @ViewChild('tareWeightField') tareWeightField: ElementRef;

  user: User;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private production: ProductionFacade,
    private authFacade: AuthFacade,
    private employeesFacade: EmployeesFacade
  ) {}

  ngOnInit(): void {
    this.user$
      .pipe(
        filter((user) => !!user),
        tap((user) => (this.user = user)),
        tap((_) => this.buildForm()),
        tap((_) => this.listenFormChanges()),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      employee: [this.user, []],
      product: [, [Validators.required]],
      machine: [, [Validators.required]],
      customer: [],
      batch: [],
      tare_weight: [, [Validators.required, Validators.min(0)]],
      gross_weight: [, [Validators.required, Validators.min(0.1)]],
    });

    if (!this.user.can('production-logs.create-on-behalf-of-another-person')) {
      this.form.get('employee').disable();
    }
  }

  private listenFormChanges() {
    this.form
      .get('employee')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.employeesFacade.search({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('product')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.production.searchProducts({ filter: { search: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('machine')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.production.searchMachines({ filter: { search: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('customer')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.production.searchCustomers({ filter: { search: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  displayNameValue(value) {
    if (!value) {
      return '';
    }

    const values = [value.name || '', value.internal_code || '', value.code || ''];

    return values.filter((v) => v.trim() !== '').join(' - ');
  }

  saveAndCreateOther() {
    const form = this.form.value;
    this.form.disable();

    this.creationStatus$
      .pipe(
        filter((status) => status === LoadStatus.Completed),
        tap((_) => this.form.enable()),
        tap((_) => this.form.patchValue({ tare_weight: null, gross_weight: null })),
        tap((_) => this.tareWeightField.nativeElement.focus()),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.production.createProductionLog({
      employee_id: form.employee.id,
      product_id: form.product.id,
      machine_id: form.machine.id,
      customer_id: form.customer.id || '',
      batch: form.batch || '',
      tare_weight: form.tare_weight,
      gross_weight: form.gross_weight,
    });
  }
}
