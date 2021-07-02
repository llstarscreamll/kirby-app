import { createProductionLog } from '../testing';
import { IProductionLog } from './production.models';
import { State, productionAdapter, initialState } from './production.reducer';
import * as ProductionSelectors from './production.selectors';

describe('Production Selectors', () => {
  let state;
  const ERROR_MSG = 'No Error Available';
  let selected = createProductionLog('PRODUCT-BBB');

  beforeEach(() => {
    state = {
      production: productionAdapter.setAll(
        [createProductionLog('PRODUCT-AAA'), selected, createProductionLog('PRODUCT-CCC')],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
          selected,
        }
      ),
    };
  });

  describe('Production Selectors', () => {
    it('getAllProduction() should return the list of Production', () => {
      const results = ProductionSelectors.getProductionLogs(state);

      expect(results.length).toBe(3);
      expect(results[1].id).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ProductionSelectors.getSelected(state);

      expect(result.id).toBe('PRODUCT-BBB');
    });

    it("getProductionLoaded() should return the current 'loaded' status", () => {
      const result = ProductionSelectors.getProductionLoaded(state);

      expect(result).toBe(true);
    });

    it("getProductionError() should return the current 'error' state", () => {
      const result = ProductionSelectors.getProductionError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
