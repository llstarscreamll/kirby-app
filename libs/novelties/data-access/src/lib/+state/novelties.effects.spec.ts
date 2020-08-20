import { Observable } from 'rxjs';
import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { hot } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { TestBed, async } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { NoveltyService } from '../novelty.service';
import { NoveltiesEffects } from './novelties.effects';
import { SearchNovelties, SearchNoveltiesOk } from './novelties.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

describe('NoveltiesEffects', () => {
  let actions: Observable<any>;
  let effects: NoveltiesEffects;

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
        NoveltiesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        { provide: MatSnackBar, useValue: {} },
        { provide: NoveltyService, useValue: { get: () => true } },
        { provide: Router, useValue: { navigate: () => true } }
      ]
    });

    effects = TestBed.inject(NoveltiesEffects);
  });

  it('should be defined', () => {
    expect(effects).toBeTruthy();
  });
});
