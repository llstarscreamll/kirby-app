import { createWorkShift } from '@kirby/work-shifts/testing';
import { ApiError, LoadStatus, emptyPagination } from '@kirby/shared';

import * as selectors from './work-shifts.selectors';
import { WorkShiftsState, WORK_SHIFTS_FEATURE_KEY } from './work-shifts.reducer';

describe('WorkShifts Selectors', () => {
  const ERROR_MSG: ApiError = {
    ok: false,
    message: 'Resource not found',
    error: {
      message: 'Resource not found',
      error: 'not_found',
    },
  };
  const getWorkShiftsId = (it) => it['id'];

  let storeState: { [WORK_SHIFTS_FEATURE_KEY]: WorkShiftsState };

  beforeEach(() => {
    storeState = {
      [WORK_SHIFTS_FEATURE_KEY]: {
        paginatedList: {
          ...emptyPagination(),
          data: [createWorkShift('AAA'), createWorkShift('BBB'), createWorkShift('CCC')],
        },
        selected: createWorkShift('DDD'),
        paginatingStatus: LoadStatus.Completed,
        selectingStatus: LoadStatus.Empty,
        creatingStatus: LoadStatus.Loading,
        updatingStatus: LoadStatus.Error,
        deletingStatus: LoadStatus.Completed,
        error: ERROR_MSG,
      },
    };
  });

  describe('WorkShifts Selectors', () => {
    it('getPaginatedWorkShifts() should return the paginated list of entities', () => {
      const results = selectors.getPaginatedWorkShifts(storeState);

      expect(results.data.length).toBe(3);
    });

    it('getSelectedWorkShift() should return the selected entity', () => {
      const result = selectors.getSelectedWorkShift(storeState);

      expect(result.id).toBe('DDD');
    });

    it("paginatingStatus() should return the current 'paginating' status", () => {
      const result = selectors.paginatingStatus(storeState);

      expect(result).toBe(LoadStatus.Completed);
    });

    it("creatingStatus() should return the current 'creating' status", () => {
      const result = selectors.creatingStatus(storeState);

      expect(result).toBe(LoadStatus.Loading);
    });

    it("selectingStatus() should return the current 'selecting' status", () => {
      const result = selectors.selectingStatus(storeState);

      expect(result).toBe(LoadStatus.Empty);
    });

    it("updatingStatus() should return the current 'updating' status", () => {
      const result = selectors.updatingStatus(storeState);

      expect(result).toBe(LoadStatus.Error);
    });

    it("deletingStatus() should return the current 'deleting' status", () => {
      const result = selectors.deletingStatus(storeState);

      expect(result).toBe(LoadStatus.Completed);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = selectors.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
