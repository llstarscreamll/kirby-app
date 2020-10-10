import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as actions from './products.actions';
import * as fromProducts from './products.reducer';
import * as ProductsSelectors from './products.selectors';

@Injectable()
export class ProductsFacade {
  loaded$ = this.store.pipe(select(ProductsSelectors.getProductsLoaded));
  paginatedProducts$ = this.store.pipe(select(ProductsSelectors.getPaginated));
  selectedProducts$ = this.store.pipe(select(ProductsSelectors.getSelected));

  constructor(private store: Store<fromProducts.ProductsPartialState>) {}

  search(query: any) {
    this.store.dispatch(actions.searchProducts({ query }));
  }
}
