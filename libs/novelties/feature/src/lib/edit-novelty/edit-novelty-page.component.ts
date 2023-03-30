import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoveltiesFacade } from '@kirby/novelties/data-access';

import { EmployeesFacade } from '@kirby/employees/data-access';
import { AuthFacade } from '@kirby/authentication/data-access';

@Component({
  selector: 'kirby-edit-novelty-page',
  templateUrl: './edit-novelty-page.component.html',
  styles: [
    `
      kirby-novelty-form {
        display: block;
      }
    `,
  ],
})
export class EditNoveltyPageComponent implements OnInit, OnDestroy {
  user$ = this.authFacade.authUser$;
  apiError$ = this.noveltiesFacade.error$;
  novelty$ = this.noveltiesFacade.selectedNovelty$;
  employees$ = this.employeesFacade.paginatedEmployees$;
  noveltyTypes$ = this.noveltiesFacade.paginatedNoveltyTypes$;

  constructor(
    private authFacade: AuthFacade,
    private noveltiesFacade: NoveltiesFacade,
    private employeesFacade: EmployeesFacade
  ) {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.noveltiesFacade.cleanSelected();
  }

  onSearchEmployees(query) {
    this.employeesFacade.search(query);
  }

  onSearchNovelties(query) {
    this.noveltiesFacade.searchNoveltyTypes(query);
  }

  onNoveltyUpdated(novelty) {
    this.noveltiesFacade.update(novelty.id, novelty);
  }

  /**
   * @todo add tests to this trash functionality
   * @param novelty
   */
  onNoveltyTrashed(novelty) {
    this.noveltiesFacade.trash(novelty.id);
  }
}
