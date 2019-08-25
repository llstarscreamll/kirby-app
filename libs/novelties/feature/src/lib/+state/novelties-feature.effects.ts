import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

// @todo fix the ../src import issue
import {
  NoveltiesFacade,
  NoveltiesPartialState
} from '@llstarscreamll/novelties/data-access';
import { EditNoveltyPageComponent } from '../edit-novelty/edit-novelty-page.component';
import { NoveltiesActionTypes } from '@llstarscreamll/novelties/data-access/src/lib/+state/novelties.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class NoveltiesFeatureEffects {
  @Effect() getNovelty$ = this.dataPersistence.navigation(
    EditNoveltyPageComponent,
    {
      run: (routerSnapShot: ActivatedRouteSnapshot) =>
        this.noveltiesFacade.get(routerSnapShot.params['id']),
      onError: () => {}
    }
  );

  @Effect({ dispatch: false }) updateNoveltyOk$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.UpdateNoveltyOk),
    tap(action => this.snackBar.open('Novedad actualizada correctamente', 'Ok'))
  );

  @Effect({ dispatch: false }) updateNoveltyError$ = this.actions$.pipe(
    ofType(NoveltiesActionTypes.UpdateNoveltyError),
    tap(action => this.snackBar.open('Error actualizando la novedad', 'Ok'))
  );

  constructor(
    private snackBar: MatSnackBar,
    private actions$: Actions,
    private noveltiesFacade: NoveltiesFacade,
    private dataPersistence: DataPersistence<NoveltiesPartialState>
  ) {}
}
