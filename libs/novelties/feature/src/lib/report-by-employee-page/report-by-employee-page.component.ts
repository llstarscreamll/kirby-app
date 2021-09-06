import moment from 'moment';
import { tap } from 'rxjs/operators';
import { Observable, Subject, timer } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil, map, debounce, filter, take } from 'rxjs/operators';

import { User } from '@kirby/users/util';
import { Pagination } from '@kirby/shared';
import { EmployeeInterface } from '@kirby/employees/util';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { AuthFacade } from '@kirby/authentication/data-access';
import { NoveltyReport, NoveltyModel } from '@kirby/novelties/data';

function objectIsSelected(control) {
  return typeof control.value === 'object' ? null : { objectIsSelected: false };
}

@Component({
  selector: 'kirby-report-by-employee-page',
  templateUrl: './report-by-employee-page.component.html',
  styleUrls: ['./report-by-employee-page.component.scss'],
})
export class ReportByEmployeePageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  noveltiesReport$: Observable<NoveltyReport>;

  errors$ = this.noveltyFacade.error$;
  foundEmployees$ = this.employeesFacade.paginatedEmployees$;
  user$ = this.authFacade.authUser$
    .pipe(
      tap((user) => (this.user = user)),
      debounce(() => timer(500)),
      filter((user) => this.searchForm && !user?.can('novelties.global-search')),
      tap((user) =>
        this.searchForm.patchValue({
          employee: { id: user.id, first_name: user.first_name, last_name: user.last_name },
        })
      ),
      takeUntil(this.destroy$)
    )
    .subscribe();

  user: User;
  searchForm: FormGroup;

  defaultStartAt = moment().startOf('month').format('YYYY-MM-DD');
  defaultEndAt = moment().endOf('month').format('YYYY-MM-DD');

  private searchOptions = {
    orderBy: 'start_at',
    sortedBy: 'desc',
    limit: 100,
  };

  constructor(
    private formBuilder: FormBuilder,
    private authFacade: AuthFacade,
    private noveltyFacade: NoveltiesFacade,
    private activatedRoute: ActivatedRoute,
    private employeesFacade: EmployeesFacade
  ) {}

  ngOnInit() {
    this.noveltiesReport$ = this.noveltyFacade.reportByEmployee$.pipe(
      tap((report) =>
        this.isEmployeeClean && !this.searchForm.touched && report && report.length > 0
          ? this.searchForm.patchValue({ employee: report.employee })
          : null
      )
    );

    this.buildForm();

    this.activatedRoute.queryParamMap
      .pipe(
        map((params) => ({
          employee_id: params.get('employee_id'),
          time_clock_log_check_out_start_date: params.get('time_clock_log_check_out_start_date'),
          time_clock_log_check_out_end_date: params.get('time_clock_log_check_out_end_date'),
        })),
        map(({ employee_id, time_clock_log_check_out_start_date, time_clock_log_check_out_end_date }) => ({
          employee_id,
          time_clock_log_check_out_start_date: !time_clock_log_check_out_start_date
            ? this.defaultStartAt
            : time_clock_log_check_out_start_date,
          time_clock_log_check_out_end_date: !time_clock_log_check_out_end_date
            ? this.defaultEndAt
            : time_clock_log_check_out_end_date,
        })),
        take(1),
        filter(
          ({ employee_id, time_clock_log_check_out_start_date, time_clock_log_check_out_end_date }) =>
            !!employee_id && !!time_clock_log_check_out_start_date && !!time_clock_log_check_out_end_date
        ),
        tap((params) => this.searchForm.patchValue({ ...params, employee_id: null })),
        tap((query) => this.noveltyFacade.search({ ...this.searchOptions, ...query }))
      )
      .subscribe();
  }

  setUpSearchForm(user: User) {}

  buildForm() {
    this.searchForm = this.formBuilder.group({
      employee: [, [Validators.required, objectIsSelected]],
      time_clock_log_check_out_start_date: [this.defaultStartAt, [Validators.required]],
      time_clock_log_check_out_end_date: [this.defaultEndAt, [Validators.required]],
    });

    this.listenFormChanges();
  }

  listenFormChanges() {
    this.searchForm
      .get('employee')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value !== ''),
        tap((value) => this.employeesFacade.search({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.noveltyFacade.cleanNoveltiesSearch();
  }

  get isEmployeeClean(): boolean {
    return this.searchForm?.get('employee')?.valid;
  }

  totalHours(novelties: NoveltyModel[]): number {
    return novelties.map((novelty) => novelty.total_time_in_hours).reduce((acc, hours) => acc + hours, 0);
  }

  displayEmployeeFieldValue(employee) {
    return employee ? `${employee.first_name} ${employee.last_name} | ${employee.code}` : null;
  }

  getEmployee(report: any) {
    return report && report.length ? report[0].employee : null;
  }

  showApproveButton(row): boolean {
    return true;
  }

  get searchHasValidDates(): boolean {
    return (
      this.searchForm &&
      this.searchForm.get('time_clock_log_check_out_start_date').valid &&
      this.searchForm.get('time_clock_log_check_out_end_date').valid
    );
  }

  setApprovals(employeeId: string, day: string) {
    const date = moment(day);

    this.noveltyFacade.setApprovalsByEmployeeAndDateRange(
      employeeId,
      date.startOf('day').toISOString(),
      date.endOf('day').toISOString()
    );
  }

  deleteApprovals(employeeId: string, day: string) {
    const date = moment(day);

    this.noveltyFacade.deleteApprovalsByEmployeeAndDateRange(
      employeeId,
      date.startOf('day').toISOString(),
      date.endOf('day').toISOString()
    );
  }

  searchSubmitted() {
    const formValue = this.searchForm.value;

    this.noveltyFacade.search({
      ...this.searchOptions,
      ...formValue,
      employees: [{ id: formValue.employee?.id }],
    });
  }

  downloadSelectedFilter() {
    this.noveltyFacade.downloadReport({
      ...this.searchForm.value,
      employee_id: this.searchForm.value.employee.id,
    });
  }

  downloadAllOnDateRange() {
    this.noveltyFacade.downloadReport({
      ...this.searchForm.value,
      employee_id: null,
    });
  }
}
