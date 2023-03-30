import { emptyPagination } from '@kirby/shared';

import * as query from './cost-centers.selectors';
import { COST_CENTERS_FEATURE_KEY, CostCentersState } from './cost-centers.reducer';

describe('CostCenters Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  let storeState: { [COST_CENTERS_FEATURE_KEY]: CostCentersState };

  beforeEach(() => {
    const createCostCenters = (id: string, name = '') => ({
      id,
      name: name || `name-${id}`,
      code: 'foo',
    });

    storeState = {
      [COST_CENTERS_FEATURE_KEY]: {
        paginatedList: {
          ...emptyPagination(),
          data: [createCostCenters('PRODUCT-AAA'), createCostCenters('PRODUCT-BBB'), createCostCenters('PRODUCT-CCC')],
        },
        error: ERROR_MSG,
      },
    };
  });

  describe('CostCenters Selectors', () => {
    it('getError() should return api errors', () => {
      const error = query.getError(storeState);

      expect(error).toBeTruthy();
      expect(error).toEqual(ERROR_MSG);
    });

    it('getPaginated() should return the selected Entity', () => {
      const result = query.getPaginated(storeState);

      expect(result).toBeTruthy();
      expect(result.data.length).toBe(3);
    });
  });
});
