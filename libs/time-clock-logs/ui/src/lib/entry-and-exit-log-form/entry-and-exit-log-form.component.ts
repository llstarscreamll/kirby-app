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

  public constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.buildForms();
    this.setDefaultWorkShiftIfNeeded();
    this.listenCheckFormChanges();
  }

  public ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes['timeClockData'] && this.checkForm) {
      this.setDefaultWorkShiftIfNeeded();
      this.patchCheckFormIfNeeded();
      this.updateCheckFormValidationRules();
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
    return get(this.timeClockData, 'work_shifts', []);
  }

  public get hasWorkShifts(): boolean {
    return this.workShifts.length > 0;
  }

  public get displayWorkShiftField(): boolean {
    return this.timeClockData.action === 'check_in';
  }

  public get displaySubCostCenterField(): boolean {
    return this.timeClockData.action === 'check_out';
  }

  public get suggestedSubCostCenters(): any[] {
    return get(this.timeClockData, 'sub_cost_centers', []);
  }

  public get displayNoveltySubCostCenterField(): boolean {
    return this.noveltyTypes.filter(novelty => novelty.operator === 'addition').length > 0;
  }

  public buildForms() {
    this.codeForm = this.formBuilder.group({
      action: ['check_in', [Validators.required]],
      identification_code: ['', [Validators.required]]
    });

    this.checkForm = this.formBuilder.group({
      novelty_type_id: [],
      work_shift_id: [],
      sub_cost_center_id: [],
      novelty_sub_cost_center_id: [],
    });
  }

  public setDefaultWorkShiftIfNeeded() {
    if (this.workShifts.length === 1) {
      this.checkForm.patchValue({ work_shift_id: this.workShifts[0].id });
    }
  }

  public listenCheckFormChanges() {
    this.checkForm.get('sub_cost_center_id').valueChanges.pipe(
      debounce(() => timer(400)),
      filter(value => typeof value === 'string'),
      tap(value => this.searchSubCostCenters.emit({ search: value })),
      takeUntil(this.destroy$),
    ).subscribe();

    this.checkForm.get('novelty_sub_cost_center_id').valueChanges.pipe(
      debounce(() => timer(400)),
      filter(value => typeof value === 'string'),
      tap(value => this.searchSubCostCenters.emit({ search: value })),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public patchCheckFormIfNeeded() {
    const mostRecentSubCostCenter = sortBy(this.suggestedSubCostCenters, 'selected_at').pop();

    // patch novelty_sub_cost_center_id if needed
    if (mostRecentSubCostCenter && this.displayNoveltySubCostCenterField) {
      this.checkForm.patchValue({ novelty_sub_cost_center_id: mostRecentSubCostCenter.id });
    }

    // patch sub_cost_center_id if needed
    if (mostRecentSubCostCenter && this.displaySubCostCenterField) {
      this.checkForm.patchValue({ sub_cost_center_id: mostRecentSubCostCenter.id });
    }
  }

  public updateCheckFormValidationRules() {
    if (this.currentAction === 'check_out') {
      this.checkForm.get('sub_cost_center_id').setValidators([Validators.required]);
    } else {
      this.checkForm.get('sub_cost_center_id').setValidators([]);
    }
  }

  public toggleAction(): void {
    const action = this.currentAction === 'check_in' ? 'check_out' : 'check_in';
    this.codeForm.patchValue({ action });
    this.codeInput.nativeElement.focus();
  }

  public onCodeFormSubmit() {
    this.codeObtained.emit(this.codeForm.value);
    this.codeForm.reset();
  }

  public onCheckFormSubmit() {
    this.submitted.emit(this.checkForm.value);
    this.checkForm.reset();
    this.codeForm.reset();
    this.buildForms();
  }

}
