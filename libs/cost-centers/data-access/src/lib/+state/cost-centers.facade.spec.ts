import { of } from 'rxjs';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';

import { emptyPagination } from '@kirby/shared';

import { CostCentersFacade } from './cost-centers.facade';
import { CostCentersEffects } from './cost-centers.effects';
import { CostCentersService } from '../cost-centers.service';
import { costCentersActions as actions } from './cost-centers.actions';
import { CostCentersState, costCentersReducer } from './cost-centers.reducer';

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
      name: name || `name-${id}`,
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(costCentersReducer), EffectsModule.forFeature([CostCentersEffects])],
        providers: [CostCentersFacade, { provide: CostCentersService, useValue: { search: (q) => q } }],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(CostCentersFacade);
      costCenterService = TestBed.inject(CostCentersService);
    });

    it('search(...) should return paginated list', async () => {
      let paginatedList = await readFirst(facade.paginatedList$);

      expect(paginatedList.data.length).toBe(0);

      const query = { search: 'foo' };
      const serviceResponse = emptyPagination();
      jest.spyOn(costCenterService, 'search').mockReturnValue(
        of({
          ...serviceResponse,
          data: [createCostCenters('AAA'), createCostCenters('BBB')],
        })
      );

      facade.search(query);
      paginatedList = await readFirst(facade.paginatedList$);

      expect(paginatedList.data.length).toBe(2);
    });

    it('paginatedList$ should return paginated list', async () => {
      let page = await readFirst(facade.paginatedList$);

      expect(page.data.length).toBe(0);

      store.dispatch(
        actions.searchOk({
          ...emptyPagination(),
          data: [createCostCenters('AAA'), createCostCenters('BBB')],
        })
      );

      page = await readFirst(facade.paginatedList$);

      expect(page.data.length).toBe(2);
    });
  });
});
