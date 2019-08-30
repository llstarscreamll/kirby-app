import { Entity, NoveltiesState } from './novelties.reducer';
import { noveltiesQuery } from './novelties.selectors';
import { createNovelty } from '@llstarscreamll/novelties/utils';
import { emptyPagination } from '@llstarscreamll/shared';

describe('Novelties Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNoveltiesId = it => it['id'];
  const novelty = createNovelty('PRODUCT-AAA');

  let storeState: NoveltiesState;

  beforeEach(() => {
    storeState = {
      paginatedList: {
        data: [
          novelty,
          createNovelty('PRODUCT-BBB'),
          createNovelty('PRODUCT-CCC')
        ],
        meta: {}
      },
      paginatedNoveltyTypesList: emptyPagination(),
      selected: novelty,
      error: ERROR_MSG,
      loaded: true
    };
  });

  describe('Novelties Selectors', () => {
    it('getAllNovelties() should return the list of Novelties', () => {
      const results = noveltiesQuery.getPaginatedList(storeState);
      const selId = getNoveltiesId(results[1]);

      expect(results.data.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedNovelty() should return the selected Entity', () => {
      const result = noveltiesQuery.getSelectedNovelty(storeState);

      expect(result).toEqual(novelty);
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = noveltiesQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = noveltiesQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
