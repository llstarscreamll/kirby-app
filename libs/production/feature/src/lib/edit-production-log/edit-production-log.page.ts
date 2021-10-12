import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { ProductionFacade } from '../+state/production.facade';
import { AuthFacade } from '@kirby/authentication/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { LoadStatus, LocalStorageService } from '@kirby/shared';
import { WeighingMachineService } from '../weighing-machine.service';

@Component({
  selector: 'kirby-edit-production-log',
  templateUrl: './edit-production-log.page.html',
})
export class EditProductionLogPage implements OnInit, OnDestroy {
  machineValue: string;
  user$ = this.authFacade.authUser$;
  error$ = this.productionFacade.errors$;
  products$ = this.productionFacade.products$;
  machines$ = this.productionFacade.machines$;
  customers$ = this.productionFacade.customers$;
  status$ = this.productionFacade.updateStatus$;
  productionLog$ = this.productionFacade.selectedProductionLog$;
  paginatedEmployees$ = this.employeesFacade.paginatedEmployees$;

  constructor(
    private authFacade: AuthFacade,
    private employeesFacade: EmployeesFacade,
    private changeDetector: ChangeDetectorRef,
    private localStorage: LocalStorageService,
    private productionFacade: ProductionFacade,
    private weighingMachineService: WeighingMachineService
  ) {}

  ngOnInit(): void {
    this.setUpWeightMachine();
  }

  ngOnDestroy(): void {
    this.productionFacade.clearSelectedProductionLog();
  }

  printerIsAvailable(): boolean {
    return this.productionFacade.isPrinterAvailable();
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

  searchEmployees(query) {
    this.employeesFacade.search(query);
  }

  searchProducts(query) {
    this.productionFacade.searchProducts(query);
  }

  searchMachines(query) {
    this.productionFacade.searchMachines(query);
  }

  searchCustomers(query) {
    this.productionFacade.searchCustomers(query);
  }

  save(id, data) {
    console.warn('updating', id, data);

    this.productionFacade.setUpdateStatus(LoadStatus.Empty);
    this.productionFacade.updateProductionLog(id, data);
  }

  saveAndPrint(id, data) {
    this.productionFacade.setUpdateStatus(LoadStatus.Empty);
    this.productionFacade.updateAndPrintProductionLog(id, data);
  }
}
