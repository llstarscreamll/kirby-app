import { createTimeClockLog } from '@kirby/time-clock-logs/testing';
import { INVALID_DATA_API_ERROR, LoadStatus, emptyPagination } from '@kirby/shared';

import * as selectors from './time-clock-logs.selectors';
import { TimeClockLogsPartialState, TIME_CLOCK_LOGS_FEATURE_KEY } from './time-clock-logs.reducer';

describe('TimeClockLogs Selectors', () => {
  let storeState: TimeClockLogsPartialState;

  beforeEach(() => {
    storeState = {
      [TIME_CLOCK_LOGS_FEATURE_KEY]: {
        paginatedList: {
          ...emptyPagination(),
          data: [
            createTimeClockLog('PRODUCT-AAA'),
            createTimeClockLog('PRODUCT-BBB'),
            createTimeClockLog('PRODUCT-CCC'),
          ],
        },
        paginatingStatus: LoadStatus.Empty,
        selected: createTimeClockLog('PRODUCT-AAA'),
        error: INVALID_DATA_API_ERROR,
      },
    };
  });

  describe('TimeClockLogs Selectors', () => {
    it('getPaginatedTimeClockLogs() should return the paginated list of TimeClockLogs', () => {
      const results = selectors.getPaginatedTimeClockLogs(storeState);
      expect(results.data.length).toBe(3);
    });

    it('getSelectedTimeClockLog() should return the selected Entity', () => {
      const result = selectors.getSelectedTimeClockLog(storeState);
      const selId = result.id;

      expect(selId).toBe('PRODUCT-AAA');
    });

    it("getPaginatingStatus() should return the current 'loaded' status", () => {
      const result = selectors.getPaginatingStatus(storeState);

      expect(result).toBe(LoadStatus.Empty);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = selectors.getError(storeState);

      expect(result).toBe(INVALID_DATA_API_ERROR);
    });
  });
});
