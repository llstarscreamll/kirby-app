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
import { TagOptions } from '../tag-options';
import { PurposeOptions } from '../purpose-options';

@Component({
  selector: 'kirby-production-log-form',
  templateUrl: 'production-log-form.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      @font-face {
        font-family: 'password-mask';
        src: url(data:font/woff;charset:utf-8;base64,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)
          format('woff');
      }

      .input-mask {
        font-family: password-mask;
      }
    `,
  ],
})
export class ProductionLogFormComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {
  @Input() user;
  @Input() status: LoadStatus;
  @Input() defaults;
  @Input() products;
  @Input() machines;
  @Input() customers;
  @Input() rawGrossWeight;
  @Input() printerIsAvailable;
  @Input() weighMachineAvailable;

  @Output() save = new EventEmitter();
  @Output() saveAndPrint = new EventEmitter();
  @Output() searchProducts = new EventEmitter();
  @Output() searchMachines = new EventEmitter();
  @Output() saveAndAddOther = new EventEmitter();
  @Output() searchCustomers = new EventEmitter();

  @ViewChild('tareWeightField') tareWeightField: ElementRef;
  @ViewChild('grossWeightField') grossWeightField: ElementRef;

  form: FormGroup;
  destroy$ = new Subject();
  tagOptions = TagOptions;
  purposeOptions = PurposeOptions;
  captureEmployeeCode = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.form) {
      return;
    }

    if (changes.rawGrossWeight?.currentValue) {
      this.form.patchValue({ gross_weight: getKilogramsFromWeighMachine(changes.rawGrossWeight.currentValue) });
    }

    if (changes.status?.currentValue && changes.status?.currentValue === LoadStatus.Completed) {
      this.makeFormReadyToAddOtherRecord();
    }

    if (changes.status?.currentValue && changes.status?.currentValue === LoadStatus.Error) {
      this.form.enable();
      this.checkForEmployeecodeAvailability();
    }
  }

  ngOnInit() {
    this.captureEmployeeCode =
      this.user.can('production-logs.create-on-behalf-of-another-person') ||
      (this.defaults && this.user.can('production-logs.create-on-behalf-of-another-person'));

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
      employee_code: [this.captureEmployeeCode ? '' : this.user.fullName, [Validators.required]],
      product: [null, [Validators.required]],
      machine: [null, [Validators.required]],
      customer: [],
      batch: [],
      tare_weight: [0, [Validators.required, Validators.min(0)]],
      gross_weight: [0, [Validators.required, Validators.min(0.1)]],
      tag: [],
      purpose: ['', [Validators.required]],
    });

    this.checkForEmployeecodeAvailability();
  }

  private checkForEmployeecodeAvailability() {
    if (!this.captureEmployeeCode) {
      this.form.get('employee_code').disable();
    }
  }

  private listenFormChanges() {
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
    this.saveAndPrint.emit({ ...this.defaults, ...this.form.value, ...this.getParsedFormValue() });
  }

  emitSaveAndAddOther() {
    this.form.disable();
    this.saveAndAddOther.emit(this.getParsedFormValue());
  }

  private getParsedFormValue() {
    const form = this.form.value;

    return {
      employee_code: this.captureEmployeeCode ? form.employee_code : '',
      product_id: form.product.id,
      machine_id: form.machine.id,
      customer_id: form.customer?.id || '',
      batch: form.batch || '',
      tare_weight: form.tare_weight,
      gross_weight: form.gross_weight,
      tag: form.tag,
      purpose: form.purpose,
    };
  }

  private makeFormReadyToAddOtherRecord() {
    this.form.enable();

    this.form.patchValue({
      tare_weight: null,
      gross_weight: null,
      employee_code: this.captureEmployeeCode ? '' : this.user.fullName,
    });

    if (!this.captureEmployeeCode) {
      this.form.get('employee_code').disable();
    }

    this.tareWeightField.nativeElement.focus();
  }
}

function getKilogramsFromWeighMachine(value: string) {
  const floatWithMeasureUnit = value.replace(/\w+:/i, '');
  const measureUnit = floatWithMeasureUnit.replace(/\d|\./gi, '');
  const numericValue = parseFloat(value.replace(/[A-Za-z|:| ]/gi, ''));

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
