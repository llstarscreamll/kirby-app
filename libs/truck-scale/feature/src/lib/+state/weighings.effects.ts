import { map, tap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fetch, navigation, pessimisticUpdate } from '@nrwl/angular';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { actions } from './weighings.actions';
import { WeighingsService } from '../weighings.service';
import { EditWeighingPage } from '../pages/edit-weighing/edit-weighing.page';

@Injectable()
export class WeighingsEffects {
  private actions$ = inject(Actions);
  private service = inject(WeighingsService);
  private snackBarService = inject(MatSnackBar);

  createWeighing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createWeighing),
      pessimisticUpdate({
        run: (a) => this.service.createWeighing(a.data).pipe(map((r) => actions.createWeighingOk(r.data))),
        onError: (_, e) => actions.createWeighingError(e),
      })
    )
  );

  createWeighingOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.createWeighingOk),
        tap(() => this.snackBarService.open('Registro creado exitosamente!', 'Ok', { duration: 5000 }))
      ),
    { dispatch: false }
  );

  navigateToEditWeighingPage$ = createEffect(() =>
    this.actions$.pipe(
      navigation(EditWeighingPage, {
        run: (a) => this.service.getWeighing(a.params['id']).pipe(map((r) => actions.getWeighingOk(r.data))),
        onError: (_, e) => actions.getWeighingError(e),
      })
    )
  );

  searchWeighings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchWeighings),
      fetch({
        run: (a) => this.service.searchWeighings(a.query).pipe(map((r) => actions.searchWeighingsOk(r))),
        onError: (_, e) => actions.searchWeighingsError(e),
      })
    )
  );

  exportWeighings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.exportWeighings),
      fetch({
        run: (a) => this.service.exportWeighings(a.query).pipe(map((r) => actions.exportWeighingsOk())),
        onError: (_, e) => actions.exportWeighingsError(e),
      })
    )
  );

  exportWeighingsOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.exportWeighingsOk),
        tap(() => this.snackBarService.open('Se enviarán los datos a tu correo', 'Ok', { duration: 5000 }))
      ),
    { dispatch: false }
  );

  searchVehicles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchVehicles),
      fetch({
        run: (a) => this.service.searchVehicles(a.term).pipe(map((r) => actions.searchVehiclesOk(r.data))),
        onError: (a, e) => actions.searchVehiclesError(e),
      })
    )
  );

  searchDrivers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchDrivers),
      fetch({
        run: (a) => this.service.searchDrivers(a.term).pipe(map((r) => actions.searchDriversOk(r.data))),
        onError: (a, e) => actions.searchDriversError(e),
      })
    )
  );
}
