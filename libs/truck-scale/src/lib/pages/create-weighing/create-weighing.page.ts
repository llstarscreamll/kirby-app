import { Component } from '@angular/core';

import { WeighingsFacade } from '../../+state/weighings.facade';

@Component({
  selector: 'kirby-create-weighing',
  templateUrl: './create-weighing.page.html',
})
export class CreateWeighingPage {
  apiError$ = this.facade.error$;
  vehicles$ = this.facade.vehicles$;

  constructor(private facade: WeighingsFacade) {}

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
