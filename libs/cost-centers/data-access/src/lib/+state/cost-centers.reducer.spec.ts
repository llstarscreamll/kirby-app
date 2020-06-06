import { CostCentersLoaded } from './cost-centers.actions';
import {
  CostCentersState,
  Entity,
  initialState,
  reducer
} from './cost-centers.reducer';

describe('CostCenters Reducer', () => {
  const getCostCentersId = it => it['id'];
  let createCostCenters;

  beforeEach(() => {
    createCostCenters = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid CostCenters actions ', () => {
    it('should return set the list of known CostCenters', () => {
      const costCenterss = [
        createCostCenters('PRODUCT-AAA'),
        createCostCenters('PRODUCT-zzz')
      ];
      const action = new CostCentersLoaded(costCenterss);
      const result: CostCentersState = reducer(initialState, action);
      const selId: string = getCostCentersId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
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
