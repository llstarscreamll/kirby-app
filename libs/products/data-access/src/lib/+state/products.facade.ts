import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromProducts from './products.reducer';
import * as ProductsSelectors from './products.selectors';

@Injectable()
export class ProductsFacade {
  loaded$ = this.store.pipe(select(ProductsSelectors.getProductsLoaded));
  allProducts$ = this.store.pipe(select(ProductsSelectors.getAllProducts));
  selectedProducts$ = this.store.pipe(select(ProductsSelectors.getSelected));

  constructor(private store: Store<fromProducts.ProductsPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
