import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadStatuses } from "@llstarscreamll/shared";
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChildren, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'llstarscreamll-entry-and-exit-log-form',
  templateUrl: './entry-and-exit-log-form.component.html',
  styleUrls: ['./entry-and-exit-log-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryAndExitLogFormComponent implements OnInit, AfterViewInit {

  @ViewChild('codeInput')
  public codeInput: ElementRef;

  @Input()
  public status: LoadStatuses;

  @Output()
  public submitted = new EventEmitter();

  public form: FormGroup;

  public constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      action: ['check_in', [Validators.required]],
      identification_code: ['', [Validators.required]]
    });
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

  public toggleAction(): void {
    const action = this.currentAction === 'check_in' ? 'check_out' : 'check_in';
    this.form.patchValue({ action });
    this.codeInput.nativeElement.focus();
  }

  public onSubmit() {
    const log = this.form.value;
    this.submitted.emit(log);
    this.form.patchValue({ identification_code: '' });
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

}
