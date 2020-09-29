import * as CategoriesActions from './categories.actions';
import { createCategory } from '@kirby/products/testing';
import { State, initialState, reducer } from './categories.reducer';
import { emptyPagination } from '@kirby/shared';

describe('Categories Reducer', () => {
  describe('valid Categories actions', () => {
    it('searchCategoriesOk should return paginated list of Categories', () => {
      const categories = [
        createCategory({ id: 'AAA' }),
        createCategory({ id: 'zzz' }),
      ];
      const action = CategoriesActions.searchCategoriesOk({
        response: { ...emptyPagination(), data: categories },
      });

      const result: State = reducer(initialState, action);

      expect(result.paginationStatus).toBe(true);
      expect(result.paginated.data.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
