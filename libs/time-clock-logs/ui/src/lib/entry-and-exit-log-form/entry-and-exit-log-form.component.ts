import { get, isArray } from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';

import { LoadStatuses, ApiError } from "@llstarscreamll/shared";

@Component({
  selector: 'llstarscreamll-entry-and-exit-log-form',
  templateUrl: './entry-and-exit-log-form.component.html',
  styleUrls: ['./entry-and-exit-log-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryAndExitLogFormComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('codeInput')
  public codeInput: ElementRef;

  @Input()
  public status: LoadStatuses;

  @Input()
  public apiError: ApiError;

  @Output()
  public submitted = new EventEmitter();

  public form: FormGroup;

  public constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.buildForm();
  }

  public ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes['apiError'] && this.hasError1051) {
      this.changeFormFieldToRequired('work_shift_id');
    }

    if (changes['apiError'] && (this.hasError1053 || this.hasError1054 || this.hasError1055)) {
      this.changeFormFieldToRequired('novelty_type');
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.codeInput.nativeElement.focus();
    }, 500);
  }

  public get currentAction(): string {
    return this.form && this.form.get('action').value === 'check_in' ? 'check_in' : 'check_out';
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

  public get disableSubmitBtn(): boolean {
    return this.status === LoadStatuses.Loading || this.form.invalid;
  }

  private get responseErrors() {
    return get(this.apiError, 'error.errors', []);
  }

  public get error1051(): any {
    let errorAttr = this.responseErrors;
    const error1055 = errorAttr.filter(error => error.code == 1051).shift();

    return error1055;
  }

  public get error1053(): any {
    let errorAttr = this.responseErrors;
    const error1055 = errorAttr.filter(error => error.code == 1053).shift();

    return error1055;
  }

  public get error1054(): any {
    let errorAttr = this.responseErrors;
    const error1055 = errorAttr.filter(error => error.code == 1054).shift();

    return error1055;
  }

  public get error1055(): any {
    let errorAttr = this.responseErrors;
    const error1055 = errorAttr.filter(error => error.code == 1055).shift();

    return error1055;
  }

  public get hasError1051(): boolean {
    return !!this.error1051;
  }

  public get hasError1053(): boolean {
    return !!this.error1053;
  }

  public get hasError1054(): boolean {
    return !!this.error1054;
  }

  public get hasError1055(): boolean {
    return !!this.error1055;
  }

  public get noveltyTypes(): any[] {
    let noveltyTypes = [];

    if (this.hasError1053) {
      noveltyTypes = get(this.error1053, 'meta.novelty_types', [])
    }

    if (this.hasError1055) {
      noveltyTypes = get(this.error1055, 'meta.novelty_types', [])
    }

    return noveltyTypes;
  }

  public get workShifts(): any[] {
    return get(this.error1051, 'meta.work_shifts', []);
  }

  public buildForm() {
    this.form = this.formBuilder.group({
      action: ['check_in', [Validators.required]],
      identification_code: ['', [Validators.required]],
      work_shift_id: [],
      novelty_type: [],
    });
  }

  private changeFormFieldToRequired(fieldName: string) {
    if (!this.form) { return; }

    this.form.get(fieldName).setValidators([Validators.required]);
    this.form.updateValueAndValidity();
  }

  public toggleAction(): void {
    const action = this.currentAction === 'check_in' ? 'check_out' : 'check_in';
    this.form.patchValue({ action });
    this.codeInput.nativeElement.focus();
  }

  public onSubmit() {
    this.submitted.emit(this.form.value);
    this.form.reset();
    this.buildForm();
  }

}
