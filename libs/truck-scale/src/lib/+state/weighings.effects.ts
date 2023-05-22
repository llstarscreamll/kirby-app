import { of } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { actions } from './weighings.actions';

@Injectable()
export class WeighingsEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.searchWeighings),
      switchMap(() => of(actions.loadWeighingsSuccess([]))),
      catchError((error) => of(actions.loadWeighingsFailure(error)))
    )
  );
}
