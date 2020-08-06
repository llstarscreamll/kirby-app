import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoveltiesFacade } from '@kirby/novelties/data-access';

import { Pagination } from '@kirby/shared';
import { NoveltyModel } from '@kirby/novelties/data';
import { EmployeeInterface } from '@kirby/employees/util';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { NoveltyType } from '@kirby/novelty-types/data';

@Component({
  selector: 'kirby-edit-novelty-page',
  templateUrl: './edit-novelty-page.component.html',
  styles: [
    `
      kirby-novelty-form {
        display: block;
      }
    `
  ]
})
export class EditNoveltyPageComponent implements OnInit, OnDestroy {
  public novelty$: Observable<NoveltyModel>;
  public employees$: Observable<Pagination<EmployeeInterface>>;
  public noveltyTypes$: Observable<Pagination<NoveltyType>>;

  constructor(
    private noveltiesFacade: NoveltiesFacade,
    private employeesFacade: EmployeesFacade
  ) {}

  ngOnInit() {
    this.novelty$ = this.noveltiesFacade.selectedNovelty$;
    this.employees$ = this.employeesFacade.paginatedEmployees$;
    this.noveltyTypes$ = this.noveltiesFacade.paginatedNoveltyTypes$;
  }

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
