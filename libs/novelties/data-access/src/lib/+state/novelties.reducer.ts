import { get } from 'lodash';

import { User } from '@kirby/users/util';
import { NoveltyModel } from '@kirby/novelties/data';
import { INoveltyType } from '@kirby/novelty-types/data';
import { EmployeeInterface } from '@kirby/employees/util';
import { Pagination, emptyPagination, LoadStatuses } from '@kirby/shared';
import { NoveltiesAction, NoveltiesActionTypes } from './novelties.actions';

export const NOVELTIES_FEATURE_KEY = 'novelties';

export interface NoveltiesState {
  paginatedList: Pagination<NoveltyModel>;
  resumeByEmployeesAndNoveltyTypes?: Pagination<EmployeeInterface>;
  paginatedNoveltyTypesList: Pagination<INoveltyType>;
  selected?: NoveltyModel;
  loaded: boolean;
  createNoveltiesToEmployeesStatus: LoadStatuses;
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

export function noveltiesReducer(
  state: NoveltiesState = initialState,
  action: NoveltiesAction
): NoveltiesState {
  switch (action.type) {
    case NoveltiesActionTypes.SearchNoveltiesOk: {
      state = { ...state, paginatedList: action.payload, loaded: true };
      break;
    }

    case NoveltiesActionTypes.SearchNoveltiesError: {
      state = { ...state, error: action.payload };
      break;
    }

    case NoveltiesActionTypes.GetResumeOk: {
      state = { ...state, resumeByEmployeesAndNoveltyTypes: action.payload };
      break;
    }

    case NoveltiesActionTypes.GetResumeError: {
      state = { ...state, error: action.payload };
      break;
    }

    case NoveltiesActionTypes.CreateNoveltiesToEmployees: {
      state = {
        ...state,
        createNoveltiesToEmployeesStatus: LoadStatuses.Loading,
      };
      break;
    }

    case NoveltiesActionTypes.CreateBalanceNoveltyOk: {
      state = {
        ...state,
        error: null,
      };
      break;
    }

    case NoveltiesActionTypes.CreateBalanceNoveltyError: {
      state = {
        ...state,
        error: action.payload,
      };
      break;
    }

    case NoveltiesActionTypes.CreateNoveltiesToEmployeesOk: {
      state = {
        ...state,
        createNoveltiesToEmployeesStatus: LoadStatuses.Completed,
      };
      break;
    }

    case NoveltiesActionTypes.CreateNoveltiesToEmployeesError: {
      state = {
        ...state,
        error: action.payload,
        createNoveltiesToEmployeesStatus: LoadStatuses.Error,
      };
      break;
    }

    case NoveltiesActionTypes.ApproveNovelty: {
      state = {
        ...state,
        paginatedList: appendApproverToEntity(
          state.paginatedList,
          action.payload.noveltyId,
          action.payload.user
        ),
      };
      break;
    }

    case NoveltiesActionTypes.ApproveNoveltyError: {
      state = {
        ...state,
        paginatedList: removeApproverToEntity(
          state.paginatedList,
          action.payload.noveltyId,
          action.payload.user
        ),
      };
      break;
    }

    case NoveltiesActionTypes.TrashNovelty: {
      state = {
        ...state,
        createNoveltiesToEmployeesStatus: LoadStatuses.Loading,
      };
      break;
    }

    case NoveltiesActionTypes.TrashNoveltyOk: {
      state = {
        ...state,
        selected: null,
      };
      break;
    }

    case NoveltiesActionTypes.TrashNoveltyError: {
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    }

    case NoveltiesActionTypes.DeleteNoveltyApproval: {
      state = {
        ...state,
        paginatedList: removeApproverToEntity(
          state.paginatedList,
          action.payload.noveltyId,
          action.payload.user
        ),
      };
      break;
    }

    case NoveltiesActionTypes.DeleteNoveltyApprovalError: {
      state = {
        ...state,
        paginatedList: appendApproverToEntity(
          state.paginatedList,
          action.payload.noveltyId,
          action.payload.user
        ),
      };
      break;
    }

    case NoveltiesActionTypes.GetNovelty: {
      state = { ...state, error: null };
      break;
    }

    case NoveltiesActionTypes.GetNoveltyOk: {
      state = { ...state, selected: action.payload };
      break;
    }

    case NoveltiesActionTypes.GetNoveltyError: {
      state = { ...state, error: action.payload };
      break;
    }

    case NoveltiesActionTypes.SearchNoveltyTypesOk: {
      state = { ...state, paginatedNoveltyTypesList: action.payload };
      break;
    }

    case NoveltiesActionTypes.CleanSelectedNovelty: {
      state = { ...state, selected: null };
      break;
    }

    case NoveltiesActionTypes.CleanApiErrors: {
      state = { ...state, error: null };
      break;
    }

    case NoveltiesActionTypes.ResetCreateNoveltiesToEmployees: {
      state = { ...state, error: null, createNoveltiesToEmployeesStatus: null };
      break;
    }
  }
  return state;
}

function appendApproverToEntity(
  paginatedTimeClockLogs: Pagination<any>,
  entityId: string,
  approver: User
) {
  let entities: any[] = get(paginatedTimeClockLogs, 'data', []);

  entities = entities.map((item) => {
    const approvals =
      item.id === entityId ? [...item.approvals, approver] : item.approvals;

    return { ...item, approvals };
  });

  return { ...paginatedTimeClockLogs, data: entities };
}

function removeApproverToEntity(
  paginatedEntities: Pagination<any>,
  entityId: string,
  approver: User
) {
  let entities: any[] = get(paginatedEntities, 'data', []);

  entities = entities.map((item) => {
    const approvals =
      item.id === entityId
        ? item.approvals.filter((a) => a.id !== approver.id)
        : item.approvals;

    return { ...item, approvals };
  });

  return { ...paginatedEntities, data: entities };
}
