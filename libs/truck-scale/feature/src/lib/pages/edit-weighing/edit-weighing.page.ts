import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';

import { WeighingMachineService } from '@kirby/shared';
import { WeighingsFacade } from '../../+state/weighings.facade';

@Component({
  selector: 'kirby-edit-weighing',
  templateUrl: './edit-weighing.page.html',
})
export class EditWeighingPage implements OnInit, OnDestroy {
  facade = inject(WeighingsFacade);
  changeDetector = inject(ChangeDetectorRef);
  weighingMachine = inject(WeighingMachineService);

  apiError$ = this.facade.error$;
  weighing$ = this.facade.selectedWeighing$;

  machineValue = '';

  ngOnInit(): void {
    this.setUpWeightMachine();
  }

  ngOnDestroy(): void {
    this.facade.cleanErrors();
    this.facade.cleanSelected();

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

  updateWeighing(data: any) {
    this.facade.updateWeighing(data);
  }
}
