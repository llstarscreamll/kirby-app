import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ProductionFacade } from '../+state/production.facade';
import { AuthFacade } from '@kirby/authentication/data-access';
import { LoadStatus, LocalStorageService } from '@kirby/shared';
import { WeighingMachineService } from '../weighing-machine.service';

@Component({
  selector: 'kirby-create-production-log',
  templateUrl: './create-production-log.page.html',
})
export class CreateProductionLogPage implements OnInit {
  machineValue: string;
  error$ = this.production.errors$;
  user$ = this.authFacade.authUser$;
  products$ = this.production.products$;
  machines$ = this.production.machines$;
  customers$ = this.production.customers$;
  creationStatus$ = this.production.creationStatus$;

  constructor(
    private authFacade: AuthFacade,
    private production: ProductionFacade,
    private changeDetector: ChangeDetectorRef,
    private localStorage: LocalStorageService,
    private weighingMachineService: WeighingMachineService
  ) {}

  ngOnInit(): void {
    this.setUpWeightMachine();
  }

  printerIsAvailable(): boolean {
    return this.production.isPrinterAvailable();
  }

  setUpWeightMachine() {
    if (!this.readyToConnectToWeighMachine()) {
      return;
    }

    const serialPortPreferences = this.localStorage.getItem('SerialPortConfig');

    // los datos que envíe la báscula serán enviados al formulario
    this.weighingMachineService.openConnection(serialPortPreferences.selected, (data) => {
      this.machineValue = data;
      this.changeDetector.detectChanges();
    });
  }

  readyToConnectToWeighMachine(): boolean {
    return this.weighingMachineService.isAvailable && this.localStorage.getItem('SerialPortConfig')?.selected;
  }

  searchProducts(query) {
    this.production.searchProducts(query);
  }

  searchMachines(query) {
    this.production.searchMachines(query);
  }

  searchCustomers(query) {
    this.production.searchCustomers(query);
  }

  save(data) {
    this.production.setCreateStatus(LoadStatus.Empty);
    this.production.createProductionLog(data);
  }

  saveAndPrint(data) {
    this.production.setCreateStatus(LoadStatus.Empty);
    this.production.createAndPrintProductionLog(data);
  }
}
