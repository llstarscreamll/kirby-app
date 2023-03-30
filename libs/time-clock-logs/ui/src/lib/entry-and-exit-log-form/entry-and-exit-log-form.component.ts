import { timer } from 'rxjs';
import { Subject } from 'rxjs';
import { get, sortBy } from 'lodash-es';
import { debounce, takeUntil, tap, filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  OnDestroy,
} from '@angular/core';

import { LoadStatus, ApiError, isObject } from '@kirby/shared';

@Component({
  selector: 'kirby-entry-and-exit-log-form',
  templateUrl: './entry-and-exit-log-form.component.html',
  styleUrls: ['./entry-and-exit-log-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryAndExitLogFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('codeInput', { static: false })
  codeInput: ElementRef;

  @Input()
  status: LoadStatus;

  @Input()
  timeClockData: {
    action: string;
    employee: { id: string; name: string };
    punctuality: -1 | 0 | 1;
    work_shifts: any[];
    novelty_types: any[];
    sub_cost_centers: any[];
  };

  @Input()
  subCostCenters: any[];

  @Input()
  apiError: ApiError;

  @Output()
  codeObtained = new EventEmitter<{
    action: string;
    identification_code: string;
  }>();

  @Output()
  searchSubCostCenters = new EventEmitter<{ search: string }>();

  @Output()
  submitted = new EventEmitter();

  private destroy$ = new Subject();

  codeForm: FormGroup;
  checkForm: FormGroup;

  private fallbackWorkShift = [{ id: '-1', name: 'Sin registro de turno' }];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForms();
    this.listenCheckFormChanges();
  }

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    if (changes['timeClockData'] && this.checkForm) {
      this.setDefaultWorkShiftIfNeeded();
      this.patchCheckFormIfNeeded();
      this.updateCheckFormValidationRules();
    }

    if (changes['status'] && this.status === LoadStatus.Completed && this.codeForm && this.checkForm) {
      this.resetForms();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.codeInput) {
        this.codeInput.nativeElement.focus();
      }
    }, 500);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get currentAction(): string {
    return this.codeForm && this.codeForm.get('action').value;
  }

  get readableActionName(): string {
    return this.currentAction === 'check_in' ? 'Entrada' : 'Salida';
  }

  get actionClass(): {
    action: boolean;
    check_in: boolean;
    check_out: boolean;
  } {
    return {
      action: true,
      check_in: this.currentAction === 'check_in',
      check_out: this.currentAction === 'check_out',
    };
  }

  get disableCodeFormSubmitBtn(): boolean {
    return this.status === LoadStatus.Loading || this.codeForm.invalid;
  }

  get disableCheckFormSubmitBtn(): boolean {
    return this.status === LoadStatus.Loading || this.checkForm.invalid;
  }

  get allSubCostCenters(): any[] {
    return (this.subCostCenters || []).concat(this.suggestedSubCostCenters);
  }

  get employee(): any {
    return get(this.timeClockData, 'employee', {});
  }

  get noveltyTypes(): any[] {
    return get(this.timeClockData, 'novelty_types', []);
  }

  get hasNoveltyTypes(): boolean {
    return this.noveltyTypes.length > 0;
  }

  get deductedWorkShift() {
    const workShifts = get(this.timeClockData, 'work_shifts', []);

    return workShifts.length === 1 ? workShifts[0] : null;
  }

  get workShifts(): any[] {
    const workShifts = get(this.timeClockData, 'work_shifts', []);
    return workShifts.length > 0 ? workShifts : this.fallbackWorkShift;
  }

  get hasWorkShifts(): boolean {
    return this.workShifts.length > 0;
  }

  get displayWorkShiftField(): boolean {
    return this.timeClockData.action === 'check_in';
  }

  get displaySubCostCenterField(): boolean {
    return this.timeClockData.action === 'check_out';
  }

  get suggestedSubCostCenters(): any[] {
    return get(this.timeClockData, 'sub_cost_centers', []);
  }

  get displayNoveltySubCostCenterField(): boolean {
    return (
      this.noveltyTypes.filter((novelty) => novelty.operator === 'addition').length > 0 &&
      !this.fallbackWorkShiftIsSelected
    );
  }

  get selectedWorkShift(): string {
    return this.checkForm ? this.checkForm.get('work_shift_id').value : null;
  }

  get fallbackWorkShiftIsSelected(): boolean {
    return this.selectedWorkShift === this.fallbackWorkShift[0].id;
  }

  buildForms() {
    this.codeForm = this.formBuilder.group({
      action: ['check_in', [Validators.required]],
      identification_code: [, [Validators.required]],
    });

    this.checkForm = this.formBuilder.group({
      novelty_type_id: [],
      work_shift_id: [],
      sub_cost_center: [, [isObject]],
      novelty_sub_cost_center: [, [isObject]],
    });
  }

  setDefaultWorkShiftIfNeeded() {
    if (this.workShifts.length === 1) {
      this.checkForm.patchValue({ work_shift_id: this.workShifts[0].id }, { emitEvent: true });
    }
  }

  listenCheckFormChanges() {
    this.checkForm
      .get('sub_cost_center')
      .valueChanges.pipe(
        debounce(() => timer(200)),
        filter((value) => typeof value === 'string'),
        tap((value) => this.searchSubCostCenters.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.checkForm
      .get('novelty_sub_cost_center')
      .valueChanges.pipe(
        debounce(() => timer(200)),
        filter((value) => typeof value === 'string'),
        tap((value) => this.searchSubCostCenters.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.checkForm
      .get('work_shift_id')
      .valueChanges.pipe(
        debounce(() => timer(300)),
        tap((value) =>
          this.setFormFieldsRules(
            ['novelty_type_id'],
            value == this.fallbackWorkShift[0].id ? [Validators.required] : []
          )
        ),
        tap((value) =>
          this.setFormFieldsRules(
            ['sub_cost_center'],
            value == this.fallbackWorkShift[0].id ? [Validators.required, isObject] : []
          )
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  private setFormFieldsRules(fields: string[], rules = []) {
    fields.forEach((field) => this.checkForm.get(field).setValidators(rules));
  }

  patchCheckFormIfNeeded() {
    const mostRecentSubCostCenter = sortBy(this.suggestedSubCostCenters, 'selected_at').pop();

    // patch novelty_sub_cost_center if needed
    if (mostRecentSubCostCenter) {
      this.checkForm.patchValue({ novelty_sub_cost_center: mostRecentSubCostCenter }, { emitEvent: true });
      this.checkForm.patchValue({ sub_cost_center: mostRecentSubCostCenter }, { emitEvent: true });
    }
  }

  updateCheckFormValidationRules() {
    if (this.currentAction === 'check_out') {
      this.checkForm.get('sub_cost_center').setValidators([Validators.required, isObject]);
    } else {
      this.checkForm.get('sub_cost_center').setValidators([]);
    }
  }

  toggleAction(): void {
    const action = this.currentAction === 'check_in' ? 'check_out' : 'check_in';
    this.codeForm.patchValue({ action });
    this.codeInput.nativeElement.focus();
  }

  displaySubCostCenterFieldValue(subCostCenter) {
    return subCostCenter ? subCostCenter.name : null;
  }

  onCodeFormSubmit() {
    this.submitted.emit(this.codeForm.value);
  }

  onCheckFormSubmit() {
    this.submitted.emit({
      ...this.codeForm.value,
      ...this.mappedCheckFormData(),
    });
  }

  private resetForms() {
    this.checkForm.reset();
    this.codeForm.reset();
    this.buildForms();
    this.listenCheckFormChanges();
  }

  private mappedCheckFormData() {
    const formValue = this.checkForm.value;
    const subCostCenter = formValue.sub_cost_center;
    const noveltySubCostCenter = formValue.novelty_sub_cost_center;

    return {
      ...formValue,
      sub_cost_center_id: subCostCenter ? subCostCenter.id : null,
      novelty_sub_cost_center_id: noveltySubCostCenter ? noveltySubCostCenter.id : null,
    };
  }
}
