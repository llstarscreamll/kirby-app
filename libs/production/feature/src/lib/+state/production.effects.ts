import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as fromProduction from './production.reducer';
import * as ProductionActions from './production.actions';

@Injectable()
export class ProductionEffects {
  loadProduction$ = createEffect(() =>
    this.dataPersistence.fetch(ProductionActions.loadProduction, {
      run: (
        action: ReturnType<typeof ProductionActions.loadProduction>,
        state: fromProduction.ProductionPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        return ProductionActions.loadProductionSuccess({ production: [] });
      },

      onError: (action: ReturnType<typeof ProductionActions.loadProduction>, error) => {
        console.error('Error', error);
        return ProductionActions.loadProductionFailure({ error });
      },
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromProduction.ProductionPartialState>
  ) {}
}
