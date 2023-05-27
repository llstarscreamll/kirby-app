import { of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { catchError, map, switchMap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { actions } from './weighings.actions';
import { WeighingsService } from '../weighings.service';
import { fetch, pessimisticUpdate } from '@nrwl/angular';

@Injectable()
export class WeighingsEffects {
  private actions$ = inject(Actions);
  private service = inject(WeighingsService);

  createWeighing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.createWeighing),
      pessimisticUpdate({
        run: (a) => this.service.createWeighing(a.data).pipe(map((r) => actions.createWeighingOk(r.data))),
        onError: (_, e) => actions.createWeighingError(e),
      })
    )
  );

  searchWeighings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchWeighings),
      switchMap(() => of(actions.searchWeighingsOk([]))),
      catchError((error) => of(actions.searchWeighingsError(error)))
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
