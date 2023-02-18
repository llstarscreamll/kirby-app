import { of } from 'rxjs';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import {
  CostCentersState,
  initialState,
  reducer
} from './cost-centers.reducer';
import { emptyPagination } from '@kirby/shared';
import { CostCentersFacade } from './cost-centers.facade';
import { CostCentersEffects } from './cost-centers.effects';
import { SearchCostCentersOk } from './cost-centers.actions';
import { CostCentersService } from '../cost-centers.service';

interface TestSchema {
  costCenters: CostCentersState;
}

describe('CostCentersFacade', () => {
  let createCostCenters;
  let facade: CostCentersFacade;
  let store: Store<TestSchema>;
  let costCenterService: CostCentersService;

  beforeEach(() => {
    createCostCenters = (id: string, name = '') => ({
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
        providers: [
          CostCentersFacade,
          { provide: CostCentersService, useValue: { search: q => q } }
        ]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [

          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CostCentersFacade);
      costCenterService = TestBed.inject(CostCentersService);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('search(...) should return paginated list', async done => {
      try {
        let paginatedList = await readFirst(facade.paginatedList$);

        expect(paginatedList.data.length).toBe(0);

        const query = { search: 'foo' };
        const serviceResponse = emptyPagination();
       jest.spyOn(costCenterService, 'search').mockReturnValue(
          of({
            ...serviceResponse,
            data: [createCostCenters('AAA'), createCostCenters('BBB')]
          })
        );

        facade.search(query);
        paginatedList = await readFirst(facade.paginatedList$);

        expect(paginatedList.data.length).toBe(2);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `CostCentersLoaded` to manually submit list for state management
     */
    it('paginatedList$ should return paginated list', async done => {
      try {
        let page = await readFirst(facade.paginatedList$);

        expect(page.data.length).toBe(0);

        store.dispatch(
          new SearchCostCentersOk({
            ...emptyPagination(),
            data: [createCostCenters('AAA'), createCostCenters('BBB')]
          })
        );

        page = await readFirst(facade.paginatedList$);

        expect(page.data.length).toBe(2);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
