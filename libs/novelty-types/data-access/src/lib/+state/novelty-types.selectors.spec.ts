import {
  NoveltyTypesPartialState,
  NOVELTY_TYPES_FEATURE_KEY,
} from './novelty-types.reducer';
import { emptyPagination } from '@kirby/shared';
import { noveltyTypesQuery } from './novelty-types.selectors';
import { createNoveltyType } from '@kirby/novelty-types/testing';

describe('NoveltyTypes Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNoveltyTypesId = (it) => it['id'];

  let storeState: NoveltyTypesPartialState;

  beforeEach(() => {
    storeState = {
      [NOVELTY_TYPES_FEATURE_KEY]: {
        paginatedList: {
          ...emptyPagination(),
          data: [
            createNoveltyType('AAA'),
            createNoveltyType('BBB'),
            createNoveltyType('CCC'),
          ],
        },
        selected: createNoveltyType('ZZZ'),
        error: ERROR_MSG,
      },
    };
  });

  it('getPaginated() should return the paginated list of NoveltyTypes', () => {
    const results = noveltyTypesQuery.getPaginated(storeState);

    expect(results.data.length).toBe(3);
    expect(results.data[0].id).toBe('AAA');
    expect(results.data[1].id).toBe('BBB');
    expect(results.data[2].id).toBe('CCC');
  });

  it("getError() should return the current 'error' storeState", () => {
    const result = noveltyTypesQuery.getError(storeState);

    expect(result).toBe(ERROR_MSG);
  });

  it("getSelected() should return the current 'error' storeState", () => {
    const result = noveltyTypesQuery.getSelected(storeState);

    expect(result).toBeTruthy();
    expect(result.id).toBe('ZZZ');
  });
});
