import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { WeighingMachineService } from '@kirby/shared';
import { WeighingsFacade } from '../../+state/weighings.facade';

@Component({
  selector: 'kirby-create-weighing',
  templateUrl: './create-weighing.page.html',
})
export class CreateWeighingPage implements OnInit, OnDestroy {
  apiError$ = this.facade.error$;
  drivers$ = this.facade.drivers$;
  clients$ = this.facade.clients$;
  vehicles$ = this.facade.vehicles$;
  commodities$ = this.facade.commodities$;

  machineValue = '';

  constructor(
    private facade: WeighingsFacade,
    private changeDetector: ChangeDetectorRef,
    private weighingMachine: WeighingMachineService
  ) {}

  ngOnInit(): void {
    this.setUpWeightMachine();
  }

  ngOnDestroy(): void {
    this.facade.cleanErrors();

    if (this.weighingMachine.readyToConnect()) {
      this.weighingMachine.closeConnection();
    }
  }

  setUpWeightMachine() {
    if (!this.weighingMachine.readyToConnect()) {
      return;
    }

    this.weighingMachine.openConnectionInContinuosMode((data: string) => {
      console.log('weight machine incoming data:', data);
      this.machineValue = data;
      this.changeDetector.detectChanges();
    });
  }

  searchVehicles(term: string) {
    this.facade.searchVehicles(term);
  }

  searchDrivers(term: string) {
    this.facade.searchDrivers(term);
  }

  searchClients(term: string) {
    this.facade.searchClients(term);
  }

  searchCommodities(term: string) {
    this.facade.searchCommodities(term);
  }

  createWeighing(data: any) {
    this.facade.createWeighing(data);
  }
}
