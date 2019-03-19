import * as JsBarCode from 'jsbarcode';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { isElectron } from '@llstarscreamll/utils';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, Optional, OnChanges } from '@angular/core';
import { SerialPortService, ElectronService } from '@llstarscreamll/electron';
import { AuthFacade } from '@llstarscreamll/authentication-data-access';
import { EventEmitter } from 'electron';

@Component({
  selector: 'pascal-production-record-by-weight',
  templateUrl: './production-record-by-weight.component.html',
  styleUrls: ['./production-record-by-weight.component.css']
})
export class ProductionRecordByWeightComponent implements OnInit, OnChanges {

  public authUser$: Observable<any>;

  public formChanges$: Subscription;

  public isElectron = isElectron();

  public form: FormGroup;

  public now = new Date();

  public products = [
    { id: 1, name: "Lápiz", c: '12.5', d: '25.0' },
    { id: 2, name: "Borrador", c: '154.2', d: '308.4' },
    { id: 3, name: "Cuaderno", c: '758.6', d: 758.6 * 2 },
  ];

  public customers = [
    { id: 1, name: "Chris Evans" },
    { id: 2, name: "Tony Stark" },
    { id: 3, name: "Bruce Banner" },
  ];

  public constructor(
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
    @Optional()
    private serialPortService: SerialPortService,
    @Optional()
    private electronService: ElectronService
  ) { }

  public get selectedProduct(): any {
    return this.form ? this.form.get('product').value : null;
  }

  public get selectedCustomer(): any {
    return this.form ? this.form.get('customer').value : null;
  }

  public get netWeight(): string {
    return this.form ? this.form.get('net_weight').value : null;
  }

  public get grossWeight(): string {
    return this.form ? this.form.get('gross_weight').value : null;
  }

  public get manufacturingDate(): string {
    return this.form ? this.form.get('manufacturing_date').value : null;
  }


  public get batch(): string {
    return this.form ? this.form.get('batch').value : null;
  }

  public ngOnInit() {

    this.electronService.on('error-printing-file', (sender, args) => console.error('error-printing-file', args));
    this.electronService.on('success-printing-file', (sender, args) => console.info('success-printing-file'));

    this.authUser$ = this.authFacade.authUser$;

    this.form = this.formBuilder.group({
      gross_weight: [0],
      net_weight: [0],
      operator: [],
      product: [],
      manufacturing_date: [],
      customer: [],
      batch: []
    });

    this.formChanges$ = this.form.valueChanges.pipe(tap(data => this.buildJsBarCode())).subscribe();

    this.buildJsBarCode();
  }

  public ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.buildJsBarCode();
  }

  public onGrossWeightFocus() {
    this.form.get('gross_weight').setValue(123);
  }

  public buildJsBarCode() {
    JsBarCode(".barcode", this.generateBarCode(), { lineColor: "rgba(0,0,0,0.8)", background: 'transparent', height: 70 });
  }

  public generateBarCode(): string {
    return new Date().getTime()
      + '-'
      + this.form.get('net_weight').value
      + '-'
      + (this.selectedProduct ? this.selectedProduct.id : '')
  }

  public print() {
    this.electronService.send('print-ticket', {
      marginsType: 1,
      pageSize: { height: 6 * 264.58, width: 2 * 264.58 }, // microns
      printBackground: false,
      printSelectionOnly: false,
      landscape: false
    });
    this.electronService.send('ELECTRON_BRIDGE_HOST', 'ping');
  }

}
