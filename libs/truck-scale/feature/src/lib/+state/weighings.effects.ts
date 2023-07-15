import { timer } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { fetch, navigation, pessimisticUpdate } from '@nrwl/angular';

import { actions } from './weighings.actions';
import { WeighingsService } from '../weighings.service';
import { EditWeighingPage } from '../pages/edit-weighing/edit-weighing.page';

@Injectable()
export class WeighingsEffects {
  private actions$ = inject(Actions);
  private service = inject(WeighingsService);
  private snackBarService = inject(MatSnackBar);

  getWeightLectureFlag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.getWeighingMachineLectureFlag),
      fetch({
        run: (_) =>
          this.service.getWeightLectureFlag().pipe(map((r) => actions.getWeighingMachineLectureFlagOk(r.data))),
        onError: (_, e) => actions.getWeighingMachineLectureFlagError(e),
      })
    )
  );

  toggleWeightLectureFlag$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.toggleWeighingMachineLectureFlag),
      fetch({
        run: (_) =>
          this.service
            .toggleWeighingMachineLectureFlag()
            .pipe(map((r) => actions.toggleWeighingMachineLectureFlagOk())),
        onError: (_, e) => actions.toggleWeighingMachineLectureFlagError(e),
      })
    )
  );

  startGetSettingsPolling$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.startGetWeighingMachineLectureFlagPolling),
      switchMap(() =>
        timer(0, 5 * 1000).pipe(
          map(() => actions.getWeighingMachineLectureFlag()),
          takeUntil(this.actions$.pipe(ofType(actions.stopGetWeighingMachineLectureFlagPolling)))
        )
      )
    )
  );

  toggleWeightLectureFlagOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.toggleWeighingMachineLectureFlagOk),
        tap((_) => this.snackBarService.open('Operación realizada correctamente!', 'OK', { duration: 5 * 1000 }))
      ),
    { dispatch: false }
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

  updateWeighing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.updateWeighing),
      pessimisticUpdate({
        run: (a) => this.service.updateWeighing(a.data.id, a.data).pipe(map((r) => actions.updateWeighingOk(r.data))),
        onError: (_, e) => actions.updateWeighingError(e),
      })
    )
  );

  updateWeighingOk$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actions.updateWeighingOk),
        tap(() => this.snackBarService.open('Registro actualizado exitosamente!', 'Ok', { duration: 5000 }))
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

  searchClients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchClients),
      fetch({
        run: (a) => this.service.searchClients(a.term).pipe(map((r) => actions.searchClientsOk(r.data))),
        onError: (a, e) => actions.searchClientsError(e),
      })
    )
  );

  searchCommodities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchCommodities),
      fetch({
        run: (a) => this.service.searchCommodities(a.term).pipe(map((r) => actions.searchCommoditiesOk(r.data))),
        onError: (a, e) => actions.searchCommoditiesError(e),
      })
    )
  );
}
