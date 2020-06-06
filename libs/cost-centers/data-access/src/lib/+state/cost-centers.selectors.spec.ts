import { Entity, CostCentersState } from './cost-centers.reducer';
import { costCentersQuery } from './cost-centers.selectors';

describe('CostCenters Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getCostCentersId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createCostCenters = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      costCenters: {
        list: [
          createCostCenters('PRODUCT-AAA'),
          createCostCenters('PRODUCT-BBB'),
          createCostCenters('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('CostCenters Selectors', () => {
    it('getAllCostCenters() should return the list of CostCenters', () => {
      const results = costCentersQuery.getAllCostCenters(storeState);
      const selId = getCostCentersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedCostCenters() should return the selected Entity', () => {
      const result = costCentersQuery.getSelectedCostCenters(storeState);
      const selId = getCostCentersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = costCentersQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = costCentersQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
