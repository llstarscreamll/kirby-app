import { get } from 'lodash';
import moment from 'moment';
import { Subject } from 'rxjs/internal/Subject';
import { timer } from 'rxjs/internal/observable/timer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounce, takeUntil, tap, filter } from 'rxjs/internal/operators';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { LoadStatus } from '@kirby/shared';

@Component({
  selector: 'kirby-novelty-form',
  templateUrl: './novelty-form.component.html',
  styleUrls: ['./novelty-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoveltyFormComponent implements OnInit, OnDestroy {
  @Input()
  public defaults: any;

  @Input()
  public employeesFound: any[];

  @Input()
  public noveltyTypesFound: any[];

  @Input()
  public status: LoadStatus;

  @Input()
  public disable = false;

  @Input()
  public showDeleteBtn = true;

  @Output()
  searchEmployees = new EventEmitter();

  @Output()
  searchNoveltyTypes = new EventEmitter();

  @Output()
  submitted = new EventEmitter();

  @Output()
  trashed = new EventEmitter();

  private destroy$ = new Subject();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.patchForm();
    this.listenFormChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      employee: [, [Validators.required]],
      novelty_type: [, [Validators.required]],
      end_at: [, [Validators.required]],
      start_at: [, [Validators.required]],
      comment: [],
    });

    if (this.disable) {
      this.form.disable();
    }
  }

  private patchForm() {
    if (!this.defaults) {
      return;
    }

    this.form.patchValue({
      ...this.defaults,
      start_at: this.formatDate(this.defaults.start_at),
      end_at: this.formatDate(this.defaults.end_at),
    });
  }

  private formatDate(date) {
    return date ? moment(date).format('YYYY-MM-DDTHH:mm') : null;
  }

  private listenFormChanges() {
    if (this.disable) {
      return;
    }

    this.form
      .get('employee')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string'),
        tap((value) => this.searchEmployees.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('novelty_type')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string'),
        tap((value) => this.searchNoveltyTypes.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  get allEmployees(): any[] {
    return (this.employeesFound || []).concat(get(this.defaults, 'employee')).filter((e) => !!e);
  }

  get allNoveltyTypes(): any[] {
    return (this.noveltyTypesFound || []).concat(get(this.defaults, 'novelty_type')).filter((nt) => !!nt);
  }

  get hasScheduledTimes(): boolean {
    return this.defaults && this.defaults.start_at && this.defaults.end_at;
  }

  get disableFormSubmitBtn(): boolean {
    return this.status === LoadStatus.Loading || this.form.invalid;
  }

  get disableTrashSubmitBtn(): boolean {
    return this.defaults && !!this.defaults.deleted_at;
  }

  get displayTrashButton(): boolean {
    return !!this.defaults && this.showDeleteBtn;
  }

  displayEmployeeFieldValue(employee) {
    return employee ? employee.first_name + ' ' + employee.last_name : null;
  }

  displayNoveltyTypeFieldValue(noveltyType) {
    return noveltyType ? noveltyType.name : null;
  }

  submit() {
    const formValue = this.form.value;

    this.submitted.emit({
      id: this.defaults ? this.defaults.id : null,
      employee_id: formValue.employee.id,
      novelty_type_id: formValue.novelty_type.id,
      comment: formValue.comment,
      start_at: moment(formValue.start_at).toISOString(),
      end_at: moment(formValue.end_at).toISOString(),
    });
  }

  trash() {
    this.trashed.emit(this.defaults);
  }
}
