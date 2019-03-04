import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { WorkShiftsEffects } from './work-shifts.effects';
import { LoadWorkShifts, WorkShiftsLoaded } from './work-shifts.actions';

describe('WorkShiftsEffects', () => {
  let actions: Observable<any>;
  let effects: WorkShiftsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        WorkShiftsEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(WorkShiftsEffects);
  });

  describe('loadWorkShifts$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadWorkShifts() });
      expect(effects.loadWorkShifts$).toBeObservable(
        hot('-a-|', { a: new WorkShiftsLoaded([]) })
      );
    });
  });
});
