import { SearchNoveltiesOk } from './novelties.actions';
import {
  NoveltiesState,
  Entity,
  initialState,
  noveltiesReducer
} from './novelties.reducer';

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
      const noveltiess = [
        createNovelties('PRODUCT-AAA'),
        createNovelties('PRODUCT-zzz')
      ];
      const action = new SearchNoveltiesOk(noveltiess);
      const result: NoveltiesState = noveltiesReducer(initialState, action);
      const selId: string = getNoveltiesId(result.paginatedList[1]);

      expect(result.loaded).toBe(true);
      expect(result.paginatedList.length).toBe(2);
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
