import {
  NoveltiesState,
  Entity,
  initialState,
  noveltiesReducer
} from './novelties.reducer';
import { emptyPagination } from '@kirby/shared';
import { SearchNoveltiesOk } from './novelties.actions';

describe('Novelties Reducer', () => {
  const getNoveltiesId = it => it['id'];
  let createNovelties;

  beforeEach(() => {
    createNovelties = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Novelties actions ', () => {
    it('should return set the list of known Novelties', () => {
      const novelties = {
        ...emptyPagination(),
        data: [createNovelties('PRODUCT-AAA'), createNovelties('PRODUCT-zzz')]
      };
      const action = new SearchNoveltiesOk(novelties);
      const result: NoveltiesState = noveltiesReducer(initialState, action);
      const selId: string = getNoveltiesId(result.paginatedList.data[1]);

      expect(result.loaded).toBe(true);
      expect(result.paginatedList.data.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = noveltiesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
