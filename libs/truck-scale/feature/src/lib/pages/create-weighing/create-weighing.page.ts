import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { WeighingMachineService } from '@kirby/shared';
import { WeighingsFacade } from '../../+state/weighings.facade';

@Component({
  selector: 'kirby-create-weighing',
  templateUrl: './create-weighing.page.html',
})
export class CreateWeighingPage implements OnInit {
  apiError$ = this.facade.error$;
  drivers$ = this.facade.drivers$;
  vehicles$ = this.facade.vehicles$;

  machineValue = '';
  readyToConnectToWeighMachine = false;

  constructor(
    private facade: WeighingsFacade,
    private changeDetector: ChangeDetectorRef,
    private weighingMachine: WeighingMachineService
  ) {}

  ngOnInit(): void {
    this.setUpWeightMachine();
  }

  setUpWeightMachine() {
    this.readyToConnectToWeighMachine = this.weighingMachine.readyToConnect();

    if (!this.readyToConnectToWeighMachine) {
      return;
    }

    // los datos que envíe la báscula serán enviados al formulario
    this.weighingMachine.openConnection((data: string) => {
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

  createWeighing(data: any) {
    this.facade.createWeighing(data);
  }
}
