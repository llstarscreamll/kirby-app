import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounce, takeUntil, tap, filter } from 'rxjs/internal/operators';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { LoadStatuses, ApiError } from "@kirby/shared";
import { Subject } from 'rxjs/internal/Subject';
import { timer } from 'rxjs/internal/observable/timer';
import { get } from 'lodash';

@Component({
  selector: 'kirby-novelty-form',
  templateUrl: './novelty-form.component.html',
  styleUrls: ['./novelty-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoveltyFormComponent implements OnInit {

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

  private destroy$ = new Subject();

  public form: FormGroup;

  public constructor(private formBuilder: FormBuilder) { }

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
      total_time_in_minutes: [, [Validators.required]],
    });
  }

  private patchForm() {
    if (this.defaults) {
      this.form.patchValue(this.defaults);
    }
  }

  private listenFormChanges() {
    this.form.get('employee').valueChanges.pipe(
      debounce(() => timer(400)),
      filter(value => typeof value === 'string'),
      tap(value => this.searchEmployees.emit({ search: value })),
      takeUntil(this.destroy$),
    ).subscribe();

    this.form.get('novelty_type').valueChanges.pipe(
      debounce(() => timer(400)),
      filter(value => typeof value === 'string'),
      tap(value => this.searchNoveltyTypes.emit({ search: value })),
      takeUntil(this.destroy$),
    ).subscribe();
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

  public get disableFormSubmitBtn(): boolean {
    return this.status === LoadStatuses.Loading || this.form.invalid;
  }

  public get timeHint(): string {
    const timeInMinutes = this.form.get('total_time_in_minutes').value;
    const timeInHours = (parseInt(timeInMinutes || '0', 10) / 60).toFixed(2);
    return `${timeInHours} horas`;
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
      total_time_in_minutes: formValue.total_time_in_minutes,
    });
  }

}
