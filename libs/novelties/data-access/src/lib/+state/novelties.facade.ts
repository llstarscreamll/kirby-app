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
  GetReportByEmployee,
  GetReportByEmployeeOk,
  UpdateReportByEmployeeQuery,
  SetApprovalsByEmployeeAndDateRange,
  DeleteApprovalsByEmployeeAndDateRange,
  DownLoadNoveltiesReport
} from './novelties.actions';
import { User } from '@kirby/users/util/src';

@Injectable()
export class NoveltiesFacade {
  public loaded$ = this.store.pipe(select(noveltiesQuery.getLoaded));
  public error$ = this.store.pipe(select(noveltiesQuery.getError));
  public createNoveltiesToEmployeesStatus$ = this.store.pipe(
    select(noveltiesQuery.getCreateNoveltiesToEmployeesStatus)
  );
  public paginatedNovelties$ = this.store.pipe(
    select(noveltiesQuery.getPaginatedList)
  );
  public paginatedNoveltyTypes$ = this.store.pipe(
    select(noveltiesQuery.getPaginatedNoveltyTypesList)
  );
  public selectedNovelty$ = this.store.pipe(
    select(noveltiesQuery.getSelectedNovelty)
  );
  public reportByEmployee$ = this.store.pipe(
    select(noveltiesQuery.getReportByEmployee)
  );

  public constructor(private store: Store<NoveltiesPartialState>) {}

  public search(query: any = {}) {
    this.store.dispatch(new SearchNovelties(query));
  }

  public get(noveltyId: string) {
    this.store.dispatch(new GetNovelty(noveltyId));
  }

  public getReportByEmployee(
    employeeId: string,
    startDate: string,
    endDate: string
  ) {
    this.store.dispatch(
      new GetReportByEmployee({
        employee_id: employeeId,
        start_date: startDate,
        end_date: endDate
      })
    );
  }

  public updateReportByEmployeeQuery(query: any) {
    this.store.dispatch(new UpdateReportByEmployeeQuery(query));
  }

  cleanReportByEmployee() {
    this.store.dispatch(new CleanApiErrors());
    this.store.dispatch(new GetReportByEmployeeOk(null));
  }

  public update(noveltyId: string, noveltyData) {
    this.store.dispatch(new UpdateNovelty({ id: noveltyId, noveltyData }));
  }

  public trash(noveltyId: string) {
    this.store.dispatch(new TrashNovelty(noveltyId));
  }

  public createNoveltiesToEmployees(data) {
    this.store.dispatch(new CreateNoveltiesToEmployees(data));
  }

  /**
   * @todo move all related stuff from novelty types to specific lib
   * @param query
   */
  public searchNoveltyTypes(query: any = {}) {
    this.store.dispatch(new SearchNoveltyTypes(query));
  }

  public cleanSelected() {
    this.store.dispatch(new CleanSelectedNovelty());
  }

  public resetCreateNoveltiesToEmployees() {
    this.store.dispatch(new ResetCreateNoveltiesToEmployees());
  }

  public cleanApiErrors() {
    this.store.dispatch(new CleanApiErrors());
  }

  public approve(noveltyId: string, user: User) {
    this.store.dispatch(new ApproveNovelty({ noveltyId, user }));
  }

  public setApprovalsByEmployeeAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string
  ) {
    this.store.dispatch(
      new SetApprovalsByEmployeeAndDateRange({ employeeId, startDate, endDate })
    );
  }

  public deleteNoveltyApproval(noveltyId: string, user: User) {
    this.store.dispatch(new DeleteNoveltyApproval({ noveltyId, user }));
  }

  public deleteApprovalsByEmployeeAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string
  ) {
    this.store.dispatch(
      new DeleteApprovalsByEmployeeAndDateRange({
        employeeId,
        startDate,
        endDate
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
}
