import { workShiftsQuery } from './work-shifts.selectors';
import { WorkShiftsPartialState } from './work-shifts.reducer';
import { ApiError, LoadStatuses, emptyPagination } from '@kirby/shared';
import { createWorkShift } from '@kirby/work-shifts/testing';

describe('WorkShifts Selectors', () => {
  const ERROR_MSG: ApiError = {
    ok: false,
    message: 'Resource not found',
    error: {
      message: 'Resource not found',
      error: 'not_found'
    }
  };
  const getWorkShiftsId = it => it['id'];

  let storeState: WorkShiftsPartialState;

  beforeEach(() => {
    storeState = {
      workShifts: {
        paginatedList: {
          ...emptyPagination(),
          data: [
            createWorkShift('AAA'),
            createWorkShift('BBB'),
            createWorkShift('CCC')
          ]
        },
        selected: createWorkShift('DDD'),
        paginatingStatus: LoadStatuses.Completed,
        selectingStatus: LoadStatuses.Empty,
        creatingStatus: LoadStatuses.Loading,
        updatingStatus: LoadStatuses.Error,
        deletingStatus: LoadStatuses.Completed,
        error: ERROR_MSG
      }
    };
  });

  describe('WorkShifts Selectors', () => {
    it('getPaginatedWorkShifts() should return the paginated list of entities', () => {
      const results = workShiftsQuery.getPaginatedWorkShifts(storeState);

      expect(results.data.length).toBe(3);
    });

    it('getSelectedWorkShift() should return the selected entity', () => {
      const result = workShiftsQuery.getSelectedWorkShift(storeState);

      expect(result.id).toBe('DDD');
    });

    it("paginatingStatus() should return the current 'paginating' status", () => {
      const result = workShiftsQuery.paginatingStatus(storeState);

      expect(result).toBe(LoadStatuses.Completed);
    });

    it("creatingStatus() should return the current 'creating' status", () => {
      const result = workShiftsQuery.creatingStatus(storeState);

      expect(result).toBe(LoadStatuses.Loading);
    });

    it("selectingStatus() should return the current 'selecting' status", () => {
      const result = workShiftsQuery.selectingStatus(storeState);

      expect(result).toBe(LoadStatuses.Empty);
    });

    it("updatingStatus() should return the current 'updating' status", () => {
      const result = workShiftsQuery.updatingStatus(storeState);

      expect(result).toBe(LoadStatuses.Error);
    });

    it("deletingStatus() should return the current 'deleting' status", () => {
      const result = workShiftsQuery.deletingStatus(storeState);

      expect(result).toBe(LoadStatuses.Completed);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = workShiftsQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
