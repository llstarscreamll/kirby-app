import { of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as actions from './weighings.actions';

@Injectable()
export class WeighingsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.initWeighings),
      switchMap(() => of(actions.loadWeighingsSuccess({ weighings: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(actions.loadWeighingsFailure({ error }));
      })
    )
  );
}
