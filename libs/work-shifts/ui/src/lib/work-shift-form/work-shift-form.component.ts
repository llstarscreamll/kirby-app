import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { LoadStatuses } from '@kirby/shared';
import { WorkShiftInterface } from '@kirby/work-shifts/util';

@Component({
  selector: 'kirby-work-shift-form',
  templateUrl: './work-shift-form.component.html',
  styleUrls: ['./work-shift-form.component.scss']
})
export class WorkShiftFormComponent implements OnInit {

  @Input()
  public defaults: WorkShiftInterface;

  @Input()
  public status: LoadStatuses;

  @Input()
  public disable: boolean;

  @Output()
  public submitted = new EventEmitter();

  public form: FormGroup;

  public constructor(private formBuilder: FormBuilder) { }

  public get shouldDisableBtn(): boolean {
    return this.form.invalid || this.status === LoadStatuses.Loading;
  }

  public ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      start_time: ['', [Validators.required]],
      end_time: ['', [Validators.required]],
      grace_minutes_for_start_time: [15, [Validators.required]],
      grace_minutes_for_end_time: [15, [Validators.required]],
      meal_start_time: [],
      meal_time_in_minutes: [],
      min_minutes_required_to_discount_meal_time: [],
    });

    if (this.defaults) {
      this.form.patchValue(this.defaults);
    }

    if (this.disable) {
      this.form.disable();
    }
  }

  public onSubmit() {
    this.submitted.emit(this.form.value);
  }

}
