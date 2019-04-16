import { NxModule } from '@nrwl/nx';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { getTestScheduler } from '@nrwl/nx/testing';

import { TimeClockLogsFacade } from './time-clock-logs.facade';
import { SearchTimeClockLogs } from './time-clock-logs.actions';
import { TimeClockLogsEffects } from './time-clock-logs.effects';
import { TimeClockLogsService } from '../time-clock-logs.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TimeClockLogsState, initialState, timeClockLogsReducer, TIME_CLOCK_LOGS_FEATURE_KEY } from './time-clock-logs.reducer';

interface TestSchema {
  timeClockLogs: TimeClockLogsState;
}

describe('TimeClockLogsFacade', () => {
  let facade: TimeClockLogsFacade;
  let store: Store<TestSchema>;
  let createTimeClockLogs;

  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TIME_CLOCK_LOGS_FEATURE_KEY, timeClockLogsReducer, { initialState }),
          EffectsModule.forFeature([TimeClockLogsEffects])
        ],
        providers: [TimeClockLogsFacade, TimeClockLogsService]
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
          HttpClientTestingModule,
        ],
        providers: [
          { provide: 'environment', useValue: { api: 'https://my.api.com/' } },
        ]
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(TimeClockLogsFacade);

      spyOn(store, 'dispatch');
    });

    it('search() should call SearchTimeClockLogs action', async done => {
      try {
        let query = {};
        await facade.search(query);
        getTestScheduler().flush();

        expect(store.dispatch).toHaveBeenCalledWith(new SearchTimeClockLogs(query));

        done();
      } catch (err) {
        done.fail(err);
      }
    });

  });
});
