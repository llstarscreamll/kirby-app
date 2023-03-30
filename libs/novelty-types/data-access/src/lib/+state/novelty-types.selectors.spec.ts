import { emptyPagination } from '@kirby/shared';
import { createNoveltyType } from '@kirby/novelty-types/testing';

import * as selectos from './novelty-types.selectors';
import { NoveltyTypesState, NOVELTY_TYPES_FEATURE_KEY } from './novelty-types.reducer';

describe('NoveltyTypes Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getNoveltyTypesId = (it) => it['id'];

  let storeState: { [NOVELTY_TYPES_FEATURE_KEY]: NoveltyTypesState };

  beforeEach(() => {
    storeState = {
      [NOVELTY_TYPES_FEATURE_KEY]: {
        paginatedList: {
          ...emptyPagination(),
          data: [createNoveltyType('AAA'), createNoveltyType('BBB'), createNoveltyType('CCC')],
        },
        selected: createNoveltyType('ZZZ'),
        error: ERROR_MSG,
      },
    };
  });

  it('getPaginated() should return the paginated list of NoveltyTypes', () => {
    const results = selectos.getPaginated(storeState);

    expect(results.data.length).toBe(3);
    expect(results.data[0].id).toBe('AAA');
    expect(results.data[1].id).toBe('BBB');
    expect(results.data[2].id).toBe('CCC');
  });

  it("getError() should return the current 'error' storeState", () => {
    const result = selectos.getError(storeState);

    expect(result).toBe(ERROR_MSG);
  });

  it("getSelected() should return the current 'error' storeState", () => {
    const result = selectos.getSelected(storeState);

    expect(result).toBeTruthy();
    expect(result.id).toBe('ZZZ');
  });
});
