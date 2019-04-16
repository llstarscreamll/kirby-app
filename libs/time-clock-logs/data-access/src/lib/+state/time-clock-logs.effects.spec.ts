import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/nx';
import { hot, cold } from '@nrwl/nx/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { EffectsModule } from '@ngrx/effects';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { emptyPagination } from '@llstarscreamll/shared';
import { TimeClockLogsEffects } from './time-clock-logs.effects';
import { SearchTimeClockLogs, SearchTimeClockLogsOk } from './time-clock-logs.actions';
import { TimeClockLogsService } from '../time-clock-logs.service';
import { createTimeClockLog } from '@llstarscreamll/time-clock-logs/util/src';

describe('TimeClockLogsEffects', () => {
  let actions$: Observable<any>;
  let effects: TimeClockLogsEffects;
  let timeClockLogsService: TimeClockLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        TimeClockLogsEffects,
        TimeClockLogsService,
        DataPersistence,
        provideMockActions(() => actions$),
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
      ]
    });

    effects = TestBed.get(TimeClockLogsEffects);
    timeClockLogsService = TestBed.get(TimeClockLogsService);
  });

  describe('searchTimeClockLogs$', () => {

    it('ok api response should return SearchTimeClockLogsOk action', () => {
      const query = { search: 'foo' };
      const data = { data: [createTimeClockLog('1'), createTimeClockLog('2')], meta: {} };
      const apiResponse = cold('-a', { a: data });
      spyOn(timeClockLogsService, 'search').and.returnValue(apiResponse);

      actions$ = hot('-a', { a: new SearchTimeClockLogs(query) });

      expect(effects.searchTimeClockLogs$).toBeObservable(hot('--a', { a: new SearchTimeClockLogsOk(data) }));
      expect(timeClockLogsService.search).toHaveBeenCalledWith(query);
    });

  });
});
