import { Subject } from 'rxjs';
import { get, sortBy } from 'lodash';
import { timer } from 'rxjs/internal/observable/timer';
import { debounce, takeUntil, tap, filter } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, OnDestroy } from '@angular/core';

import { LoadStatuses, ApiError } from "@llstarscreamll/shared";

@Component({
  selector: 'llstarscreamll-entry-and-exit-log-form',
  templateUrl: './entry-and-exit-log-form.component.html',
  styleUrls: ['./entry-and-exit-log-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryAndExitLogFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  @ViewChild('codeInput')
  public codeInput: ElementRef;

  @Input()
  public status: LoadStatuses;

  @Input()
  public timeClockData: {
    action: string,
    employee: { id: string, name: string },
    punctuality: -1 | 0 | 1,
    work_shifts: any[],
    novelty_types: any[],
    sub_cost_centers: any[],
  };

  @Input()
  public subCostCenters: any[];

  @Input()
  public apiError: ApiError;

  @Output()
  public codeObtained = new EventEmitter<{ action: string, identification_code: string }>();

  @Output()
  public searchSubCostCenters = new EventEmitter<{ search: string }>();

  @Output()
  public submitted = new EventEmitter();

  private destroy$ = new Subject();

  public codeForm: FormGroup;
  public checkForm: FormGroup;

  private fallbackWorkShift = [
    { id: '-1', name: 'Sin registro de turno' }
  ];

  public constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.buildForms();
    this.listenCheckFormChanges();
    this.setDefaultWorkShiftIfNeeded();
  }

  public ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes['timeClockData'] && this.checkForm) {
      this.setDefaultWorkShiftIfNeeded();
      this.patchCheckFormIfNeeded();
      this.updateCheckFormValidationRules();
    }

    if (changes['status'] && this.status === LoadStatuses.Completed && this.codeForm && this.checkForm) {
      this.resetForms();
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.codeInput) {
        this.codeInput.nativeElement.focus();
      }
    }, 500);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get currentAction(): string {
    return this.codeForm && this.codeForm.get('action').value;
  }

  public get readableActionName(): string {
    return this.currentAction === 'check_in' ? 'Entrada' : 'Salida';
  }

  public get actionClass(): { action: boolean, check_in: boolean, check_out: boolean } {
    return {
      action: true,
      check_in: this.currentAction === 'check_in',
      check_out: this.currentAction === 'check_out',
    };
  }

  public get disableCodeFormSubmitBtn(): boolean {
    return this.status === LoadStatuses.Loading || this.codeForm.invalid;
  }

  public get disableCheckFormSubmitBtn(): boolean {
    return this.status === LoadStatuses.Loading || this.checkForm.invalid;
  }

  public get noveltyTypes(): any[] {
    return get(this.timeClockData, 'novelty_types', []);
  }

  public get hasNoveltyTypes(): boolean {
    return this.noveltyTypes.length > 0;
  }

  public get workShifts(): any[] {
    const workShifts = get(this.timeClockData, 'work_shifts', [])
    return workShifts.length > 0 ? workShifts : this.fallbackWorkShift;
  }

  public get hasWorkShifts(): boolean {
    return this.workShifts.length > 0;
  }

  public get displayWorkShiftField(): boolean {
    return this.timeClockData.action === 'check_in';
  }

  public get displaySubCostCenterField(): boolean {
    return this.timeClockData.action === 'check_out' || this.fallbackWorkShiftIsSelected;
  }

  public get suggestedSubCostCenters(): any[] {
    return get(this.timeClockData, 'sub_cost_centers', []);
  }

  public get displayNoveltySubCostCenterField(): boolean {
    return this.noveltyTypes.filter(novelty => novelty.operator === 'addition').length > 0 && !this.fallbackWorkShiftIsSelected;
  }

  public get selectedWorkShift(): string {
    return this.checkForm ? this.checkForm.get('work_shift_id').value : null;
  }

  public get fallbackWorkShiftIsSelected(): boolean {
    return this.selectedWorkShift === this.fallbackWorkShift[0].id;
  }

  public buildForms() {
    this.codeForm = this.formBuilder.group({
      action: ['check_in', [Validators.required]],
      identification_code: [, [Validators.required]]
    });

    this.checkForm = this.formBuilder.group({
      novelty_type_id: [],
      work_shift_id: [],
      sub_cost_center: [],
      novelty_sub_cost_center: [],
    });
  }

  public setDefaultWorkShiftIfNeeded() {
    if (this.workShifts.length === 1) {
      this.checkForm.patchValue({ work_shift_id: this.workShifts[0].id }, { emitEvent: true });
    }
  }

  public listenCheckFormChanges() {
    this.checkForm.get('sub_cost_center').valueChanges.pipe(
      debounce(() => timer(400)),
      filter(value => typeof value === 'string'),
      tap(value => this.searchSubCostCenters.emit({ search: value })),
      takeUntil(this.destroy$),
    ).subscribe();

    this.checkForm.get('novelty_sub_cost_center').valueChanges.pipe(
      debounce(() => timer(400)),
      filter(value => typeof value === 'string'),
      tap(value => this.searchSubCostCenters.emit({ search: value })),
      takeUntil(this.destroy$),
    ).subscribe();

    this.checkForm.get('work_shift_id').valueChanges.pipe(
      debounce(() => timer(300)),
      tap(value => value == this.fallbackWorkShift[0].id ? this.makeCheckFormFieldRequired(['novelty_type_id', 'sub_cost_center']) : null),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  private makeCheckFormFieldRequired(fields: string[]) {
    fields.forEach(field => this.checkForm.get(field).setValidators([Validators.required]));
  }

  public patchCheckFormIfNeeded() {
    const mostRecentSubCostCenter = sortBy(this.suggestedSubCostCenters, 'selected_at').pop();

    // patch novelty_sub_cost_center if needed
    if (mostRecentSubCostCenter && this.displayNoveltySubCostCenterField) {
      this.checkForm.patchValue({ novelty_sub_cost_center: mostRecentSubCostCenter });
    }

    // patch sub_cost_center if needed
    if (mostRecentSubCostCenter && this.displaySubCostCenterField) {
      this.checkForm.patchValue({ sub_cost_center: mostRecentSubCostCenter });
    }
  }

  public updateCheckFormValidationRules() {
    if (this.currentAction === 'check_out') {
      this.checkForm.get('sub_cost_center').setValidators([Validators.required]);
    } else {
      this.checkForm.get('sub_cost_center').setValidators([]);
    }
  }

  public toggleAction(): void {
    const action = this.currentAction === 'check_in' ? 'check_out' : 'check_in';
    this.codeForm.patchValue({ action });
    this.codeInput.nativeElement.focus();
  }

  public displaySubCostCenterFieldValue(subCostCenter) {
    return subCostCenter ? subCostCenter.name : null;
  }

  public onCodeFormSubmit() {
    this.submitted.emit(this.codeForm.value);
  }

  public onCheckFormSubmit() {
    this.submitted.emit({ ...this.codeForm.value, ...this.mappedCheckFormData() });
  }

  private resetForms() {
    this.checkForm.reset();
    this.codeForm.reset();
    this.buildForms();
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
