import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NoveltiesFacade } from '@kirby/novelties/data-access';

import { Pagination } from '@kirby/shared';
import { NoveltyModel } from '@kirby/novelties/data';
import { EmployeeInterface } from '@kirby/employees/util';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data';

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
  public noveltyTypes$: Observable<Pagination<NoveltyTypeInterface>>;

  public constructor(
    private noveltiesFacade: NoveltiesFacade,
    private employeesFacade: EmployeesFacade
  ) {}

  public ngOnInit() {
    this.novelty$ = this.noveltiesFacade.selectedNovelty$;
    this.employees$ = this.employeesFacade.paginatedEmployees$;
    this.noveltyTypes$ = this.noveltiesFacade.paginatedNoveltyTypes$;
  }

  public ngOnDestroy(): void {
    this.noveltiesFacade.cleanSelected();
  }

  public onSearchEmployees(query) {
    this.employeesFacade.search(query);
  }

  public onSearchNovelties(query) {
    this.noveltiesFacade.searchNoveltyTypes(query);
  }

  public onNoveltyUpdated(novelty) {
    this.noveltiesFacade.update(novelty.id, novelty);
  }

  /**
   * @todo add tests to this trash functionality
   * @param novelty 
   */
  public onNoveltyTrashed(novelty) {
    this.noveltiesFacade.trash(novelty.id);
  }
}
