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
import { timer, Subject } from 'rxjs';
import moment, { Moment } from 'moment';
import { debounce, filter, tap, takeUntil } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { LoadStatus } from '@kirby/shared';
import { NoveltyType } from '@kirby/novelty-types/data';
import { EmployeeInterface } from '@kirby/employees/util';

@Component({
  selector: 'kirby-create-novelties-to-employees-form',
  templateUrl: './create-novelties-to-employees-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoveltiesToEmployeesFormComponent implements OnInit, OnDestroy {
  @ViewChild('employeeInput') employeeInput: ElementRef<HTMLInputElement>;

  @Input()
  employees: EmployeeInterface[] = [];

  @Input()
  noveltyTypes: NoveltyType;

  @Input()
  status: LoadStatus;

  @Output()
  searchEmployees = new EventEmitter();

  @Output()
  searchNoveltyTypes = new EventEmitter();

  @Output()
  submitted = new EventEmitter();

  private destroy$ = new Subject();

  form: FormGroup;

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

  get noveltyTypesArrayControl(): FormArray {
    return this.form.get('novelty_types') as FormArray;
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      employee: [],
      selected_employees: [[], [Validators.required]],
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
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchEmployees.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  get addedEmployees(): any[] {
    return this.form ? this.form.get('selected_employees').value : [];
  }

  addEmployee(event: MatAutocompleteSelectedEvent) {
    this.form.patchValue({
      selected_employees: this.addItemToCollection(event.option.value, this.addedEmployees),
      employee: '',
    });
    this.employeeInput.nativeElement.value = '';
  }

  removeEmployee(employee: any) {
    this.form.patchValue({ selected_employees: this.removeItemFromCollection(employee, this.addedEmployees) });
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

  employeeIsSelected(employee): boolean {
    return this.addedEmployees.map((e) => e.id).includes(employee.id);
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
