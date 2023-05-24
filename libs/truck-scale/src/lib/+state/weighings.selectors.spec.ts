import { Weighing } from './models';
import { adapter, WeighingsPartialState, initialWeighingsState } from './weighings.reducer';
import * as WeighingsSelectors from './weighings.selectors';

describe('Weighings Selectors', () => {
  const getWeighingsId = (it: Weighing) => it.id;
  const createWeighingsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Weighing);

  let state: WeighingsPartialState;

  beforeEach(() => {
    state = {
      weighings: adapter.setAll(
        [
          createWeighingsEntity('PRODUCT-AAA'),
          createWeighingsEntity('PRODUCT-BBB'),
          createWeighingsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialWeighingsState,
          selectedId: 'PRODUCT-BBB',
          error: null,
          loaded: true,
        }
      ),
    };
  });

  describe('Weighings Selectors', () => {
    it('selectAllWeighings() should return the list of Weighings', () => {
      const results = WeighingsSelectors.selectAllWeighings(state);
      const selId = getWeighingsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectWeighingsError() should return the current "error" state', () => {
      const result = WeighingsSelectors.selectError(state);

      expect(result).toBe(null);
    });
  });
});
