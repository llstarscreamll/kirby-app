import { get } from 'lodash';
import { Subject } from 'rxjs/internal/Subject';
import { timer } from 'rxjs/internal/observable/timer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounce, takeUntil, tap, filter } from 'rxjs/internal/operators';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { LoadStatuses } from '@kirby/shared';
import moment from 'moment';

@Component({
  selector: 'kirby-novelty-form',
  templateUrl: './novelty-form.component.html',
  styleUrls: ['./novelty-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoveltyFormComponent implements OnInit, OnDestroy {
  @Input()
  public defaults: any;

  @Input()
  public employeesFound: any[];

  @Input()
  public noveltyTypesFound: any[];

  @Input()
  public status: LoadStatuses;

  @Output()
  public searchEmployees = new EventEmitter();

  @Output()
  public searchNoveltyTypes = new EventEmitter();

  @Output()
  public submitted = new EventEmitter();

  @Output()
  public trashed = new EventEmitter();

  private destroy$ = new Subject();

  public form: FormGroup;

  public constructor(private formBuilder: FormBuilder) {}

  public ngOnInit() {
    this.buildForm();
    this.patchForm();
    this.listenFormChanges();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      employee: [, [Validators.required]],
      novelty_type: [, [Validators.required]],
      scheduled_end_at: [, [Validators.required]],
      scheduled_start_at: [, [Validators.required]],
      comment: []
    });
  }

  private patchForm() {
    if (!this.defaults) {
      return;
    }

    this.form.patchValue({
      ...this.defaults,
      scheduled_start_at: this.formatDate(this.defaults.scheduled_start_at),
      scheduled_end_at: this.formatDate(this.defaults.scheduled_end_at)
    });
  }

  private formatDate(date) {
    return date ? moment(date).format('YYYY-MM-DDTHH:mm') : null;
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
      .get('novelty_type')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter(value => typeof value === 'string'),
        tap(value => this.searchNoveltyTypes.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public get allEmployees(): any[] {
    return (this.employeesFound || [])
      .concat(get(this.defaults, 'employee'))
      .filter(e => !!e);
  }

  public get allNoveltyTypes(): any[] {
    return (this.noveltyTypesFound || [])
      .concat(get(this.defaults, 'novelty_type'))
      .filter(nt => !!nt);
  }

  public get hasScheduledTimes(): boolean {
    return (
      this.defaults &&
      this.defaults.scheduled_start_at &&
      this.defaults.scheduled_end_at
    );
  }

  public get disableFormSubmitBtn(): boolean {
    return this.status === LoadStatuses.Loading || this.form.invalid;
  }

  public get disableTrashSubmitBtn(): boolean {
    return this.defaults && !!this.defaults.deleted_at;
  }

  public get displayTrashButton(): boolean {
    return !!this.defaults;
  }

  public displayEmployeeFieldValue(employee) {
    return employee ? employee.first_name + ' ' + employee.last_name : null;
  }

  public displayNoveltyTypeFieldValue(noveltyType) {
    return noveltyType ? noveltyType.name : null;
  }

  public submit() {
    const formValue = this.form.value;

    this.submitted.emit({
      id: this.defaults ? this.defaults.id : null,
      employee_id: formValue.employee.id,
      novelty_type_id: formValue.novelty_type.id,
      comment: formValue.comment,
      scheduled_start_at: moment(formValue.scheduled_start_at).toISOString(),
      scheduled_end_at: moment(formValue.scheduled_end_at).toISOString()
    });
  }

  public trash() {
    this.trashed.emit(this.defaults);
  }
}
