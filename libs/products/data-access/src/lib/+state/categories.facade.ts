import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as actions from './categories.actions';
import * as fromCategories from './categories.reducer';
import * as CategoriesSelectors from './categories.selectors';
import { QuerySearch } from './categories.actions';

@Injectable()
export class CategoriesFacade {
  paginatingStatus$ = this.store.pipe(
    select(CategoriesSelectors.getCategoriesLoaded)
  );
  paginated$ = this.store.pipe(select(CategoriesSelectors.getPaginated));
  selected$ = this.store.pipe(select(CategoriesSelectors.getSelected));
  selectedCategories$ = this.store.pipe(
    select(CategoriesSelectors.getSelected)
  );

  constructor(private store: Store<fromCategories.CategoriesPartialState>) {}

  search({ query }: { query: QuerySearch }) {
    this.store.dispatch(actions.searchCategories({ query }));
  }

  getBySlug(slug: string, query: any = {}) {
    this.store.dispatch(actions.getCategoryBySlug({ slug, query }));
  }
}
