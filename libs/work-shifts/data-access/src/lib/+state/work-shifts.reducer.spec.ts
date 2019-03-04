import { WorkShiftsLoaded } from './work-shifts.actions';
import {
  WorkShiftsState,
  Entity,
  initialState,
  workShiftsReducer
} from './work-shifts.reducer';

describe('WorkShifts Reducer', () => {
  const getWorkShiftsId = it => it['id'];
  let createWorkShifts;

  beforeEach(() => {
    createWorkShifts = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid WorkShifts actions ', () => {
    it('should return set the list of known WorkShifts', () => {
      const workShiftss = [
        createWorkShifts('PRODUCT-AAA'),
        createWorkShifts('PRODUCT-zzz')
      ];
      const action = new WorkShiftsLoaded(workShiftss);
      const result: WorkShiftsState = workShiftsReducer(initialState, action);
      const selId: string = getWorkShiftsId(result.list[1]);

      expect(result.loaded).toBe(true);
      expect(result.list.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = workShiftsReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
