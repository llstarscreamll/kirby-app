import { Subject, timer } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounce, filter, takeUntil, tap } from 'rxjs/operators';

import { AuthFacade } from '@kirby/authentication/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { ProductionFacade } from '../+state/production.facade';
import moment from 'moment';

@Component({
  selector: 'kirby-production-logs',
  templateUrl: './production-logs.page.html',
})
export class ProductionLogsPage implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user$ = this.authFacade.authUser$;
  errors$ = this.productionFacade.errors$;
  machines$ = this.productionFacade.machines$;
  products$ = this.productionFacade.products$;
  pagination$ = this.productionFacade.pagination$;
  productionLogs$ = this.productionFacade.productionLogs$;
  paginatedEmployees$ = this.employeesFacade.paginatedEmployees$;

  searchForm = this.formBuilder.group({
    product: [''],
    machine: [''],
    employee: [''],
    net_weight: [''],
    creation_date_start: [''],
    creation_date_end: [''],
  });

  constructor(
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
    private employeesFacade: EmployeesFacade,
    private productionFacade: ProductionFacade
  ) {}

  ngOnInit(): void {
    this.searchLogs();
    this.listenFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenFormChanges() {
    this.searchForm
      .get('employee')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.employeesFacade.search({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.searchForm
      .get('product')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.productionFacade.searchProducts({ filter: { short_name: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.searchForm
      .get('machine')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.productionFacade.searchMachines({ filter: { short_name: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  searchLogs(query: any = {}) {
    console.warn('search query', query);

    this.productionFacade.searchProductionLogs({ include: 'employee,product,machine', ...query });
  }

  submitSearchForm() {
    this.searchLogs({ filter: this.parsedFormValue() });
  }

  parsedFormValue() {
    let formValue = this.searchForm.value;

    return {
      employee_id: formValue.employee.id ?? '',
      product_id: formValue.product.id ?? '',
      machine_id: formValue.machine.id ?? '',
      net_weight: formValue.net_weight,
      creation_date: {
        start: formValue.creation_date_start ? moment(formValue.creation_date_start).toISOString() : '',
        end: formValue.creation_date_end ? moment(formValue.creation_date_end).toISOString() : '',
      },
    };
  }

  exportLogsToCsv(filter) {
    this.productionFacade.exportToCsv({ filter });
  }

  displayNameValue(value) {
    if (!value) {
      return '';
    }

    const values = [
      (value.first_name || '') + ' ' + (value.last_name || ''),
      value.name || '',
      value.customer_code || '',
      value.code || '',
    ];

    return values.filter((v) => v.trim() !== '').join(' - ');
  }

  displayShortNameValue(value) {
    if (!value) {
      return '';
    }

    return value.short_name;
  }
}
