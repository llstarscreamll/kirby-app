import {
  Input,
  OnInit,
  Output,
  ViewChild,
  OnChanges,
  OnDestroy,
  Component,
  ElementRef,
  EventEmitter,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { timer, Subject } from 'rxjs';
import { debounce, filter, tap, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadStatus } from '@kirby/shared';

@Component({
  selector: 'kirby-production-log-form',
  templateUrl: 'production-log-form.component.html',
})
export class ProductionLogFormComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  @Input() user;
  @Input() status: LoadStatus;
  @Input() defaults;
  @Input() products;
  @Input() machines;
  @Input() customers;
  @Input() employees;
  @Input() rawGrossWeight;
  @Input() printerIsAvailable;
  @Input() weighMachineAvailable;

  @Output() save = new EventEmitter();
  @Output() saveAndPrint = new EventEmitter();
  @Output() searchProducts = new EventEmitter();
  @Output() searchMachines = new EventEmitter();
  @Output() saveAndAddOther = new EventEmitter();
  @Output() searchCustomers = new EventEmitter();
  @Output() searchEmployees = new EventEmitter();

  @ViewChild('tareWeightField') tareWeightField: ElementRef;
  @ViewChild('grossWeightField') grossWeightField: ElementRef;

  form: FormGroup;
  destroy$ = new Subject();

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.rawGrossWeight?.currentValue) {
      this.form.patchValue({ gross_weight: getKilogramsFromWeighMachine(changes.rawGrossWeight.currentValue) });
    }

    if (changes.status?.currentValue && changes.status?.currentValue === LoadStatus.Completed) {
      this.makeFormReadyToAddOtherRecord();
    }

    if (changes.status?.currentValue && changes.status?.currentValue === LoadStatus.Error) {
      this.form.enable();
    }
  }

  ngOnInit() {
    this.buildForm();
    this.listenFormChanges();

    if (this.defaults) {
      this.form.patchValue(this.defaults);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    if (this.weighMachineAvailable) {
      this.grossWeightField.nativeElement.readOnly = true;
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      employee: [this.user, []],
      product: [, [Validators.required]],
      machine: [, [Validators.required]],
      customer: [],
      batch: [],
      tare_weight: [0, [Validators.required, Validators.min(0)]],
      gross_weight: [0, [Validators.required, Validators.min(0.1)]],
    });

    if (!this.user.can('production-logs.create-on-behalf-of-another-person')) {
      this.form.get('employee').disable();
    }
  }

  private listenFormChanges() {
    this.form
      .get('employee')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchEmployees.emit({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('product')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchProducts.emit({ filter: { short_name: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('machine')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchMachines.emit({ filter: { short_name: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('customer')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.searchCustomers.emit({ filter: { search: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  get selectedProduct() {
    return this.form?.get('product')?.value;
  }

  displayNameValue(value) {
    if (!value) {
      return '';
    }

    const values = [
      (value.first_name || '') + ' ' + (value.last_name || ''),
      value.name || '',
      value.customer_code || '',
      value.code || '',
    ];

    return values.filter((v) => v.trim() !== '').join(' - ');
  }

  displayShortNameValue(value) {
    if (!value) {
      return '';
    }

    return value.short_name;
  }

  netWeight() {
    return (
      parseFloat(this.form?.get('gross_weight')?.value || '0') - parseFloat(this.form?.get('tare_weight')?.value || '0')
    ).toFixed(4);
  }

  emitSave() {
    this.form.disable();
    this.save.emit(this.getParsedFormValue());
  }

  emitSaveAndPrint() {
    this.form.disable();
    this.saveAndPrint.emit(this.getParsedFormValue());
  }

  emitSaveAndAddOther() {
    this.form.disable();
    this.save.emit(this.getParsedFormValue());
  }

  private getParsedFormValue() {
    const form = this.form.value;

    return {
      employee_id: form.employee.id,
      product_id: form.product.id,
      machine_id: form.machine.id,
      customer_id: form.customer?.id || '',
      batch: form.batch || '',
      tare_weight: form.tare_weight,
      gross_weight: form.gross_weight,
    };
  }

  private makeFormReadyToAddOtherRecord() {
    this.form.enable();
    this.form.patchValue({ tare_weight: null, gross_weight: null });
    this.tareWeightField.nativeElement.focus();
  }
}

function getKilogramsFromWeighMachine(value: string) {
  const floatWithMeasureUnit = value.replace(/\w+:/i, '');
  const measureUnit = floatWithMeasureUnit.replace(/\d|\./gi, '');
  const numericValue = parseFloat(value.replace(/[A-Za-z|:|\ ]/gi, ''));

  const gramsConversionLookUp = {
    tm: (tms: number) => tms * 1000,
    kg: (kgs: number) => kgs,
    gr: (grs: number) => grs * 0.001,
    lb: (lbs: number) => lbs * 0.453592,
  };

  const converter = gramsConversionLookUp[measureUnit.toLowerCase()];

  // tenemos el valor numérico y la unidad de medida, ahora tratamos de obtener
  // el valor en kilogramos
  return converter ? converter(numericValue) : numericValue;
}
