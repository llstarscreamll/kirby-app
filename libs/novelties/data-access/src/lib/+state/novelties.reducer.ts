import { NoveltiesAction, NoveltiesActionTypes } from './novelties.actions';
import { NoveltyModel } from '@llstarscreamll/novelties/data';
import {
  Pagination,
  emptyPagination,
  LoadStatuses
} from '@llstarscreamll/shared';
import { NoveltyTypeInterface } from '@llstarscreamll/novelty-types/data';

export const NOVELTIES_FEATURE_KEY = 'novelties';

/**
 * Interface for the 'Novelties' data used in
 *  - NoveltiesState, and
 *  - noveltiesReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface NoveltiesState {
  paginatedList: Pagination<NoveltyModel>;
  paginatedNoveltyTypesList: Pagination<NoveltyTypeInterface>;
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

    case NoveltiesActionTypes.GetNoveltyOk: {
      state = { ...state, selected: action.payload };
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
