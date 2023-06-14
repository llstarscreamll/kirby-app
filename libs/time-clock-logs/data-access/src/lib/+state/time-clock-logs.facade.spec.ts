import { Store } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { getTestScheduler } from 'jasmine-marbles';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TimeClockLogsFacade } from './time-clock-logs.facade';
import { SearchTimeClockLogs } from './time-clock-logs.actions';
import { TimeClockLogsState } from './time-clock-logs.reducer';

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

      jest.spyOn(store, 'dispatch');
    });

    it('search() should call SearchTimeClockLogs action', () => {
      const query = {};
      facade.search(query);
      getTestScheduler().flush();

      expect(store.dispatch).toHaveBeenCalledWith(new SearchTimeClockLogs(query));
    });
  });
});
