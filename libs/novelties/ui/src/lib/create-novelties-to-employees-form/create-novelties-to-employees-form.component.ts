import { timer, Subject } from 'rxjs';
import moment, { Moment } from 'moment';
import { debounce, filter, tap, takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { LoadStatus } from '@kirby/shared';
import { NoveltyType } from '@kirby/novelty-types/data';
import { EmployeeInterface } from '@kirby/employees/util';

@Component({
  selector: 'kirby-create-novelties-to-employees-form',
  templateUrl: './create-novelties-to-employees-form.component.html',
  styleUrls: ['./create-novelties-to-employees-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoveltiesToEmployeesFormComponent implements OnInit, OnDestroy {
  @Input()
  public employees: EmployeeInterface[] = [];

  @Input()
  public noveltyTypes: NoveltyType;

  @Input()
  public status: LoadStatus;

  @Output()
  searchEmployees = new EventEmitter();

  @Output()
  searchNoveltyTypes = new EventEmitter();

  @Output()
  submitted = new EventEmitter();

  private destroy$ = new Subject();

  public form: FormGroup;

  hours = new Array(24)
    .join()
    .split(',')
    .map((_, i: number) => i.toString().padStart(2, '0'));

  minutes = new Array(60)
    .join()
    .split(',')
    .map((_, i: number) => i.toString().padStart(2, '0'));

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.listenFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get selectedEmployees(): any[] {
    return this.form ? this.form.get('selected_employees').value : [];
  }

  get noveltyTypesArrayControl(): FormArray {
    return this.form.get('novelty_types') as FormArray;
  }

  get displayableEmployees(): any[] {
    return this.employees.filter((employee) => !this.selectedEmployees.map((se) => se.id).includes(employee.id));
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      selected_employees: [[], [Validators.required]],
      employee: [],
      novelty_types: this.formBuilder.array([this.setUpNoveltyOptionFormGroup()]),
    });
  }

  private setUpNoveltyOptionFormGroup(): FormGroup {
    const formGroup = this.formBuilder.group({
      novelty_type: [null, Validators.required],
      scheduled_start_date: [null, Validators.required],
      scheduled_start_hour: [null, Validators.required],
      scheduled_start_minute: [null, Validators.required],
      scheduled_end_date: [null, Validators.required],
      scheduled_end_hour: [null, Validators.required],
      scheduled_end_minute: [null, Validators.required],
      comment: [null, [Validators.maxLength(255)]],
    });

    formGroup
      .get('novelty_type')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value !== ''),
        tap((value) => this.searchNoveltyTypes.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    formGroup
      .get('novelty_type')
      .valueChanges.pipe(
        filter((value) => typeof value === 'object'),
        tap((selectedNoveltyType: any) => {
          if (selectedNoveltyType.requires_comment) {
            formGroup.get('comment').setValidators([Validators.required, Validators.maxLength(255)]);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    return formGroup;
  }

  private listenFormChanges() {
    this.form
      .get('employee')
      ?.valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value !== ''),
        tap((value) => this.searchEmployees.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('employee')
      .valueChanges.pipe(
        filter((value) => typeof value !== 'string'), // an employee has been selected
        tap((value) => this.addEmployee(value)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private addEmployee(employee) {
    const selectedEmployees = this.selectedEmployees;

    if (selectedEmployees.find((se) => se.id === employee.id)) {
      return;
    }

    selectedEmployees.push(employee);

    this.form.get('selected_employees').setValue(selectedEmployees);
    this.form.get('employee').setValue('');
  }

  removeEmployee(employee) {
    const selectedEmployees = this.selectedEmployees;
    const index = selectedEmployees.map((se) => se.id).indexOf(employee.id);

    if (index >= 0) {
      this.selectedEmployees.splice(index, 1);
    }

    this.form.get('selected_employees').setValue(selectedEmployees);
  }

  addNoveltyOption() {
    this.noveltyTypesArrayControl.push(this.setUpNoveltyOptionFormGroup());
  }

  removeNoveltyOption(index) {
    this.noveltyTypesArrayControl.removeAt(index);
  }

  get disableFormSubmitBtn(): boolean {
    return this.status === LoadStatus.Loading || this.form.invalid;
  }

  displayEmployeeFieldValue(employee) {
    return employee ? employee.first_name + ' ' + employee.last_name : null;
  }

  displayNoveltyTypeFieldValue(noveltyType) {
    return noveltyType ? noveltyType.name : null;
  }

  selectedNoveltyTypeRequiresComment(selectedNoveltyType) {
    return (
      !!selectedNoveltyType && typeof selectedNoveltyType === 'object' && selectedNoveltyType.requires_comment === true
    );
  }

  submit() {
    this.submitted.emit(this.parseFormData());
  }

  parseFormData() {
    const formData = this.form.value;

    return {
      employee_ids: formData.selected_employees.map((employee) => employee.id),
      novelties: formData.novelty_types.map((novelty) => {
        const startDate: Moment = novelty.scheduled_start_date || moment();
        startDate.hour(novelty.scheduled_start_hour);
        startDate.minutes(novelty.scheduled_start_minute);

        const endDate: Moment = novelty.scheduled_end_date || moment();
        endDate.hour(novelty.scheduled_end_hour);
        endDate.minutes(novelty.scheduled_end_minute);

        return {
          novelty_type_id: novelty.novelty_type ? novelty.novelty_type.id : null,
          start_at: startDate.toISOString(),
          end_at: endDate.toISOString(),
          comment: novelty.comment,
        };
      }),
    };
  }
}
