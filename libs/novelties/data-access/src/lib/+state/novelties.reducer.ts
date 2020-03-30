import { get } from 'lodash';

import { NoveltiesAction, NoveltiesActionTypes } from './novelties.actions';
import { NoveltyModel } from '@kirby/novelties/data';
import { Pagination, emptyPagination, LoadStatuses } from '@kirby/shared';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data';
import { User } from '@kirby/users/util';

export const NOVELTIES_FEATURE_KEY = 'novelties';

/**
 * Interface for the 'Novelties' data used in
 *  - NoveltiesState, and
 *  - noveltiesReducer
 *
 *  Note: replace if already defined in another module
 * @todo: delete this empty interface
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface NoveltiesState {
  paginatedList: Pagination<NoveltyModel>;
  paginatedNoveltyTypesList: Pagination<NoveltyTypeInterface>;
  selected?: NoveltyModel;
  reportByEmployee?: any[];
  reportByEmployeeQuery?: { employee_id; start_date; end_date };
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
  createNoveltiesToEmployeesStatus: null
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

    case NoveltiesActionTypes.CreateNoveltiesToEmployees: {
      state = {
        ...state,
        createNoveltiesToEmployeesStatus: LoadStatuses.Loading
      };
      break;
    }

    case NoveltiesActionTypes.CreateNoveltiesToEmployeesOk: {
      state = {
        ...state,
        createNoveltiesToEmployeesStatus: LoadStatuses.Completed
      };
      break;
    }

    case NoveltiesActionTypes.CreateNoveltiesToEmployeesError: {
      state = {
        ...state,
        error: action.payload,
        createNoveltiesToEmployeesStatus: LoadStatuses.Error
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
        )
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
        )
      };
      break;
    }

    case NoveltiesActionTypes.TrashNovelty: {
      state = {
        ...state,
        createNoveltiesToEmployeesStatus: LoadStatuses.Loading
      };
      break;
    }

    case NoveltiesActionTypes.TrashNoveltyOk: {
      state = {
        ...state,
        selected: null
      };
      break;
    }

    case NoveltiesActionTypes.TrashNoveltyError: {
      state = {
        ...state,
        error: action.payload.error
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
        )
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
        )
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

    case NoveltiesActionTypes.GetReportByEmployee: {
      state = { ...state, error: null };
      break;
    }
    
    case NoveltiesActionTypes.GetReportByEmployeeOk: {
      state = { ...state, reportByEmployee: action.payload };
      break;
    }

    case NoveltiesActionTypes.GetReportByEmployeeError: {
      state = { ...state, error: action.payload };
      break;
    }

    case NoveltiesActionTypes.UpdateReportByEmployeeQuery: {
      state = { ...state, reportByEmployeeQuery: action.payload };
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

  entities = entities.map(item => {
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

  entities = entities.map(item => {
    const approvals =
      item.id === entityId
        ? item.approvals.filter(a => a.id !== approver.id)
        : item.approvals;

    return { ...item, approvals };
  });

  return { ...paginatedEntities, data: entities };
}
