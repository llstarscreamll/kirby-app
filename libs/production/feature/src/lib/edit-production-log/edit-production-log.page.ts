import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { AuthFacade } from '@kirby/authentication/data-access';
import { LoadStatus, WeighingMachineService } from '@kirby/shared';

import { ProductionFacade } from '../+state/production.facade';

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

  readyToConnectToWeighMachine = false;

  constructor(
    private authFacade: AuthFacade,
    private changeDetector: ChangeDetectorRef,
    private productionFacade: ProductionFacade,
    private weighingMachine: WeighingMachineService
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
    this.readyToConnectToWeighMachine = this.weighingMachine.readyToConnect();

    if (!this.readyToConnectToWeighMachine) {
      return;
    }

    // los datos que envíe la báscula serán enviados al formulario
    this.weighingMachine.openConnection((data) => {
      this.machineValue = data;
      this.changeDetector.detectChanges();
    });
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
    this.productionFacade.setUpdateStatus(LoadStatus.Empty);
    this.productionFacade.updateProductionLog(id, data);
  }

  saveAndPrint(id, data) {
    this.productionFacade.setUpdateStatus(LoadStatus.Empty);
    this.productionFacade.updateAndPrintProductionLog(id, data);
  }
}
