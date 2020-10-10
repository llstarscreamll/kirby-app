import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { createEffect, Actions } from '@ngrx/effects';

import * as actions from './categories.actions';
import * as fromCategories from './categories.reducer';
import { CategoriesService } from '../categories.service';

@Injectable()
export class CategoriesEffects {
  searchCategories$ = createEffect(() =>
    this.dataPersistence.fetch(actions.searchCategories, {
      run: (
        action: ReturnType<typeof actions.searchCategories>,
        state: fromCategories.CategoriesPartialState
      ) => {
        return this.categoriesService
          .search(action.query)
          .pipe(map((response) => actions.searchCategoriesOk({ response })));
      },

      onError: (action: ReturnType<typeof actions.searchCategories>, error) => {
        console.error('Error', error);
        return actions.searchCategoriesFailure({ error });
      },
    })
  );

  getCategoryBySlug$ = createEffect(() =>
    this.dataPersistence.fetch(actions.getCategoryBySlug, {
      run: (action: ReturnType<typeof actions.getCategoryBySlug>) => {
        return this.categoriesService
          .getBySlug(action.slug, action.query)
          .pipe(
            map((response) =>
              actions.getCategoryBySlugOk({ category: response.data })
            )
          );
      },

      onError: (
        action: ReturnType<typeof actions.getCategoryBySlug>,
        error
      ) => {
        console.error('Error', error);
        return null;
      },
    })
  );

  constructor(
    private actions$: Actions,
    private categoriesService: CategoriesService,
    private dataPersistence: DataPersistence<
      fromCategories.CategoriesPartialState
    >
  ) {}
}
