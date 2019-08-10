import { NoveltiesAction, NoveltiesActionTypes } from './novelties.actions';
import { NoveltyInterface } from '@llstarscreamll/novelties/data';
import { Pagination, emptyPagination } from '@llstarscreamll/shared';
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
export interface Entity { }

export interface NoveltiesState {
  paginatedList: Pagination<NoveltyInterface>;
  paginatedNoveltyTypesList: Pagination<NoveltyTypeInterface>;
  selected?: NoveltyInterface;
  loaded: boolean;
  error?: any;
}

export interface NoveltiesPartialState {
  readonly [NOVELTIES_FEATURE_KEY]: NoveltiesState;
}

export const initialState: NoveltiesState = {
  paginatedList: emptyPagination(),
  paginatedNoveltyTypesList: emptyPagination(),
  loaded: false
};

export function noveltiesReducer(state: NoveltiesState = initialState, action: NoveltiesAction): NoveltiesState {
  switch (action.type) {

    case NoveltiesActionTypes.SearchNoveltiesOk: {
      state = { ...state, paginatedList: action.payload, loaded: true };
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

  }
  return state;
}
