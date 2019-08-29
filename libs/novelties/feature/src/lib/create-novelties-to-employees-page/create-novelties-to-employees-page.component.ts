import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Pagination } from '@llstarscreamll/shared';
import { EmployeeInterface } from '@llstarscreamll/employees/util';
import { NoveltiesFacade } from '@llstarscreamll/novelties/data-access';
import { EmployeesFacade } from '@llstarscreamll/employees/data-access';
import { NoveltyTypeInterface } from '@llstarscreamll/novelty-types/data';

@Component({
  selector: 'llstarscreamll-create-novelties-to-employees-page',
  templateUrl: './create-novelties-to-employees-page.component.html',
  styleUrls: ['./create-novelties-to-employees-page.component.scss']
})
export class CreateNoveltiesToEmployeesPageComponent implements OnInit {
  public employees$: Observable<Pagination<EmployeeInterface>>;
  public noveltyTypes$: Observable<Pagination<NoveltyTypeInterface>>;

  public constructor(
    private noveltiesFacade: NoveltiesFacade,
    private employeesFacade: EmployeesFacade
  ) {}

  public ngOnInit() {
    this.employees$ = this.employeesFacade.paginatedEmployees$;
    this.noveltyTypes$ = this.noveltiesFacade.paginatedNoveltyTypes$;
  }

  public onSearchEmployees(query) {
    this.employeesFacade.search(query);
  }

  public onSearchNovelties(query) {
    this.noveltiesFacade.searchNoveltyTypes(query);
  }
}
