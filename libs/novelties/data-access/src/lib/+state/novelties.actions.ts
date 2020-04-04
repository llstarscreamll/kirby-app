import { Action } from '@ngrx/store';

import { User } from '@kirby/users/util';
import { Pagination } from '@kirby/shared';
import { NoveltyModel } from '@kirby/novelties/data';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data';

export enum NoveltiesActionTypes {
  SearchNovelties = '[Novelties] search',
  SearchNoveltiesOk = '[Novelties] search ok',
  SearchNoveltiesError = '[Novelties] search error',

  CreateNoveltiesToEmployees = '[Novelties] create novelties to employees ',
  CreateNoveltiesToEmployeesOk = '[Novelties] create novelties to employees ok',
  CreateNoveltiesToEmployeesError = '[Novelties] create novelties to employees error',
  ResetCreateNoveltiesToEmployees = '[Novelties] clean create novelties to employees',

  ApproveNovelty = '[Novelties] approve',
  ApproveNoveltyOk = '[Novelties] approve ok',
  ApproveNoveltyError = '[Novelties] approve error',

  SetApprovalsByEmployeeAndDateRange = '[Novelties] set approvals by employee and date range',
  SetApprovalsByEmployeeAndDateRangeOk = '[Novelties] set approvals by employee and date range ok',
  SetApprovalsByEmployeeAndDateRangeError = '[Novelties] set approvals by employee and date range error',

  DeleteNoveltyApproval = '[Novelties] delete approval',
  DeleteNoveltyApprovalOk = '[Novelties] delete approval ok',
  DeleteNoveltyApprovalError = '[Novelties] delete approval error',

  DeleteApprovalsByEmployeeAndDateRange = '[Novelties] delete approvals by employee and date range',
  DeleteApprovalsByEmployeeAndDateRangeOk = '[Novelties] delete approvals by employee and date range ok',
  DeleteApprovalsByEmployeeAndDateRangeError = '[Novelties] delete approvals by employee and date range error',

  GetNovelty = '[Novelties] get',
  GetNoveltyOk = '[Novelties] get ok',
  GetNoveltyError = '[Novelties] get error',

  GetReportByEmployee = '[Novelties] get report by employee',
  GetReportByEmployeeOk = '[Novelties] get report by employee ok',
  GetReportByEmployeeError = '[Novelties] get report by employee error',
  UpdateReportByEmployeeQuery = '[Novelties] update report by employee query',

  DownLoadNoveltiesReport = '[Novelties] download report',
  DownLoadNoveltiesReportOk = '[Novelties] download report ok',
  DownLoadNoveltiesReportError = '[Novelties] download report error',

  UpdateNovelty = '[Novelties] update',
  UpdateNoveltyOk = '[Novelties] update ok',
  UpdateNoveltyError = '[Novelties] update error',

  TrashNovelty = '[Novelties] trash',
  TrashNoveltyOk = '[Novelties] trash ok',
  TrashNoveltyError = '[Novelties] trash error',

  SearchNoveltyTypes = '[NoveltyTypes] search',
  SearchNoveltyTypesOk = '[NoveltyTypes] search ok',
  SearchNoveltyTypesError = '[NoveltyTypes] search error',

  CleanSelectedNovelty = '[Novelties] clean selected',
  CleanApiErrors = '[Novelties] clean api errors'
}

export class SearchNovelties implements Action {
  readonly type = NoveltiesActionTypes.SearchNovelties;
  public constructor(public payload: any = {}) {}
}

export class SearchNoveltiesOk implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltiesOk;
  constructor(public payload: Pagination<NoveltyModel>) {}
}

export class SearchNoveltiesError implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltiesError;
  constructor(public payload: any) {}
}

export class CreateNoveltiesToEmployees implements Action {
  readonly type = NoveltiesActionTypes.CreateNoveltiesToEmployees;
  constructor(public payload: any) {}
}

export class CreateNoveltiesToEmployeesOk implements Action {
  readonly type = NoveltiesActionTypes.CreateNoveltiesToEmployeesOk;
  constructor(public payload: any) {}
}

export class CreateNoveltiesToEmployeesError implements Action {
  readonly type = NoveltiesActionTypes.CreateNoveltiesToEmployeesError;
  constructor(public payload: any) {}
}

export class ResetCreateNoveltiesToEmployees implements Action {
  readonly type = NoveltiesActionTypes.ResetCreateNoveltiesToEmployees;
}

export class ApproveNovelty implements Action {
  readonly type = NoveltiesActionTypes.ApproveNovelty;
  constructor(public payload: { noveltyId: string; user: User }) {}
}

export class ApproveNoveltyOk implements Action {
  readonly type = NoveltiesActionTypes.ApproveNoveltyOk;
  constructor(public payload: { noveltyId: string; user: User }) {}
}

export class ApproveNoveltyError implements Action {
  readonly type = NoveltiesActionTypes.ApproveNoveltyError;
  constructor(public payload: { noveltyId: string; user: User; error: any }) {}
}

export class SetApprovalsByEmployeeAndDateRange implements Action {
  readonly type = NoveltiesActionTypes.SetApprovalsByEmployeeAndDateRange;
  constructor(
    public payload: { employeeId: string; startDate: string; endDate: string }
  ) {}
}

export class SetApprovalsByEmployeeAndDateRangeOk implements Action {
  readonly type = NoveltiesActionTypes.SetApprovalsByEmployeeAndDateRangeOk;
  constructor(public payload: any) {}
}

export class SetApprovalsByEmployeeAndDateRangeError implements Action {
  readonly type = NoveltiesActionTypes.SetApprovalsByEmployeeAndDateRangeError;
  constructor(
    public payload: {
      employeeId: string;
      startDate: string;
      endDate: string;
      error: any;
    }
  ) {}
}

export class DeleteNoveltyApproval implements Action {
  readonly type = NoveltiesActionTypes.DeleteNoveltyApproval;
  constructor(public payload: { noveltyId: string; user: User }) {}
}

export class DeleteNoveltyApprovalOk implements Action {
  readonly type = NoveltiesActionTypes.DeleteNoveltyApprovalOk;
  constructor(public payload: { noveltyId: string; user: User }) {}
}

export class DeleteNoveltyApprovalError implements Action {
  readonly type = NoveltiesActionTypes.DeleteNoveltyApprovalError;
  constructor(public payload: { noveltyId: string; user: User; error: any }) {}
}

export class DeleteApprovalsByEmployeeAndDateRange implements Action {
  readonly type = NoveltiesActionTypes.DeleteApprovalsByEmployeeAndDateRange;
  constructor(
    public payload: { employeeId: string; startDate: string; endDate: string }
  ) {}
}

export class DeleteApprovalsByEmployeeAndDateRangeOk implements Action {
  readonly type = NoveltiesActionTypes.DeleteApprovalsByEmployeeAndDateRangeOk;
  constructor(public payload: any) {}
}

export class DeleteApprovalsByEmployeeAndDateRangeError implements Action {
  readonly type = NoveltiesActionTypes.DeleteApprovalsByEmployeeAndDateRangeError;
  constructor(
    public payload: {
      employeeId: string;
      startDate: string;
      endDate: string;
      error: any;
    }
  ) {}
}


export class GetNovelty implements Action {
  readonly type = NoveltiesActionTypes.GetNovelty;
  constructor(public payload: any) {}
}

export class GetNoveltyOk implements Action {
  readonly type = NoveltiesActionTypes.GetNoveltyOk;
  constructor(public payload: NoveltyModel) {}
}

export class GetNoveltyError implements Action {
  readonly type = NoveltiesActionTypes.GetNoveltyError;
  constructor(public payload: any) {}
}

export class GetReportByEmployee implements Action {
  readonly type = NoveltiesActionTypes.GetReportByEmployee;
  constructor(
    public payload: {
      employee_id: string;
      start_date: string;
      end_date: string;
    }
  ) {}
}

export class GetReportByEmployeeOk implements Action {
  readonly type = NoveltiesActionTypes.GetReportByEmployeeOk;
  constructor(public payload: any[]) {}
}

export class GetReportByEmployeeError implements Action {
  readonly type = NoveltiesActionTypes.GetReportByEmployeeError;
  constructor(public payload: any) {}
}

export class DownLoadNoveltiesReport implements Action {
  readonly type = NoveltiesActionTypes.DownLoadNoveltiesReport;
  constructor(
    public payload: {
      employee_id?: string;
      start_date: string;
      end_date: string;
    }
  ) {}
}

export class DownLoadNoveltiesReportOk implements Action {
  readonly type = NoveltiesActionTypes.DownLoadNoveltiesReportOk;
  constructor(public payload: any[]) {}
}

export class DownLoadNoveltiesReportError implements Action {
  readonly type = NoveltiesActionTypes.DownLoadNoveltiesReportError;
  constructor(public payload: any) {}
}

export class UpdateReportByEmployeeQuery implements Action {
  readonly type = NoveltiesActionTypes.UpdateReportByEmployeeQuery;
  constructor(
    public payload: {
      employee_id: string;
      start_date: string;
      end_date: string;
    }
  ) {}
}

export class UpdateNovelty implements Action {
  readonly type = NoveltiesActionTypes.UpdateNovelty;
  constructor(public payload: { id: string; noveltyData: any }) {}
}

export class UpdateNoveltyOk implements Action {
  readonly type = NoveltiesActionTypes.UpdateNoveltyOk;
  constructor(public payload: { id: string; noveltyData: any }) {}
}

export class UpdateNoveltyError implements Action {
  readonly type = NoveltiesActionTypes.UpdateNoveltyError;
  constructor(public payload: { id: string; noveltyData: any; error: any }) {}
}

export class TrashNovelty implements Action {
  readonly type = NoveltiesActionTypes.TrashNovelty;
  constructor(public payload: string) {}
}

export class TrashNoveltyOk implements Action {
  readonly type = NoveltiesActionTypes.TrashNoveltyOk;
  constructor(public payload: string) {}
}

export class TrashNoveltyError implements Action {
  readonly type = NoveltiesActionTypes.TrashNoveltyError;
  constructor(public payload: { id: string; error: any }) {}
}

export class SearchNoveltyTypes implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltyTypes;
  public constructor(public payload: any = {}) {}
}

export class SearchNoveltyTypesOk implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltyTypesOk;
  constructor(public payload: Pagination<NoveltyTypeInterface>) {}
}

export class SearchNoveltyTypesError implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltyTypesError;
  constructor(public payload: any) {}
}

export class CleanSelectedNovelty implements Action {
  readonly type = NoveltiesActionTypes.CleanSelectedNovelty;
}

export class CleanApiErrors implements Action {
  readonly type = NoveltiesActionTypes.CleanApiErrors;
}

export type NoveltiesAction =
  | SearchNovelties
  | SearchNoveltiesOk
  | SearchNoveltiesError
  | CreateNoveltiesToEmployees
  | CreateNoveltiesToEmployeesOk
  | CreateNoveltiesToEmployeesError
  | ApproveNovelty
  | ApproveNoveltyOk
  | ApproveNoveltyError
  | SetApprovalsByEmployeeAndDateRange
  | SetApprovalsByEmployeeAndDateRangeOk
  | SetApprovalsByEmployeeAndDateRangeError
  | DeleteNoveltyApproval
  | DeleteNoveltyApprovalOk
  | DeleteNoveltyApprovalError
  | DeleteApprovalsByEmployeeAndDateRange
  | DeleteApprovalsByEmployeeAndDateRangeOk
  | DeleteApprovalsByEmployeeAndDateRangeError
  | GetNovelty
  | GetNoveltyOk
  | GetNoveltyError
  | GetReportByEmployee
  | GetReportByEmployeeOk
  | GetReportByEmployeeError
  | UpdateReportByEmployeeQuery
  | DownLoadNoveltiesReport
  | DownLoadNoveltiesReportOk
  | DownLoadNoveltiesReportError
  | UpdateNovelty
  | UpdateNoveltyOk
  | UpdateNoveltyError
  | TrashNovelty
  | TrashNoveltyOk
  | TrashNoveltyError
  | SearchNoveltyTypes
  | SearchNoveltyTypesOk
  | SearchNoveltyTypesError
  | CleanSelectedNovelty
  | CleanApiErrors
  | ResetCreateNoveltiesToEmployees;

export const fromNoveltiesActions = {
  SearchNovelties,
  SearchNoveltiesOk,
  SearchNoveltiesError,
  CreateNoveltiesToEmployees,
  CreateNoveltiesToEmployeesOk,
  CreateNoveltiesToEmployeesError,
  ApproveNovelty,
  ApproveNoveltyOk,
  ApproveNoveltyError,
  SetApprovalsByEmployeeAndDateRange,
  SetApprovalsByEmployeeAndDateRangeOk,
  SetApprovalsByEmployeeAndDateRangeError,
  DeleteNoveltyApproval,
  DeleteNoveltyApprovalOk,
  DeleteNoveltyApprovalError,
  DeleteApprovalsByEmployeeAndDateRange,
  DeleteApprovalsByEmployeeAndDateRangeOk,
  DeleteApprovalsByEmployeeAndDateRangeError,
  GetNovelty,
  GetNoveltyOk,
  GetNoveltyError,
  GetReportByEmployee,
  GetReportByEmployeeOk,
  GetReportByEmployeeError,
  UpdateReportByEmployeeQuery,
  DownLoadNoveltiesReport,
  DownLoadNoveltiesReportOk,
  DownLoadNoveltiesReportError,
  UpdateNovelty,
  UpdateNoveltyOk,
  UpdateNoveltyError,
  TrashNovelty,
  TrashNoveltyOk,
  TrashNoveltyError,
  SearchNoveltyTypes,
  SearchNoveltyTypesOk,
  SearchNoveltyTypesError,
  CleanSelectedNovelty,
  CleanApiErrors,
  ResetCreateNoveltiesToEmployees
};
