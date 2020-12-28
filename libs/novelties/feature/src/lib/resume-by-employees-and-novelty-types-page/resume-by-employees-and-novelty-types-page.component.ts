import moment from 'moment';
import { Subject } from 'rxjs';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BalanceDialogComponent } from '@kirby/novelties/ui';
import { AuthFacade } from '@kirby/authentication-data-access';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kirby-resume-by-employees-and-novelty-types-page',
  templateUrl: './resume-by-employees-and-novelty-types-page.component.html',
  styleUrls: ['./resume-by-employees-and-novelty-types-page.component.scss'],
})
export class ResumeByEmployeesAndNoveltyTypesPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user$ = this.authFacade.authUser$;
  apiError$ = this.noveltiesFacade.error$;
  paginatedResume$ = this.noveltiesFacade.resumeByEmployeesAndNoveltyTypes$;

  searchForm: FormGroup;

  defaultStartDate = moment().startOf('month');
  defaultEndDate = moment().endOf('month');

  constructor(
    private dialog: MatDialog,
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
    private noveltiesFacade: NoveltiesFacade
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      page: 1,
      search: [''],
      start_date: [this.defaultStartDate.format('YYYY-MM-DD'), [Validators.required]],
      end_date: [this.defaultEndDate.format('YYYY-MM-DD'), [Validators.required]],
    });

    this.getResume({
      start_date: this.defaultStartDate.toISOString(),
      end_date: this.defaultEndDate.toISOString(),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  parsedFormValue() {
    return {
      ...this.searchForm.value,
      start_date: moment(this.searchForm.value.start_date).toISOString(),
      end_date: moment(this.searchForm.value.end_date).toISOString(),
    };
  }

  searchSubmitted(): any {
    this.getResume(this.parsedFormValue());
  }

  getResume(query = {}) {
    this.noveltiesFacade.getResumeByEmployeesAndNoveltyTypes(query);
  }

  paginate(query) {
    this.noveltiesFacade.getResumeByEmployeesAndNoveltyTypes({
      ...this.parsedFormValue(),
      ...query,
    });
  }

  openBalanceDialog(employeeNoveltiesResumeByNoveltyType) {
    const dialogReference = this.dialog.open(BalanceDialogComponent, {
      data: employeeNoveltiesResumeByNoveltyType,
    });

    dialogReference
      .afterClosed()
      .pipe(
        filter((response) => response),
        tap((response) => this.noveltiesFacade.createBalanceNovelty(response)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  exportNoveltiesResume() {
    this.noveltiesFacade.exportNoveltiesResume({
      start_at: moment(this.searchForm.value.start_date).toISOString(),
      end_at: moment(this.searchForm.value.end_date).toISOString(),
    });
  }
}
