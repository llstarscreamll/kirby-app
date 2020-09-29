import { createCategory } from '@kirby/products/testing';
import * as CategoriesSelectors from './categories.selectors';
import {
  initialState,
  CATEGORIES_FEATURE_KEY,
  CategoriesPartialState,
} from './categories.reducer';
import { emptyPagination } from '@kirby/shared';

describe('Categories Selectors', () => {
  const ERROR_MSG = { message: 'No Error Available', ok: false };

  let state: CategoriesPartialState;

  beforeEach(() => {
    state = {
      [CATEGORIES_FEATURE_KEY]: {
        ...initialState,
        paginated: {
          ...emptyPagination(),
          data: [
            createCategory({ id: 'AAA' }),
            createCategory({ id: 'BBB' }),
            createCategory({ id: 'CCC' }),
          ],
        },
        error: ERROR_MSG,
        paginationStatus: true,
      },
    };
  });

  it('getPaginated() should return paginated categories list', () => {
    const results = CategoriesSelectors.getPaginated(state);

    expect(results.data.length).toBe(3);
  });

  it("getCategoriesLoaded() should return the current 'loaded' status", () => {
    const result = CategoriesSelectors.getCategoriesLoaded(state);

    expect(result).toBe(true);
  });

  it("getCategoriesError() should return the current 'error' state", () => {
    const result = CategoriesSelectors.getCategoriesError(state);

    expect(result).toBe(ERROR_MSG);
  });
});
