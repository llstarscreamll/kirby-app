import { Subject, timer } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { debounce, takeUntil, tap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

import { Vehicle, Driver } from '../../+state/models';

@Component({
  selector: 'kirby-weighing-form',
  templateUrl: './weighing-form.component.html',
})
export class WeighingFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() vehicles: Vehicle[] | null = [];
  @Input() drivers: Driver[] | null = [];
  @Input() weight: string | null = '';

  @Output() searchVehicles = new EventEmitter();
  @Output() searchDrivers = new EventEmitter();
  @Output() submitted = new EventEmitter();

  destroy$ = new Subject();

  netWeight = 0;

  form = this.formBuilder.group({
    weighing_type: ['', [Validators.required]],
    vehicle_plate: ['', [Validators.required, Validators.maxLength(7)]],
    vehicle_type: ['', [Validators.required]],
    driver_id: ['', [Validators.required, Validators.maxLength(10)]],
    driver_name: ['', [Validators.required, Validators.maxLength(255)]],
    tare_weight: [0],
    gross_weight: [0],
    weighing_description: ['', [Validators.maxLength(255)]],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.listenFormChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weight'] && this.form.get('weighing_type')?.value === 'load') {
      this.captureOnlyTareWeight();
    }

    if (changes['weight'] && ['unload', 'weighing'].includes(this.form.get('weighing_type')?.value || '')) {
      this.captureOnlyGrossWeight();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listenFormChanges() {
    this.form
      .get('weighing_type')
      ?.valueChanges.pipe(
        tap((v) => (v === 'load' ? this.captureOnlyTareWeight() : null)),
        tap((v) => (['unload', 'weighing'].includes(v || '') ? this.captureOnlyGrossWeight() : null)),
        takeUntil(this.destroy$)
      )
      .subscribe();

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
            this.form.patchValue({ vehicle_type: v.type, driver_id: v.drivers[0] } as any)
        ),
        tap(
          (v: null | string | Vehicle) =>
            v != null &&
            typeof v === 'object' &&
            v.drivers.length > 1 &&
            (this.drivers = v.drivers) &&
            this.form.patchValue({ vehicle_type: v.type })
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

    this.form
      .get('gross_weight')
      ?.valueChanges.pipe(
        tap(() => (this.netWeight = this.calculateNetWeight())),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('tare_weight')
      ?.valueChanges.pipe(
        tap(
          () =>
            ![0, null, undefined].includes(this.form.get('gross_weight')?.value) &&
            (this.netWeight = this.calculateNetWeight())
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  calculateNetWeight(): number {
    return (this.form.get('gross_weight')?.value || 0) - (this.form.get('tare_weight')?.value || 0);
  }

  captureOnlyGrossWeight() {
    this.form.patchValue({ gross_weight: 0, tare_weight: 0 });
    this.form.get('tare_weight')?.disable();
    this.form.get('gross_weight')?.enable();

    if (this.weight !== '') {
      this.form.patchValue({ gross_weight: parseInt(this.weight || '', 10) });
    }
  }

  captureOnlyTareWeight() {
    this.form.patchValue({ gross_weight: 0, tare_weight: 0 });
    this.form.get('gross_weight')?.disable();
    this.form.get('tare_weight')?.enable();

    if (this.weight !== '') {
      this.form.patchValue({ tare_weight: parseInt(this.weight || '', 10) });
    }
  }

  displayPlate(v: Vehicle) {
    return v.plate;
  }

  displayId(d: Driver) {
    return d.id;
  }

  formSubmitted() {
    const formData: any = this.form.value;
    this.submitted.emit({
      weighing_type: formData.weighing_type,
      vehicle_plate: formData.vehicle_plate.plate || formData.vehicle_plate,
      vehicle_type: formData.vehicle_type,
      driver_dni_number: formData.driver_id.id || formData.driver_id,
      driver_name: formData.driver_name,
      tare_weight: formData.tare_weight,
      gross_weight: formData.gross_weight,
      weighing_description: formData.weighing_description,
    });
  }
}
