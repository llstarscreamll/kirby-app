import { createAction, props } from '@ngrx/store';

import { User } from '@kirby/users/util';
import { Pagination } from '@kirby/shared';
import { NoveltyModel } from '@kirby/novelties/data';
import { NoveltyType } from '@kirby/novelty-types/data';

export const Search = createAction('Novelties: search', props<{ payload: any }>());
export const SearchOk = createAction('Novelties: search ok', props<{ payload: Pagination<NoveltyModel> }>());
export const SearchError = createAction('Novelties: search error', props<{ payload: any }>());

export const Create = createAction('Novelties: create', props<{ payload: any }>());
export const CreateOk = createAction('Novelties: create ok', props<{ payload: any }>());
export const CreateError = createAction('Novelties: create error', props<{ payload: any }>());
export const ResetCreate = createAction('Novelties: clean create');

export const CreateBalance = createAction(
  'Novelties: create balance ',
  props<{ payload: { employee_id: string; start_date: Date; time: number; comment: string } }>()
);
export const CreateBalanceOk = createAction('Novelties: create balance ok', props<{ payload: any }>());
export const CreateBalanceError = createAction('Novelties: create balance error', props<{ payload: any }>());

export const Approve = createAction('Novelties: approve', props<{ payload: { noveltyId: string; user: User } }>());
export const ApproveOk = createAction('Novelties: approve ok', props<{ payload: { noveltyId: string; user: User } }>());
export const ApproveError = createAction(
  'Novelties: approve error',
  props<{ payload: { noveltyId: string; user: User; error: any } }>()
);

export const SetApprovals = createAction(
  'Novelties: set approvals',
  props<{ payload: { employeeId: string; startDate: string; endDate: string } }>()
);
export const SetApprovalsOk = createAction('Novelties: set approvals ok', props<{ payload: any }>());
export const SetApprovalsError = createAction(
  'Novelties: set approvals error',
  props<{ payload: { employeeId: string; startDate: string; endDate: string; error: any } }>()
);

export const DeleteApproval = createAction(
  'Novelties: delete approval',
  props<{ payload: { noveltyId: string; user: User } }>()
);
export const DeleteApprovalOk = createAction(
  'Novelties: delete approval ok',
  props<{ payload: { noveltyId: string; user: User } }>()
);
export const DeleteApprovalError = createAction(
  'Novelties: delete approval error',
  props<{ payload: { noveltyId: string; user: User; error: any } }>()
);

export const DeleteApprovals = createAction(
  'Novelties: delete approvals',
  props<{ payload: { employeeId: string; startDate: string; endDate: string } }>()
);
export const DeleteApprovalsOk = createAction('Novelties: delete approvals ok', props<{ payload: any }>());
export const DeleteApprovalsError = createAction(
  'Novelties: delete approvals error',
  props<{ payload: { employeeId: string; startDate: string; endDate: string; error: any } }>()
);

export const Get = createAction('Novelties: get', props<{ payload: any }>());
export const GetOk = createAction('Novelties: get ok', props<{ payload: NoveltyModel }>());
export const GetError = createAction('Novelties: get error', props<{ payload: any }>());

export const DownLoadReport = createAction(
  'Novelties: download report',
  props<{ payload: { employee_id?: string; start_date: string; end_date: string } }>()
);
export const DownLoadReportOk = createAction('Novelties: download report ok', props<{ payload: any[] }>());
export const DownLoadReportError = createAction('Novelties: download report error', props<{ payload: any }>());

export const GetResume = createAction('Novelties: get resume', props<{ payload: any }>());
export const GetResumeOk = createAction('Novelties: get resume ok', props<{ payload: Pagination<any> }>());
export const GetResumeError = createAction('Novelties: get resume error', props<{ payload: any }>());

export const ExportResume = createAction('Novelties: export resume', props<{ payload: any }>());
export const ExportResumeOk = createAction('Novelties: export resume ok', props<{ payload: Pagination<any> }>());
export const ExportResumeError = createAction('Novelties: export resume error', props<{ payload: any }>());

export const Edit = createAction('Novelties: update', props<{ payload: { id: string; noveltyData: any } }>());
export const EditOk = createAction('Novelties: update ok', props<{ payload: { id: string; noveltyData: any } }>());
export const EditError = createAction(
  'Novelties: update error',
  props<{ payload: { id: string; noveltyData: any; error: any } }>()
);

export const Trash = createAction('Novelties: trash', props<{ payload: string }>());
export const TrashOk = createAction('Novelties: trash ok', props<{ payload: string }>());
export const TrashError = createAction('Novelties: trash error', props<{ payload: { id: string; error: any } }>());

export const SearchNoveltyTypes = createAction('NoveltyTypes: search', props<{ payload: any }>());
export const SearchNoveltyTypesOk = createAction(
  'NoveltyTypes: search ok',
  props<{ payload: Pagination<NoveltyType> }>()
);
export const SearchNoveltyTypesError = createAction('NoveltyTypes: search error', props<{ payload: any }>());

export const CleanSelected = createAction('Novelties: clean selected');
export const CleanErrors = createAction('Novelties: clean errors');
