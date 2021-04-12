import { NxModule } from '@nrwl/angular';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import { ProductionLog } from './production.models';
import { ProductionFacade } from './production.facade';
import { ProductionEffects } from './production.effects';
import * as ProductionActions from './production.actions';
import * as ProductionSelectors from './production.selectors';
import { PRODUCTION_FEATURE_KEY, State, initialState, reducer } from './production.reducer';
import { ProductionService } from '../production.service';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        providers: [
          ProductionFacade,
          { provide: ProductionService, useValue: { searchProductionLogs: (_) => of({ data: [], meta: {} }) } },
          { provide: MatSnackBar, useValue: { open: (_) => true } },
        ],
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
        let list = await readFirst(facade.productionLogs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(ProductionActions.searchLogs({ query: { search: 'foo' } }));

        list = await readFirst(facade.productionLogs$);
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
        let list = await readFirst(facade.productionLogs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          ProductionActions.searchLogsOk({
            data: [createProductionEntity('AAA'), createProductionEntity('BBB')],
            meta: {},
          })
        );

        list = await readFirst(facade.productionLogs$);
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
