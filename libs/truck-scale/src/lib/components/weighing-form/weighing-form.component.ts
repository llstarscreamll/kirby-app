import { Subject, timer } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { debounce, takeUntil, tap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Vehicle, Driver } from '../../+state/models';
import { WeighingsFacade } from '../../+state/weighings.facade';

@Component({
  selector: 'kirby-weighing-form',
  templateUrl: './weighing-form.component.html',
})
export class WeighingFormComponent implements OnInit, OnDestroy {
  @Input() vehicles: Vehicle[] | null = [];
  @Input() drivers: Driver[] | null = [];

  @Output() searchVehicles = new EventEmitter();
  @Output() searchDrivers = new EventEmitter();

  destroy$ = new Subject();

  form = this.formBuilder.group({
    vehicle_plate: ['', [Validators.required]],
    vehicle_type: ['', [Validators.required]],
    driver_id: ['', [Validators.required]],
    driver_name: ['', [Validators.required]],
  });

  constructor(private formBuilder: FormBuilder, private facade: WeighingsFacade) {}

  ngOnInit(): void {
    this.form
      .get('vehicle_plate')
      ?.valueChanges.pipe(
        debounce(() => timer(500)),
        tap(
          (v: null | string | Vehicle) =>
            v != null && typeof v === 'string' && v.trim() !== '' && this.searchVehicles.emit(v)
        ),
        tap(
          (v: null | string | Vehicle) =>
            v != null &&
            typeof v === 'object' &&
            v.drivers.length === 1 &&
            this.form.patchValue({ vehicle_type: v.type, driver_id: v.drivers[0].id, driver_name: v.drivers[0].name })
        ),
        tap(
          (v: null | string | Vehicle) =>
            v != null && typeof v === 'object' && v.drivers.length > 1 && (this.drivers = v.drivers)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('driver_id')
      ?.valueChanges.pipe(
        debounce(() => timer(500)),
        tap(
          (v: null | string | Driver) =>
            v != null && typeof v === 'string' && v.trim() !== '' && this.searchDrivers.emit(v)
        ),
        tap(
          (v: null | string | Driver) =>
            v != null && typeof v === 'object' && this.form.patchValue({ driver_name: v.name })
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  displayFn(vehicle: Vehicle) {
    return vehicle.plate;
  }
}
