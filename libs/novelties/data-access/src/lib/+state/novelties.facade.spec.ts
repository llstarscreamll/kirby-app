import { NxModule } from '@nrwl/angular';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';

import { NoveltiesEffects } from './novelties.effects';
import { NoveltiesFacade } from './novelties.facade';
import {
  NoveltiesState,
  initialState,
  noveltiesReducer
} from './novelties.reducer';
import { NoveltyService } from '../novelty.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface TestSchema {
  novelties: NoveltiesState;
}

describe('NoveltiesFacade', () => {
  let facade: NoveltiesFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('novelties', noveltiesReducer, {
            initialState
          }),
          EffectsModule.forFeature([NoveltiesEffects])
        ],
        providers: [
          NoveltiesFacade,
          { provide: MatSnackBar, useValue: {} },
          { provide: NoveltyService, useValue: { get: () => true } },
          { provide: Router, useValue: { navigate: () => true } }
        ]
      })
      class CustomFeatureModule {}

      @NgModule({
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
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(NoveltiesFacade);
    });

    it('should be defined', () => {
      expect(facade).toBeTruthy();
    });
  });
});
