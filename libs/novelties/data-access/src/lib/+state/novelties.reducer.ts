import { get } from 'lodash-es';
import { createReducer, on } from '@ngrx/store';

import { User } from '@kirby/users/util';
import { NoveltyModel } from '@kirby/novelties/data';
import { INoveltyType } from '@kirby/novelty-types/data';
import { EmployeeInterface } from '@kirby/employees/util';
import { Pagination, emptyPagination, LoadStatus } from '@kirby/shared';

import * as a from './novelties.actions';

export const NOVELTIES_FEATURE_KEY = 'novelties';

export interface NoveltiesState {
  paginatedList: Pagination<NoveltyModel>;
  resumeByEmployeesAndNoveltyTypes?: Pagination<EmployeeInterface>;
  paginatedNoveltyTypesList: Pagination<INoveltyType>;
  selected?: NoveltyModel;
  loaded: boolean;
  createNoveltiesToEmployeesStatus: LoadStatus;
  error?: any;
}

export interface NoveltiesPartialState {
  readonly [NOVELTIES_FEATURE_KEY]: NoveltiesState;
}

export const initialState: NoveltiesState = {
  paginatedList: emptyPagination(),
  paginatedNoveltyTypesList: emptyPagination(),
  loaded: false,
  createNoveltiesToEmployeesStatus: null,
};

export const noveltiesReducer = createReducer(
  initialState,
  on(a.SearchOk, (state, action) => ({ ...state, paginatedList: action.payload, loaded: true })),
  on(a.SearchError, (state, action) => ({ ...state, error: action.payload })),
  on(a.GetResumeOk, (state, action) => ({ ...state, resumeByEmployeesAndNoveltyTypes: action.payload })),
  on(a.GetResumeError, (state, action) => ({ ...state, error: action.payload })),
  on(a.Create, (state) => ({ ...state, createNoveltiesToEmployeesStatus: LoadStatus.Loading })),
  on(a.CreateBalanceOk, (state) => ({ ...state, error: null })),
  on(a.CreateBalanceError, (state, action) => ({ ...state, error: action.payload })),
  on(a.CreateOk, (state) => ({
    ...state,
    createNoveltiesToEmployeesStatus: LoadStatus.Completed,
  })),
  on(a.CreateError, (state, action) => ({
    ...state,
    error: action.payload,
    createNoveltiesToEmployeesStatus: LoadStatus.Error,
  })),
  on(a.EditError, (state, action) => ({
    ...state,
    error: action.payload.error,
  })),
  on(a.Approve, (state, action) => ({
    ...state,
    paginatedList: appendApproverToEntity(state.paginatedList, action.payload.noveltyId, action.payload.user),
  })),
  on(a.ApproveError, (state, action) => ({
    ...state,
    paginatedList: removeApproverToEntity(state.paginatedList, action.payload.noveltyId, action.payload.user),
  })),
  on(a.Trash, (state) => ({
    ...state,
    createNoveltiesToEmployeesStatus: LoadStatus.Loading,
  })),
  on(a.TrashOk, (state) => ({
    ...state,
    selected: null,
  })),
  on(a.TrashError, (state, action) => ({
    ...state,
    error: action.payload.error,
  })),
  on(a.DeleteApproval, (state, action) => ({
    ...state,
    paginatedList: removeApproverToEntity(state.paginatedList, action.payload.noveltyId, action.payload.user),
  })),
  on(a.DeleteApprovalError, (state, action) => ({
    ...state,
    paginatedList: appendApproverToEntity(state.paginatedList, action.payload.noveltyId, action.payload.user),
  })),
  on(a.Get, (state) => ({ ...state, error: null })),
  on(a.GetOk, (state, action) => ({ ...state, selected: action.payload })),
  on(a.GetError, (state, action) => ({ ...state, error: action.payload })),
  on(a.SearchNoveltyTypesOk, (state, action) => ({ ...state, paginatedNoveltyTypesList: action.payload })),
  on(a.CleanSelected, (state) => ({ ...state, selected: null })),
  on(a.CleanErrors, (state) => ({ ...state, error: null })),
  on(a.ResetCreate, (state) => ({ ...state, error: null, createNoveltiesToEmployeesStatus: null }))
);

function appendApproverToEntity(paginatedTimeClockLogs: Pagination<any>, entityId: string, approver: User) {
  let entities: any[] = get(paginatedTimeClockLogs, 'data', []);

  entities = entities.map((item) => {
    const approvals = item.id === entityId ? [...item.approvals, approver] : item.approvals;

    return { ...item, approvals };
  });

  return { ...paginatedTimeClockLogs, data: entities };
}

function removeApproverToEntity(paginatedEntities: Pagination<any>, entityId: string, approver: User) {
  let entities: any[] = get(paginatedEntities, 'data', []);

  entities = entities.map((item) => {
    const approvals = item.id === entityId ? item.approvals.filter((a) => a.id !== approver.id) : item.approvals;

    return { ...item, approvals };
  });

  return { ...paginatedEntities, data: entities };
}
