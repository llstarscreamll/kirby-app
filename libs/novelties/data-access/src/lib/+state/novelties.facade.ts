import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { User } from '@kirby/users/util';

import * as a from './novelties.actions';
import { noveltiesQuery } from './novelties.selectors';
import { NoveltiesPartialState } from './novelties.reducer';

@Injectable()
export class NoveltiesFacade {
  error$ = this.store.pipe(select(noveltiesQuery.getError));
  loaded$ = this.store.pipe(select(noveltiesQuery.getLoaded));
  paginatedNovelties$ = this.store.pipe(select(noveltiesQuery.getPaginatedList));
  selectedNovelty$ = this.store.pipe(select(noveltiesQuery.getSelectedNovelty));
  reportByEmployee$ = this.store.pipe(select(noveltiesQuery.getReportByEmployee));
  paginatedNoveltyTypes$ = this.store.pipe(select(noveltiesQuery.getPaginatedNoveltyTypesList));
  createNoveltiesToEmployeesStatus$ = this.store.pipe(select(noveltiesQuery.getCreateNoveltiesToEmployeesStatus));
  resumeByEmployeesAndNoveltyTypes$ = this.store.pipe(select(noveltiesQuery.getResumeByEmployeesAndNoveltyTypes));

  constructor(private store: Store<NoveltiesPartialState>) {}

  search(query: any = {}) {
    this.store.dispatch(a.Search({ payload: query }));
  }

  get(noveltyId: string) {
    this.store.dispatch(a.Get({ payload: noveltyId }));
  }

  cleanNoveltiesSearch() {
    this.store.dispatch(a.CleanErrors());
    this.store.dispatch(a.SearchOk({ payload: null }));
  }

  update(noveltyId: string, noveltyData) {
    this.store.dispatch(a.Edit({ payload: { id: noveltyId, noveltyData } }));
  }

  trash(noveltyId: string) {
    this.store.dispatch(a.Trash({ payload: noveltyId }));
  }

  createNoveltiesToEmployees(data) {
    this.store.dispatch(a.Create({ payload: data }));
  }

  createBalanceNovelty(data) {
    this.store.dispatch(a.CreateBalance({ payload: data }));
  }

  /**
   * @todo move all related stuff from novelty types to specific lib
   * @param query
   */
  searchNoveltyTypes(query: any = {}) {
    this.store.dispatch(a.SearchNoveltyTypes({ payload: query }));
  }

  cleanSelected() {
    this.store.dispatch(a.CleanSelected());
  }

  resetCreateNoveltiesToEmployees() {
    this.store.dispatch(a.ResetCreate());
  }

  cleanApiErrors() {
    this.store.dispatch(a.CleanErrors());
  }

  approve(noveltyId: string, user: User) {
    this.store.dispatch(a.Approve({ payload: { noveltyId, user } }));
  }

  setApprovalsByEmployeeAndDateRange(employeeId: string, startDate: string, endDate: string) {
    this.store.dispatch(a.SetApprovals({ payload: { employeeId, startDate, endDate } }));
  }

  deleteNoveltyApproval(noveltyId: string, user: User) {
    this.store.dispatch(a.DeleteApproval({ payload: { noveltyId, user } }));
  }

  deleteApprovalsByEmployeeAndDateRange(employeeId: string, startDate: string, endDate: string) {
    this.store.dispatch(
      a.DeleteApprovals({
        payload: {
          employeeId,
          startDate,
          endDate,
        },
      })
    );
  }

  downloadReport(query: { employee_id?: string; start_date: string; end_date: string }) {
    this.store.dispatch(a.DownLoadReport({ payload: query }));
  }

  getResumeByEmployeesAndNoveltyTypes(query) {
    this.store.dispatch(a.GetResume({ payload: query }));
  }

  exportNoveltiesResume(query) {
    this.store.dispatch(a.ExportResume({ payload: query }));
  }
}
