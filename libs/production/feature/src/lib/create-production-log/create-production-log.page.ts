import { timer, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounce, filter, tap, takeUntil, take } from 'rxjs/operators';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { User } from '@kirby/users/util';
import { LoadStatus, LocalStorageService } from '@kirby/shared';
import { ProductionFacade } from '../+state/production.facade';
import { AuthFacade } from '@kirby/authentication/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { WeighingMachineService } from '../weighing-machine.service';

@Component({
  selector: 'kirby-create-production-log',
  templateUrl: './create-production-log.page.html',
  styleUrls: ['./create-production-log.page.scss'],
})
export class CreateProductionLogPage implements OnInit, AfterViewInit, OnDestroy {
  machineValue: string;
  destroy$ = new Subject();
  error$ = this.production.errors$;
  user$ = this.authFacade.authUser$;
  products$ = this.production.products$;
  machines$ = this.production.machines$;
  customers$ = this.production.customers$;
  creationStatus$ = this.production.creationStatus$;
  paginatedEmployees$ = this.employeesFacade.paginatedEmployees$;

  @ViewChild('tareWeightField') tareWeightField: ElementRef;
  @ViewChild('grossWeightField') grossWeightField: ElementRef;

  user: User;
  form: FormGroup;

  constructor(
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
    private production: ProductionFacade,
    private employeesFacade: EmployeesFacade,
    private changeDetector: ChangeDetectorRef,
    private localStorage: LocalStorageService,
    private weighingMachineService: WeighingMachineService
  ) {}

  ngAfterViewInit(): void {
    if (this.readyToConnectToWeighMachine()) {
      this.grossWeightField.nativeElement.readOnly = true;
    }
  }

  ngOnInit(): void {
    this.user$
      .pipe(
        filter((user) => !!user),
        tap((user) => (this.user = user)),
        tap((_) => this.buildForm()),
        tap((_) => this.listenFormChanges()),
        tap((_) => this.setUpWeightMachine()),
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      employee: [this.user, []],
      product: [, [Validators.required]],
      machine: [, [Validators.required]],
      customer: [],
      batch: [],
      tare_weight: [, [Validators.required, Validators.min(0)]],
      gross_weight: [, [Validators.required, Validators.min(0.1)]],
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
        tap((value) => this.employeesFacade.search({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('product')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.production.searchProducts({ filter: { search: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('machine')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.production.searchMachines({ filter: { search: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.form
      .get('customer')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.production.searchCustomers({ filter: { search: value } })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  setUpWeightMachine() {
    if (!this.readyToConnectToWeighMachine()) {
      return;
    }

    const serialPortPreferences = this.localStorage.getItem('SerialPortConfig');

    // el campo del peso neto será llenado con los valores que envíe la báscula
    this.weighingMachineService.openConnection(serialPortPreferences.selected, (data) => {
      this.machineValue = data;
      this.form.patchValue({ gross_weight: getGramsFromWeighMachine(data) });
      this.changeDetector.detectChanges();
    });
  }

  readyToConnectToWeighMachine(): boolean {
    return this.weighingMachineService.isAvailable && this.localStorage.getItem('SerialPortConfig')?.selected;
  }

  displayNameValue(value) {
    if (!value) {
      return '';
    }

    const values = [value.name || '', value.internal_code || '', value.code || ''];

    return values.filter((v) => v.trim() !== '').join(' - ');
  }

  saveAndCreateOther() {
    const form = this.form.value;
    this.form.disable();

    this.creationStatus$
      .pipe(
        filter((status) => [LoadStatus.Completed, LoadStatus.Error].includes(status)),
        tap((status) => (status === LoadStatus.Completed ? this.makeFormReadyToAddOtherRecord() : this.enableForm())),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.production.createProductionLog({
      employee_id: form.employee.id,
      product_id: form.product.id,
      machine_id: form.machine.id,
      customer_id: form.customer?.id || '',
      batch: form.batch || '',
      tare_weight: form.tare_weight,
      gross_weight: form.gross_weight,
    });
  }

  private makeFormReadyToAddOtherRecord() {
    this.form.enable();
    this.machineValue = '';
    this.form.patchValue({ tare_weight: null, gross_weight: null });
    this.tareWeightField.nativeElement.focus();
  }

  private enableForm() {
    this.form.enable();
  }
}

function getGramsFromWeighMachine(value: string) {
  const floatWithMeasureUnit = value.replace(/\w+:/i, '');
  const measureUnit = floatWithMeasureUnit.replace(/\d|\./gi, '');
  const numericValue = parseFloat(value.replace(/[A-Za-z|:|\ ]/gi, ''));

  const gramsConversionLookUp = {
    tm: (tms: number) => tms * 1e6,
    kg: (kgs: number) => kgs * 1000,
    lb: (lbs: number) => lbs * 453.592,
  };

  const converter = gramsConversionLookUp[measureUnit.toLowerCase()];

  // tenemos el valor numérico y la unidad de medida, ahora tratamos de obtener
  // el valor en gramos
  return converter ? converter(numericValue) : numericValue;
}
