import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { map, mergeMap, tap } from 'rxjs/operators';
import { createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';

import { PrinterService } from '../printer.service';
import * as fromProduction from './production.reducer';
import * as ProductionActions from './production.actions';
import { ProductionService } from '../production.service';
import { EditProductionLogPage } from '../edit-production-log/edit-production-log.page';
import { ProductionLogDetailsPage } from '../production-log-details/production-log-details.page';

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

  getProductionReport$ = createEffect(() =>
    this.dataPersistence.fetch(ProductionActions.getProductionReport, {
      run: (
        action: ReturnType<typeof ProductionActions.getProductionReport>,
        _: fromProduction.ProductionPartialState
      ) =>
        this.productionService
          .getReport(action.query)
          .pipe(map((response) => ProductionActions.getProductionReportOk(response))),

      onError: (_: ReturnType<typeof ProductionActions.getProductionReport>, error) =>
        ProductionActions.getProductionReportError({ error }),
    })
  );

  createProductionLog$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(ProductionActions.createLog, {
      run: (action: ReturnType<typeof ProductionActions.createLog>, _: fromProduction.ProductionPartialState) =>
        this.productionService
          .createProductionLog(action.data)
          .pipe(map((response) => ProductionActions.createLogOk({ productionLog: response.data }))),

      onError: (_: ReturnType<typeof ProductionActions.createLog>, error) =>
        ProductionActions.createLogError({ error }),
    })
  );

  createAndPrintProductionLog$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(ProductionActions.createAndPrintLog, {
      run: (action: ReturnType<typeof ProductionActions.createAndPrintLog>, _: fromProduction.ProductionPartialState) =>
        this.productionService
          .createProductionLog(action.data)
          .pipe(
            mergeMap((response) => [
              ProductionActions.createLogOk({ productionLog: response.data }),
              ProductionActions.printProductionLogTicket({ productionLog: response.data }),
            ])
          ),

      onError: (_: ReturnType<typeof ProductionActions.createAndPrintLog>, error) =>
        ProductionActions.createLogError({ error }),
    })
  );

  createProductionLogOk$ = createEffect(
    () =>
      this.dataPersistence.actions.pipe(
        ofType(ProductionActions.createLogOk),
        tap((_) => this.snackBar.open('Registro creado exitosamente', 'ok', { duration: 5000 }))
      ),
    { dispatch: false }
  );

  printProductionTicket$ = createEffect(
    () =>
      this.dataPersistence.actions.pipe(
        ofType(ProductionActions.printProductionLogTicket),
        tap((action) => this.printerService.print(action.productionLog))
      ),
    { dispatch: false }
  );

  navigateToProductionLogDetailPage$ = createEffect(() =>
    this.dataPersistence.navigation(ProductionLogDetailsPage, {
      run: (activatedRoute) => ProductionActions.getLog({ id: activatedRoute.paramMap.get('id') }),
    })
  );

  navigateToEditProductionLogPage$ = createEffect(() =>
    this.dataPersistence.navigation(EditProductionLogPage, {
      run: (activatedRoute) => ProductionActions.getLog({ id: activatedRoute.paramMap.get('id') }),
    })
  );

  getLog$ = createEffect(() =>
    this.dataPersistence.fetch(ProductionActions.getLog, {
      run: (action: ReturnType<typeof ProductionActions.getLog>) =>
        this.productionService
          .get(action.id)
          .pipe(map((response) => ProductionActions.getLogOk({ data: response.data }))),
    })
  );

  updateProductionLog$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(ProductionActions.updateLog, {
      run: (action: ReturnType<typeof ProductionActions.updateLog>, _: fromProduction.ProductionPartialState) =>
        this.productionService
          .updateProductionLog(action.id, action.data)
          .pipe(map((response) => ProductionActions.updateLogOk({ productionLog: response.data }))),

      onError: (_: ReturnType<typeof ProductionActions.updateLog>, error) =>
        ProductionActions.updateLogError({ error }),
    })
  );

  updateAndPrintProductionLog$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(ProductionActions.updateAndPrintLog, {
      run: (action: ReturnType<typeof ProductionActions.updateAndPrintLog>, _: fromProduction.ProductionPartialState) =>
        this.productionService
          .updateProductionLog(action.id, action.data)
          .pipe(
            mergeMap((response) => [
              ProductionActions.updateLogOk({ productionLog: response.data }),
              ProductionActions.printProductionLogTicket({ productionLog: action.data }),
            ])
          ),

      onError: (_: ReturnType<typeof ProductionActions.updateAndPrintLog>, error) =>
        ProductionActions.updateLogError({ error }),
    })
  );

  updateProductionLogOk$ = createEffect(
    () =>
      this.dataPersistence.actions.pipe(
        ofType(ProductionActions.updateLogOk),
        tap((_) => this.snackBar.open('Registro actualizado exitosamente', 'ok', { duration: 5000 })),
        tap((_) => this.router.navigate(['production']))
      ),
    { dispatch: false }
  );

  exportLogs$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(ProductionActions.exportLogs, {
      run: (action: ReturnType<typeof ProductionActions.exportLogs>) =>
        this.productionService
          .exportToCsv(action.query)
          .pipe(map((response) => ProductionActions.exportLogsOk({ data: response.data }))),
      onError: (_, error) => ProductionActions.exportLogsError({ error }),
    })
  );

  exportLogsOk$ = createEffect(
    () =>
      this.dataPersistence.actions.pipe(
        ofType(ProductionActions.exportLogsOk),
        tap((_) => this.snackBar.open('El archivo será enviado a tu correo', 'ok', { duration: 5000 }))
      ),
    { dispatch: false }
  );

  exportLogsError$ = createEffect(
    () =>
      this.dataPersistence.actions.pipe(
        ofType(ProductionActions.exportLogsError),
        tap((_) => this.snackBar.open('Error solicitando exportación de datos', 'ok', { duration: 5000 }))
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

  searchSubCostCenters$ = createEffect(() =>
    this.dataPersistence.fetch(ProductionActions.searchSubCostCenters, {
      run: (
        action: ReturnType<typeof ProductionActions.searchSubCostCenters>,
        _: fromProduction.ProductionPartialState
      ) =>
        this.productionService
          .searchSubCostCenters(action.query)
          .pipe(map((response) => ProductionActions.searchSubCostCentersOk(response))),

      onError: (_: ReturnType<typeof ProductionActions.searchSubCostCenters>, error) =>
        ProductionActions.searchSubCostCentersError({ error }),
    })
  );

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private printerService: PrinterService,
    private productionService: ProductionService,
    private dataPersistence: DataPersistence<fromProduction.ProductionPartialState>
  ) {}
}
