import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { map } from 'rxjs/internal/operators/map';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromProducts from './products.reducer';
import * as ProductsActions from './products.actions';
import { ProductsService } from '../products.service';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.dataPersistence.fetch(ProductsActions.searchProducts, {
      run: (
        action: ReturnType<typeof ProductsActions.searchProducts>,
        state: fromProducts.ProductsPartialState
      ) => {
        return this.productsService
          .search(action.query)
          .pipe(
            map((paginatedProducts) =>
              ProductsActions.searchProductsOk({ paginatedProducts })
            )
          );
      },

      onError: (
        action: ReturnType<typeof ProductsActions.searchProducts>,
        error
      ) => {
        console.error('Error', error);
        return ProductsActions.searchProductsError({ error });
      },
    })
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private dataPersistence: DataPersistence<fromProducts.ProductsPartialState>
  ) {}
}
