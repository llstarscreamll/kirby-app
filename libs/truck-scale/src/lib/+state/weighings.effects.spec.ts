import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { hot } from 'jasmine-marbles';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { actions as a } from './weighings.actions';
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

  describe('searchWeighings$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: a.searchWeighings('') });

      const expected = hot('-a-|', { a: a.loadWeighingsSuccess([]) });

      expect(effects.searchWeighings$).toBeObservable(expected);
    });
  });
});
