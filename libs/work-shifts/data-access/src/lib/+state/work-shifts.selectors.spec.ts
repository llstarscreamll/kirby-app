import { Entity, WorkShiftsState } from './work-shifts.reducer';
import { workShiftsQuery } from './work-shifts.selectors';

describe('WorkShifts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getWorkShiftsId = it => it['id'];

  let storeState;

  beforeEach(() => {
    const createWorkShifts = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
    storeState = {
      workShifts: {
        list: [
          createWorkShifts('PRODUCT-AAA'),
          createWorkShifts('PRODUCT-BBB'),
          createWorkShifts('PRODUCT-CCC')
        ],
        selectedId: 'PRODUCT-BBB',
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('WorkShifts Selectors', () => {
    it('getAllWorkShifts() should return the list of WorkShifts', () => {
      const results = workShiftsQuery.getAllWorkShifts(storeState);
      const selId = getWorkShiftsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelectedWorkShifts() should return the selected Entity', () => {
      const result = workShiftsQuery.getSelectedWorkShifts(storeState);
      const selId = getWorkShiftsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = workShiftsQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = workShiftsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
