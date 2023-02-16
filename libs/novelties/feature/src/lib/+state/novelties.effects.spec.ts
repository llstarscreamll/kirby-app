import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { DataPersistence } from '@nrwl/angular';
import { provideMockActions } from '@ngrx/effects/testing';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { NoveltiesFeatureEffects } from './novelties-feature.effects';

describe('NoveltiesEffects', () => {
  let actions: Observable<any>;
  let effects: NoveltiesFeatureEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true
            }
          }
        ),
        EffectsModule.forRoot([])
      ],
      providers: [
        NoveltiesFeatureEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: NoveltiesFacade, useValue: { get: params => true } }
      ]
    });

    effects = TestBed.inject(NoveltiesFeatureEffects);
  });

  it('should be defined', () => {
    expect(effects).toBeTruthy();
  });
});
