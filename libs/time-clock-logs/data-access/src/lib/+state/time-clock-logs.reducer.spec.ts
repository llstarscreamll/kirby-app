import { SearchTimeClockLogsOk } from './time-clock-logs.actions';
import { TimeClockLogInterface, createTimeClockLog } from '@llstarscreamll/time-clock-logs/util';
import { TimeClockLogsState, initialState, timeClockLogsReducer } from './time-clock-logs.reducer';
import { LoadStatuses } from '@llstarscreamll/shared';

describe('TimeClockLogs Reducer', () => {
  beforeEach(() => { });

  describe('valid TimeClockLogs actions ', () => {

    it('should return set the list of known TimeClockLogs', () => {
      const timeClockLogs = {
        data: [
          createTimeClockLog('AAA'),
          createTimeClockLog('zzz')
        ], meta: {}
      };
      const action = new SearchTimeClockLogsOk(timeClockLogs);
      const result: TimeClockLogsState = timeClockLogsReducer(initialState, action);
      const selId: string = result.paginatedList.data[1].id;

      expect(result.selectingStatus).toBe(LoadStatuses.Completed);
      expect(result.paginatedList.data.length).toBe(2);
      expect(selId).toBe('zzz');
    });

  });

  describe('unknown action', () => {

    it('should return the initial state', () => {
      const action = {} as any;
      const result = timeClockLogsReducer(initialState, action);

      expect(result).toBe(initialState);
    });

  });
});
