import { emptyPagination } from '@kirby/shared';
import { createNovelty } from '@kirby/novelties/testing';

import { SearchOk } from './novelties.actions';
import { NoveltiesState, initialState, noveltiesReducer } from './novelties.reducer';

describe('Novelties Reducer', () => {
  const getNoveltiesId = (it) => it['id'];

  describe('valid Novelties actions ', () => {
    it('should return set the list of known Novelties', () => {
      const novelties = {
        ...emptyPagination(),
        data: [createNovelty('PRODUCT-AAA'), createNovelty('PRODUCT-zzz')],
      };
      const action = SearchOk({ payload: novelties });
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
