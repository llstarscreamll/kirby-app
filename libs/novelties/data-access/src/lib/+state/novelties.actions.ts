import { Action } from '@ngrx/store';

import { Pagination } from '@llstarscreamll/shared';
import { NoveltyInterface } from '@llstarscreamll/novelties/data/src';
import { NoveltyTypeInterface } from '@llstarscreamll/novelty-types/data';

export enum NoveltiesActionTypes {
  SearchNovelties = '[Novelties] search',
  SearchNoveltiesOk = '[Novelties] search ok',
  SearchNoveltiesError = '[Novelties] search error',

  GetNovelty = '[Novelties] get',
  GetNoveltyOk = '[Novelties] get ok',
  GetNoveltyError = '[Novelties] get error',

  CleanSelectedNovelty = '[Novelties] clean selected',

  UpdateNovelty = '[Novelties] update',
  UpdateNoveltyOk = '[Novelties] update ok',
  UpdateNoveltyError = '[Novelties] update error',

  SearchNoveltyTypes = '[NoveltyTypes] search',
  SearchNoveltyTypesOk = '[NoveltyTypes] search ok',
  SearchNoveltyTypesError = '[NoveltyTypes] search error',
}

export class SearchNovelties implements Action {
  readonly type = NoveltiesActionTypes.SearchNovelties;
  public constructor(public payload: any = {}) { }
}

export class SearchNoveltiesOk implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltiesOk;
  constructor(public payload: Pagination<NoveltyInterface>) { }
}

export class SearchNoveltiesError implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltiesError;
  constructor(public payload: any) { }
}

export class GetNovelty implements Action {
  readonly type = NoveltiesActionTypes.GetNovelty;
  constructor(public payload: any) { }
}

export class GetNoveltyOk implements Action {
  readonly type = NoveltiesActionTypes.GetNoveltyOk;
  constructor(public payload: NoveltyInterface) { }
}

export class GetNoveltyError implements Action {
  readonly type = NoveltiesActionTypes.GetNoveltyError;
  constructor(public payload: any) { }
}

export class CleanSelectedNovelty implements Action {
  readonly type = NoveltiesActionTypes.CleanSelectedNovelty;
}

export class UpdateNovelty implements Action {
  readonly type = NoveltiesActionTypes.UpdateNovelty;
  constructor(public payload: { id: string, noveltyData: any }) { }
}

export class UpdateNoveltyOk implements Action {
  readonly type = NoveltiesActionTypes.UpdateNoveltyOk;
  constructor(public payload: { id: string, noveltyData: any }) { }
}

export class UpdateNoveltyError implements Action {
  readonly type = NoveltiesActionTypes.UpdateNoveltyError;
  constructor(public payload: { id: string, noveltyData: any, error: any }) { }
}

export class SearchNoveltyTypes implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltyTypes;
  public constructor(public payload: any = {}) { }
}

export class SearchNoveltyTypesOk implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltyTypesOk;
  constructor(public payload: Pagination<NoveltyTypeInterface>) { }
}

export class SearchNoveltyTypesError implements Action {
  readonly type = NoveltiesActionTypes.SearchNoveltyTypesError;
  constructor(public payload: any) { }
}

export type NoveltiesAction =
  | SearchNovelties
  | SearchNoveltiesOk
  | SearchNoveltiesError
  | GetNovelty
  | GetNoveltyOk
  | GetNoveltyError
  | CleanSelectedNovelty
  | UpdateNovelty
  | UpdateNoveltyOk
  | UpdateNoveltyError
  | SearchNoveltyTypes
  | SearchNoveltyTypesOk
  | SearchNoveltyTypesError;

export const fromNoveltiesActions = {
  SearchNovelties,
  SearchNoveltiesOk,
  SearchNoveltiesError,
  GetNovelty,
  GetNoveltyOk,
  GetNoveltyError,
  CleanSelectedNovelty,
  UpdateNovelty,
  UpdateNoveltyOk,
  UpdateNoveltyError,
  SearchNoveltyTypes,
  SearchNoveltyTypesOk,
  SearchNoveltyTypesError,
};
