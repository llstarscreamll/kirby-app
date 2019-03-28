import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/nx';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { emptyPagination } from '@llstarscreamll/shared';
import { WorkShiftsEffects } from './work-shifts.effects';
import { PaginateWorkShifts, WorkShiftsLoaded } from './work-shifts.actions';

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
      actions = hot('-a-|', { a: new PaginateWorkShifts() });
      expect(effects.loadWorkShifts$).toBeObservable(
        hot('-a-|', { a: new WorkShiftsLoaded(emptyPagination()) })
      );
    });
  });
});
