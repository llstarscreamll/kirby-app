import { timeClockLogsQuery } from './time-clock-logs.selectors';
import { INVALID_DATA_API_ERROR, LoadStatuses } from '@llstarscreamll/shared';
import { TimeClockLogModel, createTimeClockLog } from '@llstarscreamll/time-clock-logs/util';
import { TimeClockLogsPartialState, TIME_CLOCK_LOGS_FEATURE_KEY } from "./time-clock-logs.reducer";

describe('TimeClockLogs Selectors', () => {
  let storeState: TimeClockLogsPartialState;

  beforeEach(() => {
    storeState = {
      [TIME_CLOCK_LOGS_FEATURE_KEY]: {
        paginatedList: {
          data: [
            createTimeClockLog('PRODUCT-AAA'),
            createTimeClockLog('PRODUCT-BBB'),
            createTimeClockLog('PRODUCT-CCC')
          ], meta: {}
        },
        paginatingStatus: LoadStatuses.Empty,
        selected: createTimeClockLog('PRODUCT-AAA'),
        error: INVALID_DATA_API_ERROR,
      }
    };
  });

  describe('TimeClockLogs Selectors', () => {

    it('getPaginatedTimeClockLogs() should return the paginated list of TimeClockLogs', () => {
      const results = timeClockLogsQuery.getPaginatedTimeClockLogs(storeState);
      expect(results.data.length).toBe(3);
    });

    it('getSelectedTimeClockLog() should return the selected Entity', () => {
      const result = timeClockLogsQuery.getSelectedTimeClockLog(storeState);
      const selId = result.id;

      expect(selId).toBe('PRODUCT-AAA');
    });

    it("getPaginatingStatus() should return the current 'loaded' status", () => {
      const result = timeClockLogsQuery.getPaginatingStatus(storeState);

      expect(result).toBe(LoadStatuses.Empty);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = timeClockLogsQuery.getError(storeState);

      expect(result).toBe(INVALID_DATA_API_ERROR);
    });

  });
});
