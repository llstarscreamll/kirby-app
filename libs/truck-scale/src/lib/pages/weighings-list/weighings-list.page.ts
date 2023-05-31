import { FormBuilder } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';

import { WeighingsFacade } from '../../+state/weighings.facade';

@Component({
  selector: 'kirby-weighings-list',
  templateUrl: './weighings-list.page.html',
})
export class WeighingsListPage implements OnInit {
  fb = inject(FormBuilder);
  facade = inject(WeighingsFacade);

  apiError$ = this.facade.error$;
  weighings$ = this.facade.weighings$;
  weighingsPaginationMeta$ = this.facade.weighingsPaginationMeta$;

  searchForm = this.fb.group({
    id: [],
    vehicle_plate: [],
    vehicle_type: [],
    status: [],
    date: [],
  });

  ngOnInit(): void {
    this.searchWeighings();
  }

  searchWeighings(query = {}, pagination = {}) {
    this.facade.searchWeighings({ ...query, ...pagination });
  }

  searchFormSubmit() {
    this.facade.searchWeighings({ filter: { ...this.searchForm.value }, page: 1 });
  }
}
