import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as WeighingsActions from './weighings.actions';
import { WeighingsEffects } from './weighings.effects';

describe('WeighingsEffects', () => {
  let actions: Observable<Action>;
  let effects: WeighingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [WeighingsEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(WeighingsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: WeighingsActions.initWeighings() });

      const expected = hot('-a-|', { a: WeighingsActions.loadWeighingsSuccess({ weighings: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
