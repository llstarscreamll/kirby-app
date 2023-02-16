import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetch, optimisticUpdate, pessimisticUpdate } from '@nrwl/angular';

import {
  CreateNoveltyType,
  CreateNoveltyTypeError,
  CreateNoveltyTypeOk,
  GetNoveltyType,
  GetNoveltyTypeError,
  GetNoveltyTypeOk,
  NoveltyTypesActionTypes,
  SearchNoveltyTypes,
  SearchNoveltyTypesError,
  SearchNoveltyTypesOk,
  TrashNoveltyType,
  TrashNoveltyTypeError,
  TrashNoveltyTypeOk,
  UpdateNoveltyType,
  UpdateNoveltyTypeError,
  UpdateNoveltyTypeOk,
} from './novelty-types.actions';
import { NoveltyTypeService } from '../novelty-type.service';
import { NoveltyTypesPartialState } from './novelty-types.reducer';

@Injectable()
export class NoveltyTypesEffects {
  searchNoveltyTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoveltyTypesActionTypes.Search),
      fetch({
        run: (action: SearchNoveltyTypes, _: NoveltyTypesPartialState) =>
          this.noveltyTypeService.search(action.payload).pipe(map((response) => new SearchNoveltyTypesOk(response))),

        onError: (_: SearchNoveltyTypes, error) => new SearchNoveltyTypesError(error),
      })
    )
  );

  getNoveltyType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoveltyTypesActionTypes.Get),
      fetch({
        run: (action: GetNoveltyType, _: NoveltyTypesPartialState) =>
          this.noveltyTypeService.get(action.payload).pipe(map((response) => new GetNoveltyTypeOk(response.data))),

        onError: (_: GetNoveltyType, error) => new GetNoveltyTypeError(error),
      })
    )
  );

  createNoveltyType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoveltyTypesActionTypes.Create),
      pessimisticUpdate({
        run: (action: CreateNoveltyType, _: NoveltyTypesPartialState) =>
          this.noveltyTypeService.create(action.payload).pipe(
            map((response) => new CreateNoveltyTypeOk(response.data)),
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

        onError: (_: CreateNoveltyType, error) => new CreateNoveltyTypeError(error),
      })
    )
  );

  updateNoveltyType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NoveltyTypesActionTypes.Update),
      pessimisticUpdate({
        run: (action: UpdateNoveltyType, _: NoveltyTypesPartialState) =>
          this.noveltyTypeService.update(action.payload.id, action.payload.data).pipe(
            map((response) => new UpdateNoveltyTypeOk(response.data)),
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

        onError: (_: UpdateNoveltyType, error) => new UpdateNoveltyTypeError(error),
      })
    )
  );

  trashNoveltyType$ = this.actions$.pipe(
    ofType(NoveltyTypesActionTypes.Trash),
    optimisticUpdate({
      run: (action: TrashNoveltyType, _: NoveltyTypesPartialState) =>
        this.noveltyTypeService.trash(action.payload).pipe(
          map((_) => new TrashNoveltyTypeOk(action.payload)),
          tap((_) =>
            this.snackBar.open('Tipo de novedad movida a la papelera!', 'Ok', {
              duration: 5 * 1000,
            })
          )
        ),

      undoAction: (_: TrashNoveltyType, error) => new TrashNoveltyTypeError(error),
    })
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private snackBar: MatSnackBar,
    private noveltyTypeService: NoveltyTypeService
  ) {}
}
