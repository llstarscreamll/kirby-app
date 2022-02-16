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
import { debounce, filter, takeUntil, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Tag } from '../tag.enum';
import { TagOptions } from '../tag-options';

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
  @ViewChild('subCostCenterInput') subCostCenterInput: ElementRef<HTMLInputElement>;

  @Input() machines: { id: string; name: string }[];
  @Input() products: { id: string; name: string }[];
  @Input() employees: EmployeeOption[];
  @Input() subCostCenters: { id: string; name: string }[];

  @Output() formSubmitted = new EventEmitter();
  @Output() searchProducts = new EventEmitter();
  @Output() searchMachines = new EventEmitter();
  @Output() searchEmployees = new EventEmitter();
  @Output() searchSubCostCenters = new EventEmitter();

  destroy$ = new Subject();

  tagOptions = TagOptions;
  searchForm = this.formBuilder.group({
    product: [''],
    products: [[]],
    machine: [''],
    machines: [[]],
    employee: [''],
    employees: [[]],
    subCostCenter: [''],
    subCostCenters: [[]],
    netWeight: [''],
    tags: [[{ id: Tag.InLine, name: 'En línea' }]],
    tagUpdatedAtStart: [''],
    tagUpdatedAtEnd: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
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
        tap((value) => this.searchEmployees.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.searchForm
      .get('product')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchProducts.emit({ filter: { short_name: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.searchForm
      .get('machine')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchMachines.emit({ filter: { short_name: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.searchForm
      .get('subCostCenter')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchSubCostCenters.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();
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

  get addedSubCostCenters(): { id: string; name: string }[] {
    return this.searchForm?.get('subCostCenters').value || [];
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

  addSubCostCenter(event: MatAutocompleteSelectedEvent) {
    this.searchForm.patchValue({
      subCostCenters: this.addItemToCollection(event.option.value, this.addedSubCostCenters),
      subCostCenter: '',
    });
    this.subCostCenterInput.nativeElement.value = '';
  }

  removeSubCostCenter(subCostCenter: { id: string; name: string }) {
    this.searchForm.patchValue({
      subCostCenters: this.removeItemFromCollection(subCostCenter, this.addedSubCostCenters),
    });
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
    this.formSubmitted.emit(this.parsedFormValue());
  }

  parsedFormValue() {
    const formValue = this.searchForm.value;

    return {
      employee_ids: formValue.employees.map((e) => e.id),
      product_ids: formValue.products.map((p) => p.id),
      machine_ids: formValue.machines.map((m) => m.id),
      sub_cost_center_ids: formValue.subCostCenters.map((s) => s.id),
      net_weight: formValue.netWeight,
      tags: formValue.tags.map((t) => t.id),
      tag_updated_at: {
        start: formValue.tagUpdatedAtStart ? moment(formValue.tagUpdatedAtStart).toISOString() : '',
        end: formValue.tagUpdatedAtEnd ? moment(formValue.tagUpdatedAtEnd).toISOString() : '',
      },
    };
  }

  get value() {
    return this.parsedFormValue();
  }
}
