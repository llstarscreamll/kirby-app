import { map, tap } from 'rxjs/operators';
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/angular';

import { NoveltyTypesPartialState } from './novelty-types.reducer';
import {
  SearchNoveltyTypes,
  SearchNoveltyTypesOk,
  SearchNoveltyTypesError,
  NoveltyTypesActionTypes,
  CreateNoveltyType,
  CreateNoveltyTypeError,
  CreateNoveltyTypeOk,
  UpdateNoveltyType,
  UpdateNoveltyTypeOk,
  UpdateNoveltyTypeError,
  GetNoveltyType,
  GetNoveltyTypeOk,
  GetNoveltyTypeError,
  TrashNoveltyType,
  TrashNoveltyTypeOk,
  TrashNoveltyTypeError,
} from './novelty-types.actions';
import { NoveltyTypeService } from '../novelty-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class NoveltyTypesEffects {
  @Effect() searchNoveltyTypes$ = this.dataPersistence.fetch(
    NoveltyTypesActionTypes.Search,
    {
      run: (action: SearchNoveltyTypes, _: NoveltyTypesPartialState) =>
        this.noveltyTypeService
          .search(action.payload)
          .pipe(map((response) => new SearchNoveltyTypesOk(response))),

      onError: (_: SearchNoveltyTypes, error) =>
        new SearchNoveltyTypesError(error),
    }
  );

  @Effect() getNoveltyType$ = this.dataPersistence.fetch(
    NoveltyTypesActionTypes.Get,
    {
      run: (action: GetNoveltyType, _: NoveltyTypesPartialState) =>
        this.noveltyTypeService
          .get(action.payload)
          .pipe(map((response) => new GetNoveltyTypeOk(response.data))),

      onError: (_: GetNoveltyType, error) => new GetNoveltyTypeError(error),
    }
  );

  @Effect() createNoveltyType$ = this.dataPersistence.pessimisticUpdate(
    NoveltyTypesActionTypes.Create,
    {
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

      onError: (_: CreateNoveltyType, error) =>
        new CreateNoveltyTypeError(error),
    }
  );

  @Effect() updateNoveltyType$ = this.dataPersistence.pessimisticUpdate(
    NoveltyTypesActionTypes.Update,
    {
      run: (action: UpdateNoveltyType, _: NoveltyTypesPartialState) =>
        this.noveltyTypeService
          .update(action.payload.id, action.payload.data)
          .pipe(
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

      onError: (_: UpdateNoveltyType, error) =>
        new UpdateNoveltyTypeError(error),
    }
  );

  @Effect() trashNoveltyType$ = this.dataPersistence.optimisticUpdate(
    NoveltyTypesActionTypes.Trash,
    {
      run: (action: TrashNoveltyType, _: NoveltyTypesPartialState) =>
        this.noveltyTypeService.trash(action.payload).pipe(
          map((_) => new TrashNoveltyTypeOk(action.payload)),
          tap((_) =>
            this.snackBar.open('Tipo de novedad movida a la papelera!', 'Ok', {
              duration: 5 * 1000,
            })
          )
        ),

      undoAction: (_: TrashNoveltyType, error) =>
        new TrashNoveltyTypeError(error),
    }
  );

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private noveltyTypeService: NoveltyTypeService,
    private dataPersistence: DataPersistence<NoveltyTypesPartialState>
  ) {}
}
