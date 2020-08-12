import {
  NoveltyTypesAction,
  NoveltyTypesActionTypes,
} from './novelty-types.actions';
import { Pagination, emptyPagination } from '@kirby/shared';
import { NoveltyType, INoveltyType } from '@kirby/novelty-types/data';

export const NOVELTY_TYPES_FEATURE_KEY = 'noveltyTypes';

export interface NoveltyTypesState {
  paginatedList: Pagination<INoveltyType>;
  selected?: INoveltyType;
  error?: any;
}

export interface NoveltyTypesPartialState {
  readonly [NOVELTY_TYPES_FEATURE_KEY]: NoveltyTypesState;
}

export const initialState: NoveltyTypesState = {
  paginatedList: emptyPagination(),
};

export function reducer(
  state: NoveltyTypesState = initialState,
  action: NoveltyTypesAction
): NoveltyTypesState {
  switch (action.type) {
    case NoveltyTypesActionTypes.SearchOk: {
      state = { ...state, paginatedList: action.payload };
      break;
    }

    case NoveltyTypesActionTypes.SearchError: {
      state = { ...state, error: action.payload };
      break;
    }

    case NoveltyTypesActionTypes.GetOk: {
      state = { ...state, selected: action.payload };
      break;
    }

    case NoveltyTypesActionTypes.GetError: {
      state = { ...state, selected: null, error: action.payload };
      break;
    }

    case NoveltyTypesActionTypes.CreateError: {
      state = { ...state, error: action.payload };
      break;
    }

    case NoveltyTypesActionTypes.UpdateError: {
      state = { ...state, error: action.payload };
      break;
    }

    case NoveltyTypesActionTypes.TrashOk: {
      state = {
        ...state,
        paginatedList: {
          ...state.paginatedList,
          data: [
            ...state.paginatedList.data.filter(
              (noveltyType) => noveltyType.id !== action.payload
            ),
          ],
        },
      };
      break;
    }

    case NoveltyTypesActionTypes.SetError: {
      state = { ...state, error: action.payload };
      break;
    }
  }
  return state;
}
