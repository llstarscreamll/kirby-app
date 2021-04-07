import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ProductionLog } from './production.models';
import { ProductionEffects } from './production.effects';
import { ProductionFacade } from './production.facade';

import * as ProductionSelectors from './production.selectors';
import * as ProductionActions from './production.actions';
import { PRODUCTION_FEATURE_KEY, State, initialState, reducer } from './production.reducer';

interface TestSchema {
  production: State;
}

describe('ProductionFacade', () => {
  let facade: ProductionFacade;
  let store: Store<TestSchema>;
  const createProductionEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ProductionLog);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PRODUCTION_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ProductionEffects]),
        ],
        providers: [ProductionFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ProductionFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allProduction$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ProductionActions.loadProduction());

        list = await readFirst(facade.allProduction$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadProductionSuccess` to manually update list
     */
    it('allProduction$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allProduction$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ProductionActions.loadProductionSuccess({
            production: [createProductionEntity('AAA'), createProductionEntity('BBB')],
          })
        );

        list = await readFirst(facade.allProduction$);
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
