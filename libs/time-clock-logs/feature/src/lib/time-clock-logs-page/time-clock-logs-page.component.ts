import moment from 'moment';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject, timer } from 'rxjs';
import { debounce, filter, map, takeUntil, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { User } from '@kirby/users/util';
import { Pagination } from '@kirby/shared';
import { TimeClockLogModel } from '@kirby/time-clock-logs/util';
import { AuthFacade } from '@kirby/authentication/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { TimeClockLogsFacade } from '@kirby/time-clock-logs/data-access';

@Component({
  selector: 'kirby-time-clock-logs-page',
  templateUrl: './time-clock-logs-page.component.html',
})
export class TimeClockLogsPageComponent implements OnInit, OnDestroy {
  @ViewChild('employeeInput') employeeInput: ElementRef<HTMLInputElement>;

  destroy$ = new Subject();
  user$: Observable<User>;
  apiError$ = this.timeClockFacade.apiError$;
  timeClockLogs$: Observable<Pagination<TimeClockLogModel>>;
  peopleInsideCount$ = this.timeClockFacade.peopleInsideCount$;
  employees$ = this.employeesFacade.paginatedEmployees$.pipe(map((paginatedData) => paginatedData.data));

  user: User;
  searchQuery = {};
  searchForm = this.formBuilder.group({
    employee: '',
    employees: [],
    checkInStart: '',
    checkInEnd: '',
  });

  constructor(
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder,
    private employeesFacade: EmployeesFacade,
    private timeClockFacade: TimeClockLogsFacade
  ) {}

  ngOnInit() {
    this.user$ = this.authFacade.authUser$.pipe(tap((user) => (this.user = user)));
    this.timeClockLogs$ = this.timeClockFacade.paginatedTimeClockLogs$;

    this.searchForm
      .get('employee')
      .valueChanges.pipe(
        debounce(() => timer(400)),
        filter((value) => typeof value === 'string' && value.trim() !== ''),
        tap((value) => this.employeesFacade.search({ search: value })),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.searchTimeClockLogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get timeClockLogsTableButtons() {
    const buttons = [];

    if (this.user && this.user.can('time-clock-logs.approvals.create')) {
      buttons.push('approve');
    }

    if (this.user && this.user.can('time-clock-logs.approvals.delete')) {
      buttons.push('delete-approval');
    }

    return buttons;
  }

  onApprove(timeClockLogId: string) {
    this.timeClockFacade.approve(timeClockLogId, this.user);
  }

  onDeleteApproval(timeClockLogId: string) {
    this.timeClockFacade.deleteApproval(timeClockLogId, this.user);
  }

  get addedEmployees(): { id: string; first_name: string; last_name: string }[] {
    return this.searchForm?.get('employees').value || [];
  }

  employeeIsSelected(employee): boolean {
    return this.addedEmployees.map((e) => e.id).includes(employee.id);
  }

  addEmployee(event: MatAutocompleteSelectedEvent) {
    this.searchForm.patchValue({
      employees: this.addItemToCollection(event.option.value, this.addedEmployees),
      employee: '',
    });
    this.employeeInput.nativeElement.value = '';
  }

  addItemToCollection(item: { id: string }, collection: { id: string }[]): { id: string }[] {
    if (collection.findIndex((added) => added.id === item.id) === -1) {
      collection.push(item);
    }

    return collection;
  }

  removeEmployee(employee: { id: string; first_name: string; last_name: string }) {
    this.searchForm.patchValue({ employees: this.removeItemFromCollection(employee, this.addedEmployees) });
  }

  removeItemFromCollection(item: { id: string }, collection: { id: string }[]): { id: string }[] {
    const itemIndex = collection.findIndex((added) => added.id === item.id);

    if (itemIndex > -1) {
      collection.splice(itemIndex, 1);
    }

    return collection;
  }

  displayNameValue(value) {
    if (!value) {
      return '';
    }

    const values = [
      (value.first_name || '') + ' ' + (value.last_name || ''),
      value.name || '',
      value.customer_code || '',
      value.code || '',
    ];

    return values.filter((v) => v.trim() !== '').join(' - ');
  }

  dateRangeNotSet() {
    return this.searchForm?.get('checkInStart')?.value === '' || this.searchForm?.get('checkInEnd')?.value === '';
  }

  searchLogs() {
    this.searchTimeClockLogs(this.parsedSearchForm());
  }

  parsedSearchForm() {
    const formValue = this.searchForm.value;

    return {
      search: ['employee_id:' + this.addedEmployees.map((e) => e.id).join(',')].join(','),
      searchFields: 'employee_id:in',
      checkedInStart: formValue.checkInStart ? moment(formValue.checkInStart).toISOString() : '',
      checkedInEnd: formValue.checkInEnd ? moment(formValue.checkInEnd).toISOString() : '',
      peopleInsideOnly: 0,
      page: 1,
    };
  }

  searchOnlyPeopleInside() {
    this.searchQuery = {};
    this.searchForm.reset({ employee: '', employees: [], checkInStart: '', checkInEnd: '' });
    this.searchTimeClockLogs({ peopleInsideOnly: 1, page: 1 });
  }

  /**
   * @todo: validar que el usuario tenga los permisos requeridos para consultar cuantos empleados hay dentro
   */
  searchTimeClockLogs(query = {}) {
    this.searchQuery = { ...this.searchQuery, ...query };
    this.timeClockFacade.search(this.searchQuery);
    this.timeClockFacade.getStatistics();
  }

  downloadReport() {
    this.timeClockFacade.downloadReport(this.parsedSearchForm());
  }
}
