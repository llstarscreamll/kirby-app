import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { NoveltiesEffects } from './novelties.effects';
import { SearchNovelties, SearchNoveltiesOk } from './novelties.actions';
import { NoveltyService } from '../novelty.service';

describe('NoveltiesEffects', () => {
  let actions: Observable<any>;
  let effects: NoveltiesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        NoveltiesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: NoveltyService, useValue: { get: () => true } },
      ]
    });

    effects = TestBed.get(NoveltiesEffects);
  });

  describe('loadNovelties$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new SearchNovelties() });
      expect(effects.searchNovelties$).toBeObservable(
        hot('-a-|', { a: new SearchNoveltiesOk([]) })
      );
    });
  });
});
