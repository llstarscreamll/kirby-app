import { timer, Subject } from 'rxjs';
import { debounce, filter, tap, takeUntil } from 'rxjs/operators';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { LoadStatus } from '@kirby/shared';
import { CostCenter } from '@kirby/cost-centers/data';
import { EmployeeInterface } from '@kirby/employees/util';
import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'kirby-employee-form',
  templateUrl: './employee-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  @Input()
  employee: EmployeeInterface;

  @Input()
  costCenters: CostCenter[];

  @Input()
  workShifts: WorkShiftInterface[];

  @Input()
  roles: { id: number; display_name: string }[];

  @Input()
  status: LoadStatus;

  @Output()
  submitted = new EventEmitter();

  @Output()
  searchCostCenters = new EventEmitter();

  private destroy$ = new Subject();

  form: FormGroup;

  expirationDates = [
    { date: '15d', label: 'Vigente por 15 días' },
    { date: '30d', label: 'Vigente por 30 días' },
    { date: '120d', label: 'Vigente por 120 días' },
    { date: '180d', label: 'Vigente por 180 días' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.patchForm();
    this.listenFormChanges();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.minLength(8)]],
      roles: [[]],
      code: [null, [Validators.required]],
      identification_number: [null, [Validators.required]],
      position: [null, [Validators.required]],
      location: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone_prefix: ['+57', [Validators.required]],
      phone: [null, [Validators.required]],
      salary: [null, [Validators.required]],
      cost_center: [null, [Validators.required]],
      work_shifts: [[], [Validators.required]],
      generate_token: [''],
      identifications: this.buildIdentificationsArray(),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildIdentificationsArray() {
    return this.formBuilder.array(
      this.employee
        ? this.employee.identifications.map((_) => this.buildIdentificationsFormGroup())
        : [this.buildIdentificationsFormGroup()]
    );
  }

  private buildIdentificationsFormGroup() {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
    });
  }

  private patchForm() {
    if (this.employee) {
      this.form.patchValue(this.employee);
    }
  }

  private listenFormChanges() {
    this.form
      .get('cost_center')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value !== ''),
        tap((value) => this.searchCostCenters.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  addIdentification() {
    this.identificationsArrayControl.push(this.buildIdentificationsFormGroup());
  }

  removeIdentificationCode(index: number) {
    this.identificationsArrayControl.removeAt(index);
  }

  get identificationsArrayControl(): FormArray {
    return this.form.get('identifications') as FormArray;
  }

  get disableSubmitButton(): boolean {
    return !this.form.valid || this.status === LoadStatus.Loading;
  }

  displayCostCenterFieldValue(costCenter: CostCenter) {
    return costCenter ? costCenter.name : null;
  }

  compareWithFunction(item1, item2): boolean {
    return item1 && item2 ? item1.id === item2.id : item1 === item2;
  }

  submit() {
    this.submitted.emit(this.form.value);
  }
}
