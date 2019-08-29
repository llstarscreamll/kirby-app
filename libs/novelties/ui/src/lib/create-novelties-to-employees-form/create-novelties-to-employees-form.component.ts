import { timer, Subject } from 'rxjs';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';

import { EmployeeInterface } from '@llstarscreamll/employees/util';
import { NoveltyTypeInterface } from '@llstarscreamll/novelty-types/data';
import { debounce, filter, tap, takeUntil } from 'rxjs/internal/operators';
import { LoadStatuses } from '@llstarscreamll/shared';

@Component({
  selector: 'llstarscreamll-create-novelties-to-employees-form',
  templateUrl: './create-novelties-to-employees-form.component.html',
  styleUrls: ['./create-novelties-to-employees-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateNoveltiesToEmployeesFormComponent implements OnInit {
  @Input()
  public employees: EmployeeInterface[] = [];

  @Input()
  public noveltyTypes: NoveltyTypeInterface;

  @Input()
  public status: LoadStatuses;

  @Output()
  public searchEmployees = new EventEmitter();

  @Output()
  public searchNoveltyTypes = new EventEmitter();

  private destroy$ = new Subject();

  public form: FormGroup;

  public constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.buildForm();
    this.listenFormChanges();
  }

  public get selectedEmployees(): any[] {
    return this.form ? this.form.get('selected_employees').value : [];
  }

  public get noveltyTypesArrayControl(): FormArray {
    return this.form.get('novelty_types') as FormArray;
  }

  public get displayableEmployees(): any[] {
    return this.employees.filter(
      employee => !this.selectedEmployees.map(se => se.id).includes(employee.id)
    );
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      selected_employees: [[], [Validators.required]],
      employee: [],
      novelty_types: this.formBuilder.array([
        this.setUpNoveltyOptionFormGroup()
      ])
    });
  }

  private setUpNoveltyOptionFormGroup(): FormGroup {
    const formGroup = this.formBuilder.group({
      novelty_type: [null, Validators.required],
      start_at: [null, Validators.required],
      end_at: [null, Validators.required]
    });

    formGroup
      .get('novelty_type')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter(value => typeof value === 'string'),
        tap(value => this.searchNoveltyTypes.emit({ search: value })),
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
        filter(value => typeof value === 'string'),
        tap(value => this.searchEmployees.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('employee')
      .valueChanges.pipe(
        filter(value => typeof value !== 'string'), // an employee has been selected
        tap(value => this.addEmployee(value)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private addEmployee(employee) {
    const selectedEmployees = this.selectedEmployees;

    if (selectedEmployees.find(se => se.id === employee.id)) {
      return;
    }

    selectedEmployees.push(employee);

    this.form.get('selected_employees').setValue(selectedEmployees);
    this.form.get('employee').setValue('');
  }

  public removeEmployee(employee) {
    const selectedEmployees = this.selectedEmployees;
    const index = selectedEmployees.map(se => se.id).indexOf(employee.id);

    if (index >= 0) {
      this.selectedEmployees.splice(index, 1);
    }

    this.form.get('selected_employees').setValue(selectedEmployees);
  }

  public addNoveltyOption() {
    this.noveltyTypesArrayControl.push(this.setUpNoveltyOptionFormGroup());
  }

  public removeNoveltyOption(index) {
    this.noveltyTypesArrayControl.removeAt(index);
  }

  public get disableFormSubmitBtn(): boolean {
    return this.status === LoadStatuses.Loading || this.form.invalid;
  }

  public displayEmployeeFieldValue(employee) {
    return employee ? employee.first_name + ' ' + employee.last_name : null;
  }

  public displayNoveltyTypeFieldValue(noveltyType) {
    return noveltyType ? noveltyType.name : null;
  }
}
