import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';

import { PrinterService, WeighingMachineService } from '@kirby/shared';
import { WeighingsFacade } from '../../+state/weighings.facade';
import { AuthFacade } from '@kirby/authentication/data-access';

@Component({
  selector: 'kirby-edit-weighing',
  templateUrl: './edit-weighing.page.html',
})
export class EditWeighingPage implements OnInit, OnDestroy {
  authFacade = inject(AuthFacade);
  facade = inject(WeighingsFacade);
  printer = inject(PrinterService);
  changeDetector = inject(ChangeDetectorRef);
  weighingMachine = inject(WeighingMachineService);

  user$ = this.authFacade.authUser$;
  apiError$ = this.facade.error$;
  lectureFlag$ = this.facade.lectureFlag$;
  weighing$ = this.facade.selectedWeighing$;

  machineValue = '';
  showPrintButton = this.printer.isAvailable;
  inDesktopMode = this.weighingMachine.isAvailable;

  ngOnInit(): void {
    this.setUpWeightMachine();
  }

  ngOnDestroy(): void {
    this.facade.cleanErrors();
    this.facade.cleanSelected();

    if (this.weighingMachine.readyToConnect()) {
      this.weighingMachine.closeConnection();
    }

    if (this.inDesktopMode) {
      this.facade.stopGetWeightLectureFlagPolling();
    }
  }

  setUpWeightMachine() {
    if (this.inDesktopMode) {
      this.facade.startGetWeightLectureFlagPolling();
    }

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

  cancelWeighing({ id, comment }: { id: string; comment: string }) {
    this.facade.cancelWeighing(id, comment);
  }

  manualFinishWeighing(id: string) {
    this.facade.manualFinishWeighing(id);
  }

  print(data: any) {
    this.printer.print(data, { template: 'weighing' });
  }
}
