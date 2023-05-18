import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate, pessimisticUpdate } from '@nrwl/angular';

import { NoveltyTypeService } from '../novelty-type.service';
import { noveltyTypesActions as actions } from './novelty-types.actions';

@Injectable()
export class NoveltyTypesEffects {
  searchNoveltyTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.search),
      fetch({
        run: (action) =>
          this.noveltyTypeService.search(action.payload).pipe(map((response) => actions.searchOk(response))),

        onError: (_, error) => actions.searchError(error),
      })
    )
  );

  getNoveltyType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.get),
      fetch({
        run: (action) =>
          this.noveltyTypeService.get(action.payload).pipe(map((response) => actions.getOk(response.data))),

        onError: (_, error) => actions.getError(error),
      })
    )
  );

  createNoveltyType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.create),
      pessimisticUpdate({
        run: (action) =>
          this.noveltyTypeService.create(action.payload).pipe(
            map((response) => actions.createOk(response.data)),
            tap((_) =>
              this.snackBar.open('Tipo de novedad creada!', 'Ok', {
                duration: 5 * 1000,
              })
            ),
            /**
             * @todo fix this hard coded route navigation, see:
             * https://stackoverflow.com/a/38810729/3395068
             */
            tap((_) => this.router.navigate(['novelties/novelty-types']))
          ),

        onError: (_, error) => actions.createError(error),
      })
    )
  );

  updateNoveltyType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.update),
      pessimisticUpdate({
        run: (action) =>
          this.noveltyTypeService.update(action.payload.id, action.payload.data).pipe(
            map((response) => actions.updateOk(response.data)),
            tap((_) =>
              this.snackBar.open('Tipo de novedad actualizada!', 'Ok', {
                duration: 5 * 1000,
              })
            ),
            /**
             * @todo fix this hard coded route navigation, see:
             * https://stackoverflow.com/a/38810729/3395068
             */
            tap((_) => this.router.navigate(['novelties/novelty-types']))
          ),

        onError: (_, error) => actions.updateError(error),
      })
    )
  );

  trashNoveltyType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.trash),
      optimisticUpdate({
        run: (action) =>
          this.noveltyTypeService.trash(action.payload).pipe(
            map((_) => actions.trashOk(action.payload)),
            tap((_) =>
              this.snackBar.open('Tipo de novedad movida a la papelera!', 'Ok', {
                duration: 5 * 1000,
              })
            )
          ),

        undoAction: (_, error) => actions.trashError(error),
      })
    )
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private noveltyTypeService: NoveltyTypeService
  ) {}
}
