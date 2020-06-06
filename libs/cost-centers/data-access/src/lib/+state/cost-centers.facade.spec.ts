import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CostCentersEffects } from './cost-centers.effects';
import { CostCentersFacade } from './cost-centers.facade';

import { costCentersQuery } from './cost-centers.selectors';
import { LoadCostCenters, CostCentersLoaded } from './cost-centers.actions';
import {
  CostCentersState,
  Entity,
  initialState,
  reducer
} from './cost-centers.reducer';

interface TestSchema {
  costCenters: CostCentersState;
}

describe('CostCentersFacade', () => {
  let facade: CostCentersFacade;
  let store: Store<TestSchema>;
  let createCostCenters;

  beforeEach(() => {
    createCostCenters = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature('costCenters', reducer, { initialState }),
          EffectsModule.forFeature([CostCentersEffects])
        ],
        providers: [CostCentersFacade]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(CostCentersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allCostCenters$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.loadAll();

        list = await readFirst(facade.allCostCenters$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `CostCentersLoaded` to manually submit list for state management
     */
    it('allCostCenters$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allCostCenters$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          new CostCentersLoaded([
            createCostCenters('AAA'),
            createCostCenters('BBB')
          ])
        );

        list = await readFirst(facade.allCostCenters$);
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
