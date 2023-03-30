import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideMockActions } from '@ngrx/effects/testing';

import { NoveltyService } from '../novelty.service';
import { NoveltiesEffects } from './novelties.effects';

describe('NoveltiesEffects', () => {
  let actions: Observable<any>;
  let effects: NoveltiesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true,
            },
          }
        ),
        EffectsModule.forRoot([]),
      ],
      providers: [
        NoveltiesEffects,
        provideMockActions(() => actions),
        { provide: MatSnackBar, useValue: {} },
        { provide: NoveltyService, useValue: { get: () => true } },
        { provide: Router, useValue: { navigate: () => true } },
      ],
    });

    effects = TestBed.inject(NoveltiesEffects);
  });

  it('should be defined', () => {
    expect(effects).toBeTruthy();
  });
});
