import { omit } from 'lodash';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  OnDestroy
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntil, filter, tap, debounce } from 'rxjs/internal/operators';

import { Pagination } from '@kirby/shared';
import { CostCenter } from '@kirby/cost-centers/data/src';
import { EmployeeInterface } from '@kirby/employees/util/src';
import { NoveltyType } from '@kirby/novelty-types/data/src';
import moment from 'moment';

@Component({
  selector: 'kirby-novelties-search-form',
  templateUrl: './novelties-search-form.component.html',
  styleUrls: ['./novelties-search-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoveltiesSearchFormComponent implements OnInit, OnDestroy {
  @Input() costCentersFound: Pagination<CostCenter>;
  @Input() employeesFound: Pagination<EmployeeInterface>;
  @Input() noveltyTypesFound: Pagination<NoveltyType>;

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
      page: [1]
    });
  }

  ngOnDestroy(): void {
    this.advancedFormDestroy$.next();
    this.advancedFormDestroy$.complete();
  }

  get selectedEmployees(): EmployeeInterface[] {
    return this.advancedSearchForm
      ? this.advancedSearchForm.get('employees').value
      : [];
  }

  get selectedNoveltyTypes(): CostCenter[] {
    return this.advancedSearchForm
      ? this.advancedSearchForm.get('noveltyTypes').value
      : [];
  }

  get selectedCostCenters(): CostCenter[] {
    return this.advancedSearchForm
      ? this.advancedSearchForm.get('costCenters').value
      : [];
  }

  removeEmployee(employee) {
    const selectedEmployees = this.selectedEmployees;

    this.advancedSearchForm
      .get('employees')
      .setValue([...selectedEmployees.filter(e => e.id !== employee.id)]);
  }

  removeNoveltyType(noveltyType) {
    const selectedNoveltyTypes = this.selectedNoveltyTypes;

    this.advancedSearchForm
      .get('noveltyTypes')
      .setValue([...selectedNoveltyTypes.filter(n => n.id !== noveltyType.id)]);
  }

  removeCostCenter(costCenter) {
    const selectedCostCenters = this.selectedCostCenters;

    this.advancedSearchForm
      .get('costCenters')
      .setValue([...selectedCostCenters.filter(c => c.id !== costCenter.id)]);
  }

  buildAdvancedSearchForm() {
    this.advancedSearchForm = this.formBuilder.group({
      startAtFrom: [
        moment()
          .startOf('month')
          .startOf('day')
          .format('YYYY-MM-DDTHH:mm')
      ],
      startAtTo: [
        moment()
          .endOf('month')
          .endOf('day')
          .format('YYYY-MM-DDTHH:mm')
      ],
      noveltyTypesSearch: [],
      noveltyTypes: [[]],
      employeesSearch: [],
      employees: [[]],
      costCentersSearch: [],
      costCenters: [[]],
      page: [1]
    });

    this.advancedSearchForm
      .get('noveltyTypesSearch')
      .valueChanges.pipe(
        tap(value =>
          typeof value === 'object' ? this.addNoveltyType(value) : null
        ),
        takeUntil(this.advancedFormDestroy$),
        debounce(() => timer(400)),
        filter(value => typeof value === 'string' && value.trim() !== ''),
        tap(value => this.searchNoveltyTypes.emit({ search: value }))
      )
      .subscribe();

    this.advancedSearchForm
      .get('employeesSearch')
      .valueChanges.pipe(
        tap(value =>
          typeof value === 'object' ? this.addEmployee(value) : null
        ),
        takeUntil(this.advancedFormDestroy$),
        debounce(() => timer(400)),
        filter(value => typeof value === 'string' && value !== ''),
        tap(value => this.searchEmployees.emit({ search: value }))
      )
      .subscribe();

    this.advancedSearchForm
      .get('costCentersSearch')
      .valueChanges.pipe(
        tap(value =>
          typeof value === 'object' ? this.addCostCenter(value) : null
        ),
        takeUntil(this.advancedFormDestroy$),
        debounce(() => timer(400)),
        filter(value => typeof value === 'string' && value !== ''),
        tap(value => this.searchCostCenters.emit({ search: value }))
      )
      .subscribe();
  }

  addNoveltyType(noveltyType: NoveltyType) {
    let selectedNoveltyTypes: NoveltyType[] = this.advancedSearchForm.get(
      'noveltyTypes'
    ).value;

    selectedNoveltyTypes = [...selectedNoveltyTypes, noveltyType];

    this.advancedSearchForm.get('noveltyTypes').setValue(selectedNoveltyTypes);
    this.advancedSearchForm.patchValue({ noveltyTypesSearch: '' });
  }

  addEmployee(employee: EmployeeInterface) {
    let selectedEmployees: EmployeeInterface[] = this.advancedSearchForm.get(
      'employees'
    ).value;

    selectedEmployees = [...selectedEmployees, employee];

    this.advancedSearchForm.get('employees').setValue(selectedEmployees);
    this.advancedSearchForm.patchValue({ employeesSearch: '' });
  }

  addCostCenter(costCenter: CostCenter) {
    let selectedCostCenters: CostCenter[] = this.advancedSearchForm.get(
      'costCenters'
    ).value;

    selectedCostCenters = [...selectedCostCenters, costCenter];

    this.advancedSearchForm.get('costCenters').setValue(selectedCostCenters);
    this.advancedSearchForm.patchValue({ costCentersSearch: '' });
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
        'costCentersSearch'
      ]),
      start_at: { from: formData.startAtFrom, to: formData.startAtTo },
      novelty_types: formData.noveltyTypes,
      cost_centers: formData.costCenters
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

  displayEmployeeFieldValue(employee: EmployeeInterface) {
    return employee ? employee.first_name + ' ' + employee.last_name : null;
  }

  displayNoveltyTypeFieldValue(noveltyType: NoveltyType) {
    return noveltyType ? noveltyType.code + ' ' + noveltyType.name : null;
  }

  displayCostCenterFieldValue(costCenter: CostCenter) {
    return costCenter ? costCenter.code + ' ' + costCenter.name : null;
  }
}
