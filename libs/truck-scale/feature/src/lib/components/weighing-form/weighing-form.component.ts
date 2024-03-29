import { Subject, timer } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { debounce, filter, takeUntil, tap } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CommentModalComponent } from '@kirby/shared';
import { Vehicle, Driver, Weighing } from '../../+state/models';

@Component({
  selector: 'kirby-weighing-form',
  templateUrl: './weighing-form.component.html',
})
export class WeighingFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() vehicles: Vehicle[] | null = [];
  @Input() drivers: Driver[] | null = [];
  @Input() clients: { name: string }[] | null = [];
  @Input() commodities: { name: string }[] | null = [];
  @Input() autofillWeight: string | null = '';
  @Input() defaults: Weighing | null = null;
  @Input() showPrintButton = false;
  @Input() showCancelButton = false;
  @Input() showManualFinishButton = false;
  @Input() weightFieldsInReadOnlyMode = true;

  @Output() searchVehicles = new EventEmitter();
  @Output() searchDrivers = new EventEmitter();
  @Output() searchClients = new EventEmitter();
  @Output() searchCommodities = new EventEmitter();
  @Output() submitted = new EventEmitter();
  @Output() printBtnClicked = new EventEmitter();
  @Output() cancelWeighing = new EventEmitter();
  @Output() manualFinishWeighing = new EventEmitter();

  destroy$ = new Subject();

  netWeight = 0;
  vehicleTypes = [
    'CUATRO MANOS',
    'DOBLETROQUE',
    'MINIMULA - PATINETA',
    'MONTACARGAS',
    'SENCILLO',
    'TRACTOMULA DE TRES EJES',
    'TURBO',
  ];

  form = this.formBuilder.group({
    weighing_type: ['', [Validators.required]],
    vehicle_plate: ['', [Validators.required, Validators.maxLength(7)]],
    vehicle_type: ['', [Validators.required]],
    driver_dni_number: ['', [Validators.required, Validators.maxLength(10)]],
    driver_name: ['', [Validators.required, Validators.maxLength(255)]],
    client: ['', [Validators.required, Validators.maxLength(255)]],
    commodity: ['', [Validators.required, Validators.maxLength(255)]],
    destination: ['', [Validators.required, Validators.maxLength(255)]],
    tare_weight: [0],
    gross_weight: [0],
    weighing_description: ['', [Validators.maxLength(255)]],
  });

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.listenWeightFieldChanges();

    if (this.defaults == null) {
      this.listenFormFieldsChangesForSearchData();
      return;
    }

    this.form.patchValue({
      ...this.defaults,
      vehicle_plate: { plate: this.defaults.vehicle_plate, type: this.defaults.vehicle_plate },
      driver_dni_number: { id: this.defaults.driver_dni_number, name: this.defaults.driver_name },
      client: { name: this.defaults.client },
      commodity: { name: this.defaults.commodity },
    } as any);

    if (['finished', 'canceled', 'manualFinished'].includes(this.defaults.status)) {
      this.form.disable();
      return;
    }

    this.solveAndAutofillWeightField(this.defaults.weighing_type);
    this.form.clearValidators();
    this.form.get('weighing_type')?.disable();
    this.form.get('vehicle_plate')?.disable();
    this.form.get('vehicle_type')?.disable();
    this.form.get('driver_dni_number')?.disable();
    this.form.get('driver_name')?.disable();
    this.form.get('client')?.disable();
    this.form.get('commodity')?.disable();
    this.form.get('destination')?.disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['autofillWeight']) {
      this.solveAndAutofillWeightField(this.form.get('weighing_type')?.value);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listenFormFieldsChangesForSearchData() {
    if (this.defaults != null) {
      return;
    }

    this.form
      .get('weighing_type')
      ?.valueChanges.pipe(
        tap((v) => this.solveAndAutofillWeightField(v)),
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
            this.form.patchValue({
              vehicle_type: v.type,
              driver_dni_number: v.drivers[0],
              client: '',
              commodity: '',
            } as any)
        ),
        tap(
          (v: null | string | Vehicle) =>
            v != null &&
            typeof v === 'object' &&
            v.drivers.length > 1 &&
            (this.drivers = v.drivers) &&
            this.form.patchValue({ vehicle_type: v.type })
        ),
        tap(
          (v: null | string | Vehicle) =>
            v != null &&
            typeof v === 'object' &&
            v.clients.length === 1 &&
            this.form.patchValue({ client: v.clients[0] as any })
        ),
        tap(
          (v: null | string | Vehicle) =>
            v != null && typeof v === 'object' && v.clients.length > 1 && (this.clients = v.clients)
        ),
        tap(
          (v: null | string | Vehicle) =>
            v != null &&
            typeof v === 'object' &&
            v.commodities.length === 1 &&
            this.form.patchValue({ commodity: v.commodities[0] as any })
        ),
        tap(
          (v: null | string | Vehicle) =>
            v != null && typeof v === 'object' && v.commodities.length > 1 && (this.commodities = v.commodities)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('client')
      ?.valueChanges.pipe(
        debounce(() => timer(500)),
        tap(
          (v: null | string | { name: string }) =>
            v != null && typeof v === 'string' && v.trim() !== '' && this.searchClients.emit(v)
        ),
        tap(
          (v: null | string | { name: string }) =>
            v != null && typeof v === 'object' && this.form.patchValue({ customer: v } as any)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('commodity')
      ?.valueChanges.pipe(
        debounce(() => timer(500)),
        tap(
          (v: null | string | { name: string }) =>
            v != null && typeof v === 'string' && v.trim() !== '' && this.searchCommodities.emit(v)
        ),
        tap(
          (v: null | string | { name: string }) =>
            v != null && typeof v === 'object' && this.form.patchValue({ commodity: v } as any)
        ),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('driver_dni_number')
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

  listenWeightFieldChanges() {
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

  solveAndAutofillWeightField(weighingType: string | null | undefined) {
    if (
      typeof weighingType != 'string' ||
      weighingType === '' ||
      (this.defaults && this.defaults.status === 'finished')
    ) {
      return;
    }

    let fieldToCapture = '';

    if (this.defaults === null && weighingType === 'load') {
      fieldToCapture = 'tare_weight';
    }

    if (this.defaults === null && weighingType !== 'load') {
      fieldToCapture = 'gross_weight';
    }

    if (this.defaults !== null && weighingType === 'load') {
      fieldToCapture = 'gross_weight';
    }

    if (this.defaults !== null && weighingType !== 'load') {
      fieldToCapture = 'tare_weight';
    }

    const filedToDisable = fieldToCapture === 'tare_weight' ? 'gross_weight' : 'tare_weight';

    if (this.defaults === null) {
      this.form.patchValue({ gross_weight: 0, tare_weight: 0 });
    }

    this.form.get(filedToDisable)?.disable();
    this.form.get(filedToDisable)?.clearValidators();
    this.form.get(fieldToCapture)?.enable();
    this.form.get(fieldToCapture)?.setValidators([Validators.required, Validators.min(1)]);
    this.form.get(fieldToCapture)?.updateValueAndValidity();

    if (this.autofillWeight !== '') {
      this.form.patchValue({ [fieldToCapture]: parseInt(this.autofillWeight || '', 10) });
    }
  }

  calculateNetWeight(): number {
    return (this.form.get('gross_weight')?.value || 0) - (this.form.get('tare_weight')?.value || 0);
  }

  captureOnlyGrossWeight() {
    this.form.patchValue({ gross_weight: 0, tare_weight: 0 });
    this.form.get('tare_weight')?.disable();
    this.form.get('gross_weight')?.enable();

    if (this.autofillWeight !== '') {
      this.form.patchValue({ gross_weight: parseInt(this.autofillWeight || '', 10) });
    }
  }

  captureOnlyTareWeight() {
    this.form.patchValue({ gross_weight: 0, tare_weight: 0 });
    this.form.get('gross_weight')?.disable();
    this.form.get('tare_weight')?.enable();

    if (this.autofillWeight !== '') {
      this.form.patchValue({ tare_weight: parseInt(this.autofillWeight || '', 10) });
    }
  }

  displayPlate(v: Vehicle) {
    return v.plate;
  }

  displayId(d: Driver) {
    return d.id;
  }

  displayName(c: { name: string }) {
    return c.name;
  }

  openCancelDialog() {
    const dialogRef = this.dialog.open(CommentModalComponent, {
      data: { title: 'Motivo de anulación', message: 'Escribe el motivo de anulación del registro:' },
      width: '70%',
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((comment) => comment.trim().length > 5),
        tap((comment) => this.cancelWeighing.emit({ id: this.defaults?.id, comment })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  formSubmitted() {
    const formData: any = this.form.value;

    if (this.defaults != null) {
      this.submitted.emit({
        id: this.defaults.id,
        weighing_type: this.defaults.weighing_type,
        tare_weight: formData.tare_weight,
        gross_weight: formData.gross_weight,
        weighing_description: formData.weighing_description,
      });

      return;
    }

    this.submitted.emit({
      weighing_type: formData.weighing_type,
      vehicle_plate: formData.vehicle_plate.plate || formData.vehicle_plate,
      vehicle_type: formData.vehicle_type,
      driver_dni_number: formData.driver_dni_number.id || formData.driver_dni_number,
      client: formData.client.name || formData.client,
      commodity: formData.commodity.name || formData.commodity,
      destination: formData.destination,
      driver_name: formData.driver_name,
      tare_weight: formData.tare_weight,
      gross_weight: formData.gross_weight,
      weighing_description: formData.weighing_description,
    });
  }
}
