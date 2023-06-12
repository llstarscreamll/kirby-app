import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { WeighingMachineService } from '@kirby/shared';
import { WeighingsFacade } from '../../+state/weighings.facade';

@Component({
  selector: 'kirby-edit-weighing',
  templateUrl: './edit-weighing.page.html',
})
export class EditWeighingPage implements OnInit {
  facade = inject(WeighingsFacade);
  changeDetector = inject(ChangeDetectorRef);
  weighingMachine = inject(WeighingMachineService);

  apiError$ = this.facade.error$;
  selectedWeighing$ = this.facade.selectedWeighing$;

  machineValue = '';

  ngOnInit(): void {
    this.setUpWeightMachine();
  }

  setUpWeightMachine() {
    if (!this.weighingMachine.readyToConnect()) {
      return;
    }

    this.weighingMachine.openConnection((data: string) => {
      console.log('weight machine incoming data:', data);
      this.machineValue = data;
      this.changeDetector.detectChanges();
    });
  }

  updateWeighing(data) {}
}
