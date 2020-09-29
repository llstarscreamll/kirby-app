import { Observable, of } from 'rxjs';
import { hot, cold } from '@nrwl/angular/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { provideMockActions } from '@ngrx/effects/testing';

import { emptyPagination } from '@kirby/shared';
import { CategoriesEffects } from './categories.effects';
import { CategoriesService } from '../categories.service';
import * as CategoriesActions from './categories.actions';

describe('CategoriesEffects', () => {
  let actions: Observable<any>;
  let service: CategoriesService;
  let effects: CategoriesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CategoriesEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: CategoriesService,
          useValue: { search: () => of(emptyPagination()) },
        },
      ],
    });

    effects = TestBed.inject(CategoriesEffects);
    service = TestBed.inject(CategoriesService);
  });

  describe('search', () => {
    it('should return searchCategoriesOk on success api response', () => {
      const apiResponse = emptyPagination();
      spyOn(service, 'search').and.returnValue(
        cold('r|', { r: apiResponse })
      );

      actions = hot('-a-|', {
        a: CategoriesActions.searchCategories({ query: { sort: 'position' } }),
      });

      const expected = hot('-a-|', {
        a: CategoriesActions.searchCategoriesOk({ response: apiResponse }),
      });

      expect(effects.searchCategories$).toBeObservable(expected);
      expect(service.search).toHaveBeenCalledWith({ sort: 'position' });
    });
  });
});
