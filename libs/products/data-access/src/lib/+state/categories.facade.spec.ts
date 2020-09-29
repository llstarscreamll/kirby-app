import { of } from 'rxjs';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import { Category } from '@kirby/products/data';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import * as actions from './categories.actions';
import { emptyPagination } from '@kirby/shared';
import { CategoriesFacade } from './categories.facade';
import { CategoriesEffects } from './categories.effects';
import { CategoriesService } from '../categories.service';
import { CATEGORIES_FEATURE_KEY, State, reducer } from './categories.reducer';

interface TestSchema {
  categories: State;
}

describe('CategoriesFacade', () => {
  let facade: CategoriesFacade;
  let store: Store<TestSchema>;
  const createCategoriesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as Category);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CATEGORIES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CategoriesEffects]),
        ],
        providers: [
          CategoriesFacade,
          {
            provide: CategoriesService,
            useValue: { search: () => of(emptyPagination()) },
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(CategoriesFacade);
    });

    it('search() should call searchCategories(...) action', () => {
      spyOn(store, 'dispatch');

      facade.search({ query: { sort: 'position' } });

      expect(store.dispatch).toHaveBeenCalledWith(
        actions.searchCategories({
          query: { sort: 'position' },
        })
      );
    });

    /**
     * Use `loadCategoriesSuccess` to manually update list
     */
    it('allCategories$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.paginated$);
        let status = await readFirst(facade.paginatingStatus$);

        expect(list.data.length).toBe(0);
        expect(status).toBe(false);

        store.dispatch(
          actions.searchCategoriesOk({
            response: {
              ...emptyPagination(),
              data: [
                createCategoriesEntity('AAA'),
                createCategoriesEntity('BBB'),
              ],
            },
          })
        );

        list = await readFirst(facade.paginated$);
        status = await readFirst(facade.paginatingStatus$);

        expect(list.data.length).toBe(2);
        expect(status).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
