import { tap } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AuthFacade } from '@kirby/authentication/data-access';
import { LoadStatus, WeighingMachineService } from '@kirby/shared';

import { ProductionFacade } from '../+state/production.facade';

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
  creationStatus$ = this.production.creationStatus$.pipe(
    tap((status) => (status === LoadStatus.Completed ? (this.machineValue = '0') : null))
  );

  readyToConnectToWeighMachine = false;

  constructor(
    private authFacade: AuthFacade,
    private production: ProductionFacade,
    private changeDetector: ChangeDetectorRef,
    private weighingMachine: WeighingMachineService
  ) {}

  ngOnInit(): void {
    this.setUpWeightMachine();
  }

  printerIsAvailable(): boolean {
    return this.production.isPrinterAvailable();
  }

  setUpWeightMachine() {
    this.readyToConnectToWeighMachine = this.weighingMachine.readyToConnect();

    if (!this.readyToConnectToWeighMachine) {
      return;
    }

    // los datos que envíe la báscula serán enviados al formulario
    this.weighingMachine.openConnection((data) => {
      console.log('weight machine incoming data:', data);
      this.machineValue = data;
      this.changeDetector.detectChanges();
    });
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
