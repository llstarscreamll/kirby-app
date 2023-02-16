import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { hot, cold } from 'jasmine-marbles';
import { EffectsModule } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { emptyPagination } from '@kirby/shared';

import { CostCentersEffects } from './cost-centers.effects';
import { CostCentersService } from '../cost-centers.service';
import { SearchCostCenters, SearchCostCentersOk } from './cost-centers.actions';

describe('CostCentersEffects', () => {
  let actions: Observable<any>;
  let effects: CostCentersEffects;
  let costCenterService: CostCentersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
        CostCentersEffects,
        { provide: CostCentersService, useValue: { search: (q) => q } },
        provideMockActions(() => actions),
      ],
    });

    effects = TestBed.inject(CostCentersEffects);
    costCenterService = TestBed.inject(CostCentersService);
  });

  describe('searchCostCenters$', () => {
    it('should work', () => {
      const query = { search: 'foo' };
      const serviceResponse = emptyPagination();
      jest.spyOn(costCenterService, 'search').mockReturnValue(
        cold('a|', {
          a: serviceResponse,
        })
      );

      actions = hot('-a-|', { a: new SearchCostCenters(query) });

      expect(effects.searchCostCenters$).toBeObservable(hot('-a-|', { a: new SearchCostCentersOk(serviceResponse) }));
      expect(costCenterService.search).toHaveBeenCalledWith(query);
    });
  });
});
