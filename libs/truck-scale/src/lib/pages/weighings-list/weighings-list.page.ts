import { Component, OnInit, inject } from '@angular/core';

import { WeighingsFacade } from '../../+state/weighings.facade';

@Component({
  selector: 'kirby-weighings-list',
  templateUrl: './weighings-list.page.html',
})
export class WeighingsListPage implements OnInit {
  facade = inject(WeighingsFacade);

  apiError$ = this.facade.error$;
  weighings$ = this.facade.weighings$;

  ngOnInit(): void {
    this.facade.searchWeighings();
  }
}
