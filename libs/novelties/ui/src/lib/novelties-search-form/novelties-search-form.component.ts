import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import moment from 'moment';
import { omit } from 'lodash-es';
import { Subject, timer } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, filter, tap, debounce } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Pagination } from '@kirby/shared';
import { CostCenter } from '@kirby/cost-centers/data';
import { INoveltyType } from '@kirby/novelty-types/data';
import { EmployeeInterface } from '@kirby/employees/util';

@Component({
  selector: 'kirby-novelties-search-form',
  templateUrl: './novelties-search-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoveltiesSearchFormComponent implements OnInit, OnDestroy {
  @ViewChild('employeeInput') employeeInput: ElementRef<HTMLInputElement>;
  @ViewChild('costCenterInput') costCenterInput: ElementRef<HTMLInputElement>;
  @ViewChild('noveltyTypeInput') noveltyTypeInput: ElementRef<HTMLInputElement>;

  @Input() globalSearch = true;
  @Input() costCentersFound: Pagination<CostCenter>;
  @Input() employeesFound: Pagination<EmployeeInterface>;
  @Input() noveltyTypesFound: Pagination<INoveltyType>;

  @Output() submitted = new EventEmitter();
  @Output() searchEmployees = new EventEmitter();
  @Output() searchNoveltyTypes = new EventEmitter();
  @Output() searchCostCenters = new EventEmitter();

  advancedFormDestroy$ = new Subject();

  simpleSearchForm: FormGroup;
  advancedSearchForm: FormGroup;

  enableAdvancedSearch = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.simpleSearchForm = this.formBuilder.group({
      search: [],
      page: [1],
    });
  }

  ngOnDestroy(): void {
    this.advancedFormDestroy$.next();
    this.advancedFormDestroy$.complete();
  }

  get addedEmployees(): any[] {
    return this.advancedSearchForm ? this.advancedSearchForm.get('employees').value : [];
  }

  employeeIsSelected(employee): boolean {
    return this.addedEmployees.map((e) => e.id).includes(employee.id);
  }

  addEmployee(event: MatAutocompleteSelectedEvent) {
    this.advancedSearchForm.patchValue({
      employees: this.addItemToCollection(event.option.value, this.addedEmployees),
      employeeSearch: '',
    });
    this.employeeInput.nativeElement.value = '';
  }

  removeEmployee(employee: any) {
    this.advancedSearchForm.patchValue({ employees: this.removeItemFromCollection(employee, this.addedEmployees) });
  }

  get addedNoveltyTypes(): any[] {
    return this.advancedSearchForm ? this.advancedSearchForm.get('noveltyTypes').value : [];
  }

  noveltyTypeIsSelected(noveltyType): boolean {
    return this.addedNoveltyTypes.map((e) => e.id).includes(noveltyType.id);
  }

  addNoveltyType(event: MatAutocompleteSelectedEvent) {
    this.advancedSearchForm.patchValue({
      noveltyTypes: this.addItemToCollection(event.option.value, this.addedNoveltyTypes),
      noveltyTypeSearch: '',
    });
    this.noveltyTypeInput.nativeElement.value = '';
  }

  removeNoveltyType(noveltyType: any) {
    this.advancedSearchForm.patchValue({
      noveltyTypes: this.removeItemFromCollection(noveltyType, this.addedNoveltyTypes),
    });
  }

  get addedCostCenters(): any[] {
    return this.advancedSearchForm ? this.advancedSearchForm.get('costCenters').value : [];
  }

  costCenterIsSelected(costCenter): boolean {
    return this.addedCostCenters.map((e) => e.id).includes(costCenter.id);
  }

  addCostCenter(event: MatAutocompleteSelectedEvent) {
    this.advancedSearchForm.patchValue({
      costCenters: this.addItemToCollection(event.option.value, this.addedCostCenters),
      costCenterSearch: '',
    });
    this.costCenterInput.nativeElement.value = '';
  }

  removeCostCenter(costCenter: any) {
    this.advancedSearchForm.patchValue({
      costCenters: this.removeItemFromCollection(costCenter, this.addedCostCenters),
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

  buildAdvancedSearchForm() {
    this.advancedSearchForm = this.formBuilder.group({
      startAtFrom: [moment().startOf('month').startOf('day').format('YYYY-MM-DDTHH:mm')],
      startAtTo: [moment().endOf('month').endOf('day').format('YYYY-MM-DDTHH:mm')],
      noveltyTypesSearch: [],
      noveltyTypes: [[]],
      employeesSearch: [],
      employees: [[]],
      costCentersSearch: [],
      costCenters: [[]],
      page: [1],
    });

    this.advancedSearchForm
      .get('noveltyTypesSearch')
      .valueChanges.pipe(
        takeUntil(this.advancedFormDestroy$),
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchNoveltyTypes.emit({ search: value }))
      )
      .subscribe();

    this.advancedSearchForm
      .get('employeesSearch')
      .valueChanges.pipe(
        takeUntil(this.advancedFormDestroy$),
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchEmployees.emit({ search: value }))
      )
      .subscribe();

    this.advancedSearchForm
      .get('costCentersSearch')
      .valueChanges.pipe(
        takeUntil(this.advancedFormDestroy$),
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value !== ''),
        tap((value) => this.searchCostCenters.emit({ search: value }))
      )
      .subscribe();
  }

  onSimpleSearchSubmit() {
    this.submitted.emit(this.simpleSearchForm.value);
  }

  onAdvancedSearchSubmitted() {
    const formData = this.advancedSearchForm.value;

    const formValues = {
      ...omit(formData, [
        'startAtFrom',
        'startAtTo',
        'costCenters',
        'noveltyTypes',
        'noveltyTypesSearch',
        'employeesSearch',
        'costCentersSearch',
      ]),
      start_at: { from: formData.startAtFrom, to: formData.startAtTo },
      novelty_types: formData.noveltyTypes.map((t) => ({ id: t.id })),
      cost_centers: formData.costCenters.map((t) => ({ id: t.id })),
    };

    this.submitted.emit({ ...formValues });
  }

  toggleAdvancedSearch() {
    this.enableAdvancedSearch = !this.enableAdvancedSearch;

    if (this.enableAdvancedSearch) {
      this.buildAdvancedSearchForm();

      return;
    }

    this.advancedFormDestroy$.next();
    this.advancedSearchForm = null;
  }

  searchPlaceHolder(): string {
    return this.globalSearch === true
      ? 'Buscar por nombre, apellido, email, código, identificación o tipo de novedad'
      : 'Buscar por tipo de novedad';
  }

  displayEmployeeFieldValue(employee: EmployeeInterface) {
    return employee ? employee.first_name + ' ' + employee.last_name : null;
  }

  displayNameFieldValue(entity: { name: string; code: string }) {
    return entity ? entity.code + ' ' + entity.name : null;
  }
}
