import { NxModule } from '@nrwl/angular';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { TimeClockLogsFacade } from './time-clock-logs.facade';
import { SearchTimeClockLogs } from './time-clock-logs.actions';
import { TimeClockLogsEffects } from './time-clock-logs.effects';
import { TimeClockLogsService } from '../time-clock-logs.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  TimeClockLogsState,
  initialState,
  timeClockLogsReducer,
  TIME_CLOCK_LOGS_FEATURE_KEY,
} from './time-clock-logs.reducer';
import { getTestScheduler } from 'jasmine-marbles';

interface TestSchema {
  timeClockLogs: TimeClockLogsState;
}

describe('TimeClockLogsFacade', () => {
  let facade: TimeClockLogsFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [],
        providers: [TimeClockLogsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [CustomFeatureModule, HttpClientTestingModule],
        providers: [
          { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
          {
            provide: Store,
            useValue: { dispatch: () => true, pipe: () => true },
          },
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TimeClockLogsFacade);

      spyOn(store, 'dispatch');
    });

    it('search() should call SearchTimeClockLogs action', () => {
      const query = {};
      facade.search(query);
      getTestScheduler().flush();

      expect(store.dispatch).toHaveBeenCalledWith(new SearchTimeClockLogs(query));
    });
  });
});
