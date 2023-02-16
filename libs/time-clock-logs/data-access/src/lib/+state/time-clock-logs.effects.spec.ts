import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { DataPersistence } from '@nrwl/angular';
import { provideMockActions } from '@ngrx/effects/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchTimeClockLogs, SearchTimeClockLogsOk } from './time-clock-logs.actions';
import { emptyPagination } from '@kirby/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeClockLogsEffects } from './time-clock-logs.effects';
import { TimeClockLogsService } from '../time-clock-logs.service';
import { createTimeClockLog } from '@kirby/time-clock-logs/testing';
import { hot, cold } from 'jasmine-marbles';

describe('TimeClockLogsEffects', () => {
  let actions$: Observable<any>;
  let effects: TimeClockLogsEffects;
  let timeClockLogsService: TimeClockLogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
            },
          }
        ),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        TimeClockLogsEffects,
        TimeClockLogsService,
        DataPersistence,
        provideMockActions(() => actions$),
        { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
        { provide: MatSnackBar, useValue: { open: () => true } },
      ],
    });

    effects = TestBed.inject(TimeClockLogsEffects);
    timeClockLogsService = TestBed.inject(TimeClockLogsService);
  });

  describe('searchTimeClockLogs$', () => {
    it('ok api response should return SearchTimeClockLogsOk action', () => {
      const query = { search: 'foo' };
      const data = {
        ...emptyPagination(),
        data: [createTimeClockLog('1'), createTimeClockLog('2')],
      };
      const apiResponse = cold('-a', { a: data });
     jest.spyOn(timeClockLogsService, 'search').mockReturnValue(apiResponse);

      actions$ = hot('-a', { a: new SearchTimeClockLogs(query) });

      expect(effects.searchTimeClockLogs$).toBeObservable(hot('--a', { a: new SearchTimeClockLogsOk(data) }));
      expect(timeClockLogsService.search).toHaveBeenCalledWith(query);
    });
  });
});
