import { ProductionLog } from './production.models';
import * as ProductionActions from './production.actions';
import { State, initialState, reducer } from './production.reducer';

describe('Production Reducer', () => {
  const createProductionEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProductionLog);

  beforeEach(() => {});

  describe('valid Production actions', () => {
    it('loadProductionSuccess should return set the list of known Production', () => {
      const pagination = {
        data: [createProductionEntity('PRODUCT-AAA'), createProductionEntity('PRODUCT-zzz')],
        meta: {},
      };
      const action = ProductionActions.searchLogsOk(pagination);

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
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
