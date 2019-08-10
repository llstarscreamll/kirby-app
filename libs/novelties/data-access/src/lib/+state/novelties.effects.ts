import { map } from "rxjs/operators";
import { Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { DataPersistence } from '@nrwl/nx';

import { NoveltiesPartialState } from './novelties.reducer';
import {
  SearchNovelties,
  SearchNoveltiesOk,
  SearchNoveltiesError,
  NoveltiesActionTypes,
  GetNoveltyOk,
  GetNovelty,
  GetNoveltyError,
  SearchNoveltyTypesOk,
  SearchNoveltyTypesError,
  UpdateNovelty,
  UpdateNoveltyOk,
  UpdateNoveltyError
} from './novelties.actions';
import { NoveltyService } from '../novelty.service';

@Injectable()
export class NoveltiesEffects {

  @Effect() searchNovelties$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.SearchNovelties,
    {
      run: (action: SearchNovelties, state: NoveltiesPartialState) => this.noveltyService
        .search(action.payload)
        .pipe(map(apiResponse => new SearchNoveltiesOk(apiResponse))),
      onError: (action: SearchNovelties, error) => new SearchNoveltiesError(error)
    }
  );

  @Effect() searchNoveltyTypes$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.SearchNoveltyTypes,
    {
      run: (action: SearchNovelties) => this.noveltyService
        .searchNoveltyTypes(action.payload)
        .pipe(map(apiResponse => new SearchNoveltyTypesOk(apiResponse))),
      onError: (action: SearchNovelties, error) => new SearchNoveltyTypesError(error)
    }
  );

  @Effect() getNovelty$ = this.dataPersistence.fetch(
    NoveltiesActionTypes.GetNovelty,
    {
      run: (action: GetNovelty) => this.noveltyService
        .get(action.payload)
        .pipe(map(apiResponse => new GetNoveltyOk(apiResponse))),
      onError: (action: GetNovelty, error) => new GetNoveltyError(error)
    }
  );

  @Effect() updateNovelty$ = this.dataPersistence.optimisticUpdate(
    NoveltiesActionTypes.UpdateNovelty,
    {
      run: (action: UpdateNovelty) => this.noveltyService
        .update(action.payload.id, action.payload.noveltyData)
        .pipe(map(response => new UpdateNoveltyOk({ id: action.payload.id, noveltyData: response }))),
      undoAction: (action: UpdateNovelty, error: any) => new UpdateNoveltyError({ ...action.payload, error })
    }
  );

  public constructor(
    private noveltyService: NoveltyService,
    private dataPersistence: DataPersistence<NoveltiesPartialState>
  ) { }
}
