import { Component, OnInit, inject } from '@angular/core';

import { WeighingsFacade } from '../../+state/weighings.facade';
import { FormBuilder } from '@angular/forms';

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

  searchForm = this.fb.group({});

  ngOnInit(): void {
    this.searchWeighings();
  }

  searchWeighings(query = {}, pagination = {}) {
    this.facade.searchWeighings({ ...query, ...pagination });
  }
}
