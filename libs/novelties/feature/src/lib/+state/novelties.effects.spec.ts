import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { DataPersistence } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { NoveltiesFeatureEffects } from './novelties-feature.effects';
import { NoveltiesFacade } from '@llstarscreamll/novelties/data-access';

describe('NoveltiesEffects', () => {
  let actions: Observable<any>;
  let effects: NoveltiesFeatureEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        NoveltiesFeatureEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: NoveltiesFacade, useValue: { get: params => true } }
      ]
    });

    effects = TestBed.get(NoveltiesFeatureEffects);
  });

  it('should be defined', () => {
    expect(effects).toBeTruthy();
  });
});
