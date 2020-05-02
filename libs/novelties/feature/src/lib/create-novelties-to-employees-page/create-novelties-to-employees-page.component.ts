import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { EmployeeInterface } from '@kirby/employees/util';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data';
import { Pagination, LoadStatuses, ApiError } from '@kirby/shared';

@Component({
  selector: 'kirby-create-novelties-to-employees-page',
  templateUrl: './create-novelties-to-employees-page.component.html',
  styleUrls: ['./create-novelties-to-employees-page.component.scss']
})
export class CreateNoveltiesToEmployeesPageComponent
  implements OnInit, OnDestroy {
  public createNoveltiesToEmployeesStatus$: Observable<LoadStatuses>;
  public employees$: Observable<Pagination<EmployeeInterface>>;
  public noveltyTypes$: Observable<Pagination<NoveltyTypeInterface>>;
  public apiError$: Observable<ApiError>;
  private destroy$ = new Subject();

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private noveltiesFacade: NoveltiesFacade,
    private employeesFacade: EmployeesFacade
  ) {}

  ngOnInit() {
    this.employees$ = this.employeesFacade.paginatedEmployees$;
    this.noveltyTypes$ = this.noveltiesFacade.paginatedNoveltyTypes$;
    this.createNoveltiesToEmployeesStatus$ = this.noveltiesFacade.createNoveltiesToEmployeesStatus$;
    this.apiError$ = this.noveltiesFacade.error$;

    this.createNoveltiesToEmployeesStatus$
      .pipe(
        tap(status => {
          if (status === LoadStatuses.Completed) {
            this.snackBar.open('Novedades creadas correctamente', 'Ok', { duration: 5 * 1000 });
            this.router.navigate(['/novelties']);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.noveltiesFacade.resetCreateNoveltiesToEmployees();
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchEmployees(query) {
    this.employeesFacade.search(query);
  }

  onSearchNovelties(query) {
    this.noveltiesFacade.searchNoveltyTypes(query);
  }

  onSubmit(data) {
    this.noveltiesFacade.createNoveltiesToEmployees(data);
  }
}
