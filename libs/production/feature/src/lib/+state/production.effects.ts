import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromProduction from './production.reducer';
import * as ProductionActions from './production.actions';
import { ProductionService } from '../production.service';

@Injectable()
export class ProductionEffects {
  searchProductionLogs$ = createEffect(() =>
    this.dataPersistence.fetch(ProductionActions.searchLogs, {
      run: (action: ReturnType<typeof ProductionActions.searchLogs>, _: fromProduction.ProductionPartialState) =>
        this.productionService
          .searchProductionLogs(action.query)
          .pipe(map((response) => ProductionActions.searchLogsOk(response))),

      onError: (_: ReturnType<typeof ProductionActions.searchLogs>, error) =>
        ProductionActions.searchLogsError({ error }),
    })
  );

  createProductionLog$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(ProductionActions.createLog, {
      run: (action: ReturnType<typeof ProductionActions.createLog>, _: fromProduction.ProductionPartialState) =>
        this.productionService
          .createProductionLog(action.data)
          .pipe(map((response) => ProductionActions.createLogOk(response.data))),

      onError: (_: ReturnType<typeof ProductionActions.createLog>, error) =>
        ProductionActions.createLogError({ error }),
    })
  );

  createProductionOk$ = createEffect(
    () =>
      this.dataPersistence.actions.pipe(
        ofType(ProductionActions.createLogOk),
        tap((_) => this.snackBar.open('Registro creado exitosamente', 'ok', { duration: 5000 }))
      ),
    { dispatch: false }
  );

  // ######################################################################## //

  searchProducts$ = createEffect(() =>
    this.dataPersistence.fetch(ProductionActions.searchProducts, {
      run: (action: ReturnType<typeof ProductionActions.searchProducts>, _: fromProduction.ProductionPartialState) =>
        this.productionService
          .searchProducts(action.query)
          .pipe(map((response) => ProductionActions.searchProductsOk(response))),

      onError: (_: ReturnType<typeof ProductionActions.searchProducts>, error) =>
        ProductionActions.searchProductsError({ error }),
    })
  );

  searchMachines$ = createEffect(() =>
    this.dataPersistence.fetch(ProductionActions.searchMachines, {
      run: (action: ReturnType<typeof ProductionActions.searchMachines>, _: fromProduction.ProductionPartialState) =>
        this.productionService
          .searchMachines(action.query)
          .pipe(map((response) => ProductionActions.searchMachinesOk(response))),

      onError: (_: ReturnType<typeof ProductionActions.searchMachines>, error) =>
        ProductionActions.searchMachinesError({ error }),
    })
  );

  searchCustomers$ = createEffect(() =>
    this.dataPersistence.fetch(ProductionActions.searchCustomers, {
      run: (action: ReturnType<typeof ProductionActions.searchCustomers>, _: fromProduction.ProductionPartialState) =>
        this.productionService
          .searchCustomers(action.query)
          .pipe(map((response) => ProductionActions.searchCustomersOk(response))),

      onError: (_: ReturnType<typeof ProductionActions.searchCustomers>, error) =>
        ProductionActions.searchCustomersError({ error }),
    })
  );

  constructor(
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private productionService: ProductionService,
    private dataPersistence: DataPersistence<fromProduction.ProductionPartialState>
  ) {}
}
