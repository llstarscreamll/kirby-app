import { WeekDay } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { LoadStatuses } from '@kirby/shared';
import { WorkShiftInterface } from '@kirby/work-shifts/util';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'kirby-work-shift-form',
  templateUrl: './work-shift-form.component.html',
  styleUrls: ['./work-shift-form.component.scss'],
})
export class WorkShiftFormComponent implements OnInit {
  @Input()
  defaults: WorkShiftInterface;

  @Input()
  status: LoadStatuses;

  @Input()
  disable: boolean;

  @Output()
  submitted = new EventEmitter();

  weekDays = [
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miércoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
    { id: 6, name: 'Sábado' },
    { id: 7, name: 'Domingo' },
  ];

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  get shouldDisableBtn(): boolean {
    return this.form.invalid || this.status === LoadStatuses.Loading;
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      grace_minutes_before_start_times: [15, [Validators.required]],
      grace_minutes_after_start_times: [15, [Validators.required]],
      grace_minutes_before_end_times: [15, [Validators.required]],
      grace_minutes_after_end_times: [15, [Validators.required]],
      meal_time_in_minutes: [0, [Validators.required]],
      min_minutes_required_to_discount_meal_time: [0, [Validators.required]],
      applies_on_days: [[1, 2, 3, 4, 5], [Validators.required]],
      time_zone: ['America/Bogota', [Validators.required]],
      time_slots: this.formBuilder.array([this.timeSlotFormGroup()]),
    });

    if (this.defaults) {
      this.form.patchValue(this.defaults);
    }

    if (this.disable) {
      this.form.disable();
    }
  }

  get timeSlotArrayForm() {
    return this.form.get('time_slots') as FormArray;
  }

  private timeSlotFormGroup() {
    return this.formBuilder.group({
      start: ['07:00', [Validators.required, Validators.min(5)]],
      end: ['17:00', [Validators.required, Validators.min(5)]],
    });
  }

  weekDayIsSelected(day: WeekDay): boolean {
    const selectedDays: number[] = this.form.get('applies_on_days').value || [];

    return selectedDays.findIndex((selected) => selected === day) > -1;
  }

  toggleSelectedDay(event: MatCheckboxChange) {
    const day = Number(event.source.value);
    const selectedDays: number[] = this.form.get('applies_on_days').value || [];
    const selectedIndex = selectedDays.findIndex(
      (selected) => selected === day
    );

    if (selectedIndex > -1) {
      selectedDays.splice(selectedIndex, 1);
    }

    if (selectedIndex === -1) {
      selectedDays.push(day);
    }

    this.form.get('applies_on_days').setValue(selectedDays);
  }

  onSubmit() {
    this.submitted.emit(this.form.value);
  }
}
