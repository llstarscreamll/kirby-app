import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/nx/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { NoveltiesEffects } from './novelties.effects';
import { NoveltiesFacade } from './novelties.facade';

import { noveltiesQuery } from './novelties.selectors';
import { SearchNovelties, SearchNoveltiesOk } from './novelties.actions';
import {
  NoveltiesState,
  Entity,
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
  let createNovelties;

  beforeEach(() => {
    createNovelties = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

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
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(NoveltiesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.paginatedNovelties$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.search();

        list = await readFirst(facade.paginatedNovelties$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `NoveltiesLoaded` to manually submit list for state management
     */
    it('allNovelties$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.paginatedNovelties$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new SearchNoveltiesOk([createNovelties('AAA'), createNovelties('BBB')])
        );

        list = await readFirst(facade.paginatedNovelties$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
