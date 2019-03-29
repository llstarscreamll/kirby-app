import { createWorkShifts } from '../mocks';
import { SearchWorkShiftsOk } from './work-shifts.actions';
import { WorkShiftsState, initialState, workShiftsReducer } from './work-shifts.reducer';

describe('WorkShifts Reducer', () => {
  const getWorkShiftsId = it => it['id'];

  beforeEach(() => { });

  describe('valid WorkShifts actions ', () => {
    it('should return set the list of known WorkShifts', () => {
      const workShifts = [
        createWorkShifts('1'),
        createWorkShifts('2')
      ];
      const action = new SearchWorkShiftsOk({ data: workShifts, meta: {} });
      const result: WorkShiftsState = workShiftsReducer(initialState, action);
      const selId: string = getWorkShiftsId(result.paginatedList.data[1]);

      expect(result.paginatedListLoaded).toBe(true);
      expect(result.paginatedList.data.length).toBe(2);
      expect(selId).toBe('2');
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
