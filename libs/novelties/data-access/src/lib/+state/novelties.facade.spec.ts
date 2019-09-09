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
          { provide: NoveltyService, useValue: { get: () => true } }
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

      store = TestBed.get(Store);
      facade = TestBed.get(NoveltiesFacade);
    });

    it('should be defined', () => {
      expect(facade).toBeTruthy();
    });
  });
});
