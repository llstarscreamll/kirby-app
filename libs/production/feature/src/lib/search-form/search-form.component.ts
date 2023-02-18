import {
  Input,
  OnInit,
  Output,
  ViewChild,
  OnDestroy,
  Component,
  ElementRef,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import moment from 'moment';
import { Subject, timer } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { debounce, filter, map, takeUntil, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { TagOptions } from '@kirby/production/ui';
import { EmployeesFacade } from '@kirby/employees/data-access';

import { ProductionFacade } from '../+state/production.facade';
import { PurposeOptions } from 'libs/production/ui/src/lib/purpose-options';

interface EmployeeOption {
  id: string;
  first_name: string;
  last_name: string;
}

@Component({
  selector: 'kirby-search-form',
  templateUrl: './search-form.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFormComponent implements OnInit, OnDestroy {
  @ViewChild('employeeInput') employeeInput: ElementRef<HTMLInputElement>;
  @ViewChild('productInput') productInput: ElementRef<HTMLInputElement>;
  @ViewChild('machineInput') machineInput: ElementRef<HTMLInputElement>;
  @ViewChild('costCenterInput') costCenterInput: ElementRef<HTMLInputElement>;

  @Input() defaults = {};
  @Output() submitted = new EventEmitter();

  destroy$ = new Subject();
  machines$ = this.productionFacade.machines$.pipe(
    map((data) => data.filter((row) => !this.addedMachines.map((m) => m.id).includes(row.id)))
  );
  products$ = this.productionFacade.products$;
  costCenters$ = this.productionFacade.costCenters$;
  employees$ = this.employeesFacade.paginatedEmployees$.pipe(map((paginatedData) => paginatedData.data));

  tagOptions = TagOptions;
  purposeOptions = PurposeOptions;
  searchForm = this.formBuilder.group({
    product: '',
    products: [],
    machine: '',
    machines: [],
    employee: '',
    employees: [],
    costCenter: '',
    costCenters: [],
    netWeight: '',
    tags: [],
    purposes: [],
    tagUpdatedAtStart: '',
    tagUpdatedAtEnd: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private employeesFacade: EmployeesFacade,
    private productionFacade: ProductionFacade
  ) {}

  ngOnInit(): void {
    this.searchForm.patchValue(this.defaults);
    this.listenFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get value() {
    return this.parsedFormValue();
  }

  get addedEmployees(): EmployeeOption[] {
    return this.searchForm?.get('employees').value || [];
  }

  get addedProducts(): EmployeeOption[] {
    return this.searchForm?.get('products').value || [];
  }

  get addedMachines(): { id: string; name: string }[] {
    return this.searchForm?.get('machines').value || [];
  }

  get addedCostCenters(): { id: string; name: string }[] {
    return this.searchForm?.get('costCenters').value || [];
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
      .get('costCenter')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.productionFacade.searchCostCenters({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.searchForm
      .get('machine')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) =>
          this.productionFacade.searchMachines({
            filter: { short_name: value, cost_center_ids: this.addedCostCenters.map((c) => c.id) },
          })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  addEmployee(event: MatAutocompleteSelectedEvent) {
    this.searchForm.patchValue({
      employees: this.addItemToCollection(event.option.value, this.addedEmployees),
      employee: '',
    });
    this.employeeInput.nativeElement.value = '';
  }

  removeEmployee(employee: EmployeeOption) {
    this.searchForm.patchValue({ employees: this.removeItemFromCollection(employee, this.addedEmployees) });
  }

  employeeIsSelected(employee): boolean {
    return this.addedEmployees.map((e) => e.id).includes(employee.id);
  }

  addMachine(event: MatAutocompleteSelectedEvent) {
    this.searchForm.patchValue({
      machines: this.addItemToCollection(event.option.value, this.addedMachines),
      machine: '',
    });
    this.machineInput.nativeElement.value = '';
  }

  removeMachine(machine: { id: string }) {
    this.searchForm.patchValue({ machines: this.removeItemFromCollection(machine, this.addedMachines) });
  }

  machineIsSelected(machine): boolean {
    return this.addedMachines.map((m) => m.id).includes(machine.id);
  }

  addProduct(event: MatAutocompleteSelectedEvent) {
    this.searchForm.patchValue({
      products: this.addItemToCollection(event.option.value, this.addedProducts),
      product: '',
    });
    this.productInput.nativeElement.value = '';
  }

  removeProduct(product: { id: string }) {
    this.searchForm.patchValue({ products: this.removeItemFromCollection(product, this.addedProducts) });
  }

  productIsSelected(product): boolean {
    return this.addedProducts.map((p) => p.id).includes(product.id);
  }

  addCostCenter(event: MatAutocompleteSelectedEvent) {
    this.searchForm.patchValue({
      costCenters: this.addItemToCollection(event.option.value, this.addedCostCenters),
      costCenter: '',
    });
    this.costCenterInput.nativeElement.value = '';
  }

  removeCostCenter(costCenter: { id: string; name: string }) {
    this.searchForm.patchValue({
      costCenters: this.removeItemFromCollection(costCenter, this.addedCostCenters),
    });

    if (this.addedCostCenters.length === 0) {
      this.searchForm.patchValue({ machine: '', machines: [] });
    }
  }

  costCenterIsSelected(costCenter): boolean {
    return this.addedCostCenters.map((s) => s.id).includes(costCenter.id);
  }

  addItemToCollection(item: { id: string }, collection: { id: string }[]): { id: string }[] {
    if (collection.findIndex((added) => added.id === item.id) === -1) {
      collection.push(item);
    }

    return collection;
  }

  removeItemFromCollection(item: { id: string }, collection: { id: string }[]): { id: string }[] {
    const itemIndex = collection.findIndex((added) => added.id === item.id);

    if (itemIndex > -1) {
      collection.splice(itemIndex, 1);
    }

    return collection;
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

  compareWithFunction(item1, item2): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  submit() {
    this.submitted.emit(this.parsedFormValue());
  }

  parsedFormValue() {
    const formValue = this.searchForm.value;

    return {
      employee_ids: formValue.employees.map((e) => e.id),
      product_ids: formValue.products.map((p) => p.id),
      machine_ids: formValue.machines.map((m) => m.id),
      cost_center_ids: formValue.costCenters.map((s) => s.id),
      net_weight: formValue.netWeight,
      tags: formValue.tags.map((t) => t.id),
      purposes: formValue.purposes.map((p) => p.id),
      tag_updated_at: {
        start: formValue.tagUpdatedAtStart ? moment(formValue.tagUpdatedAtStart).toISOString() : '',
        end: formValue.tagUpdatedAtEnd ? moment(formValue.tagUpdatedAtEnd).toISOString() : '',
      },
    };
  }
}
