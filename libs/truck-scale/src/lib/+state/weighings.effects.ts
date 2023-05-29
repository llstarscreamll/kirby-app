import { map, tap } from 'rxjs/operators';
import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { actions } from './weighings.actions';
import { WeighingsService } from '../weighings.service';

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

  searchWeighings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchWeighings),
      fetch({
        run: (a) => this.service.searchWeighings(a.query).pipe(map((r) => actions.searchWeighingsOk(r))),
        onError: (_, e) => actions.searchWeighingsError(e),
      })
    )
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
