import { createWorkShifts } from '../mocks';
import { workShiftsQuery } from './work-shifts.selectors';
import { WorkShiftsPartialState, LoadStatuses } from './work-shifts.reducer';
import { ApiError } from '@llstarscreamll/shared';

describe('WorkShifts Selectors', () => {
  const ERROR_MSG: ApiError = {
    ok: false,
    message: 'Resource not found',
    error: {
      message: 'Resource not found',
      error: 'not_found',
    }
  };
  const getWorkShiftsId = it => it['id'];

  let storeState: WorkShiftsPartialState;

  beforeEach(() => {
    storeState = {
      workShifts: {
        paginatedList: {
          data: [
            createWorkShifts('AAA'),
            createWorkShifts('BBB'),
            createWorkShifts('CCC')
          ], meta: {}
        },
        selected: createWorkShifts('BBB'),
        error: ERROR_MSG,
        paginatingStatus: LoadStatuses.Completed
      }
    };
  });

  describe('WorkShifts Selectors', () => {
    it('getPaginatedWorkShifts() should return the list of WorkShifts', () => {
      const results = workShiftsQuery.getPaginatedWorkShifts(storeState);
      const selId = getWorkShiftsId(results.data[1]);

      expect(results.data.length).toBe(3);
      expect(selId).toBe('BBB');
    });

    it('getSelectedWorkShifts() should return the selected Entity', () => {
      const result = workShiftsQuery.getSelectedWorkShift(storeState);
      const selId = getWorkShiftsId(result);

      expect(selId).toBe('BBB');
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = workShiftsQuery.paginatingStatus(storeState);

      expect(result).toBe(LoadStatuses.Completed);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = workShiftsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
