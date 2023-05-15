import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as WeighingsActions from './weighings.actions';
import * as WeighingsFeature from './weighings.reducer';

import { switchMap, catchError, of } from 'rxjs';

@Injectable()
export class WeighingsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeighingsActions.initWeighings),
      switchMap(() => of(WeighingsActions.loadWeighingsSuccess({ weighings: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(WeighingsActions.loadWeighingsFailure({ error }));
      })
    )
  );
}
