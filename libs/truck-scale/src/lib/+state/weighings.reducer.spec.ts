import { Action } from '@ngrx/store';

import { actions as a } from './weighings.actions';
import { WeighingsEntity } from './weighings.models';
import { WeighingsState, initialWeighingsState, weighingsReducer } from './weighings.reducer';

describe('Weighings Reducer', () => {
  const createWeighingsEntity = (id: string, name = ''): WeighingsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Weighings actions', () => {
    it('loadWeighingsSuccess should return the list of known Weighings', () => {
      const weighings = [createWeighingsEntity('PRODUCT-AAA'), createWeighingsEntity('PRODUCT-zzz')];
      const action = a.loadWeighingsSuccess(weighings);

      const result: WeighingsState = weighingsReducer(initialWeighingsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = weighingsReducer(initialWeighingsState, action);

      expect(result).toBe(initialWeighingsState);
    });
  });
});
