import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NoveltiesFacade } from '@llstarscreamll/novelties/data-access/src';

import { Pagination } from '@llstarscreamll/shared';
import { NoveltyInterface } from '@llstarscreamll/novelties/data';
import { EmployeeInterface } from '@llstarscreamll/employees/util';
import { EmployeesFacade } from '@llstarscreamll/employees/data-access';
import { NoveltyTypeInterface } from '@llstarscreamll/novelty-types/data';

@Component({
  selector: 'llstarscreamll-edit-novelty-page',
  templateUrl: './edit-novelty-page.component.html',
  styles: [`
  llstarscreamll-novelty-form { display: block; }
  `]
})
export class EditNoveltyPageComponent implements OnInit {

  public novelty$: Observable<NoveltyInterface>
  public employees$: Observable<Pagination<EmployeeInterface>>
  public noveltyTypes$: Observable<Pagination<NoveltyTypeInterface>>

  public constructor(
    private noveltiesFacade: NoveltiesFacade,
    private employeesFacade: EmployeesFacade,
  ) { }

  public ngOnInit() {
    this.novelty$ = this.noveltiesFacade.selectedNovelty$;
    this.employees$ = this.employeesFacade.paginatedEmployees$;
    this.noveltyTypes$ = this.noveltiesFacade.paginatedNoveltyTypes$;
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

}
