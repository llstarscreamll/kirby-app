import moment from 'moment';
import { Subject } from 'rxjs';
import { filter, tap, takeUntil } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { BalanceDialogComponent } from '@kirby/novelties/ui';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthFacade } from '@kirby/authentication-data-access';

@Component({
  selector: 'kirby-resume-by-employees-and-novelty-types-page',
  templateUrl: './resume-by-employees-and-novelty-types-page.component.html',
  styleUrls: ['./resume-by-employees-and-novelty-types-page.component.scss'],
})
export class ResumeByEmployeesAndNoveltyTypesPageComponent
  implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user$ = this.authFacade.authUser$;
  apiError$ = this.noveltiesFacade.error$;
  paginatedResume$ = this.noveltiesFacade.resumeByEmployeesAndNoveltyTypes$;

  searchForm: FormGroup;

  defaultStartDate = moment().startOf('month').format('YYYY-MM-DD');
  defaultEndDate = moment().endOf('month').format('YYYY-MM-DD');

  constructor(
    private dialog: MatDialog,
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
    private noveltiesFacade: NoveltiesFacade,
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      page: 1,
      search: [''],
      start_date: [this.defaultStartDate, [Validators.required]],
      end_date: [this.defaultEndDate, [Validators.required]],
    });

    this.getResume({
      start_date: this.defaultStartDate,
      end_date: this.defaultEndDate,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchSubmitted() {
    this.getResume(this.searchForm.value);
  }

  getResume(query = {}) {
    this.noveltiesFacade.getResumeByEmployeesAndNoveltyTypes(query);
  }
  
  paginate(query) {
    this.noveltiesFacade.getResumeByEmployeesAndNoveltyTypes({...this.searchForm.value, ...query});
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
}
