import { SearchCostCentersOk } from './cost-centers.actions';
import {
  CostCentersState,
  initialState,
  reducer
} from './cost-centers.reducer';
import { emptyPagination } from '@kirby/shared';

describe('CostCenters Reducer', () => {
  let createCostCenters;

  beforeEach(() => {
    createCostCenters = (id: string, name = '') => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid CostCenters actions ', () => {
    it('should return paginated list of CostCenters', () => {
      let paginatedCostCenters = emptyPagination();
      paginatedCostCenters.data = [
        createCostCenters('PRODUCT-AAA'),
        createCostCenters('PRODUCT-zzz')
      ];

      const action = new SearchCostCentersOk(paginatedCostCenters);
      const result: CostCentersState = reducer(initialState, action);

      expect(result.paginatedList.data.length).toBe(2);
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
