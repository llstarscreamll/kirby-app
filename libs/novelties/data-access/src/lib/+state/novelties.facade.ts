import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { noveltiesQuery } from './novelties.selectors';
import { NoveltiesPartialState } from './novelties.reducer';
import {
  SearchNovelties,
  GetNovelty,
  SearchNoveltyTypes,
  UpdateNovelty,
  CleanSelectedNovelty,
  CreateNoveltiesToEmployees,
  CleanApiErrors,
  ResetCreateNoveltiesToEmployees,
  ApproveNovelty,
  DeleteNoveltyApproval,
  TrashNovelty,
  SetApprovalsByEmployeeAndDateRange,
  DeleteApprovalsByEmployeeAndDateRange,
  DownLoadNoveltiesReport,
  SearchNoveltiesOk,
  GetResume,
  CreateBalanceNovelty,
  ExportResume,
} from './novelties.actions';
import { User } from '@kirby/users/util';

@Injectable()
export class NoveltiesFacade {
  loaded$ = this.store.pipe(select(noveltiesQuery.getLoaded));
  error$ = this.store.pipe(select(noveltiesQuery.getError));
  createNoveltiesToEmployeesStatus$ = this.store.pipe(
    select(noveltiesQuery.getCreateNoveltiesToEmployeesStatus)
  );
  paginatedNovelties$ = this.store.pipe(
    select(noveltiesQuery.getPaginatedList)
  );
  paginatedNoveltyTypes$ = this.store.pipe(
    select(noveltiesQuery.getPaginatedNoveltyTypesList)
  );
  selectedNovelty$ = this.store.pipe(select(noveltiesQuery.getSelectedNovelty));
  reportByEmployee$ = this.store.pipe(
    select(noveltiesQuery.getReportByEmployee)
  );

  resumeByEmployeesAndNoveltyTypes$ = this.store.pipe(
    select(noveltiesQuery.getResumeByEmployeesAndNoveltyTypes)
  );

  constructor(private store: Store<NoveltiesPartialState>) {}

  search(query: any = {}) {
    this.store.dispatch(new SearchNovelties(query));
  }

  get(noveltyId: string) {
    this.store.dispatch(new GetNovelty(noveltyId));
  }

  cleanNoveltiesSearch() {
    this.store.dispatch(new CleanApiErrors());
    this.store.dispatch(new SearchNoveltiesOk(null));
  }

  update(noveltyId: string, noveltyData) {
    this.store.dispatch(new UpdateNovelty({ id: noveltyId, noveltyData }));
  }

  trash(noveltyId: string) {
    this.store.dispatch(new TrashNovelty(noveltyId));
  }

  createNoveltiesToEmployees(data) {
    this.store.dispatch(new CreateNoveltiesToEmployees(data));
  }

  createBalanceNovelty(data) {
    this.store.dispatch(new CreateBalanceNovelty(data));
  }

  /**
   * @todo move all related stuff from novelty types to specific lib
   * @param query
   */
  searchNoveltyTypes(query: any = {}) {
    this.store.dispatch(new SearchNoveltyTypes(query));
  }

  cleanSelected() {
    this.store.dispatch(new CleanSelectedNovelty());
  }

  resetCreateNoveltiesToEmployees() {
    this.store.dispatch(new ResetCreateNoveltiesToEmployees());
  }

  cleanApiErrors() {
    this.store.dispatch(new CleanApiErrors());
  }

  approve(noveltyId: string, user: User) {
    this.store.dispatch(new ApproveNovelty({ noveltyId, user }));
  }

  setApprovalsByEmployeeAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string
  ) {
    this.store.dispatch(
      new SetApprovalsByEmployeeAndDateRange({ employeeId, startDate, endDate })
    );
  }

  deleteNoveltyApproval(noveltyId: string, user: User) {
    this.store.dispatch(new DeleteNoveltyApproval({ noveltyId, user }));
  }

  deleteApprovalsByEmployeeAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string
  ) {
    this.store.dispatch(
      new DeleteApprovalsByEmployeeAndDateRange({
        employeeId,
        startDate,
        endDate,
      })
    );
  }

  downloadReport(query: {
    employee_id?: string;
    start_date: string;
    end_date: string;
  }) {
    this.store.dispatch(new DownLoadNoveltiesReport(query));
  }

  getResumeByEmployeesAndNoveltyTypes(query) {
    this.store.dispatch(new GetResume(query));
  }

  exportNoveltiesResume(query) {
    this.store.dispatch(new ExportResume(query));
  }
}
