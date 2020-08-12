import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoadStatuses } from '@kirby/shared';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';

@Component({
  selector: 'kirby-create-novelties-to-employees-page',
  templateUrl: './create-novelties-to-employees-page.component.html',
  styleUrls: ['./create-novelties-to-employees-page.component.scss'],
})
export class CreateNoveltiesToEmployeesPageComponent
  implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  apiError$ = this.noveltiesFacade.error$;
  employees$ = this.employeesFacade.paginatedEmployees$;
  noveltyTypes$ = this.noveltiesFacade.paginatedNoveltyTypes$;
  createStatus$ = this.noveltiesFacade.createNoveltiesToEmployeesStatus$;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private noveltiesFacade: NoveltiesFacade,
    private employeesFacade: EmployeesFacade
  ) {}

  ngOnInit() {
    this.createStatus$
      .pipe(
        tap((status) => {
          if (status === LoadStatuses.Completed) {
            this.snackBar.open('Novedades creadas correctamente', 'Ok', {
              duration: 5 * 1000,
            });
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
