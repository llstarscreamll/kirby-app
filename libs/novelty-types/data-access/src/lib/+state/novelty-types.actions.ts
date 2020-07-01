import { Action } from '@ngrx/store';

import { Pagination, ApiError } from '@kirby/shared';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data';

export enum NoveltyTypesActionTypes {
  Search = '[NoveltyTypes] search',
  SearchOk = '[NoveltyTypes] search ok',
  SearchError = '[NoveltyTypes] search error',

  Get = '[NoveltyTypes] get',
  GetOk = '[NoveltyTypes] get ok',
  GetError = '[NoveltyTypes] get error',

  Create = '[NoveltyTypes] create',
  CreateOk = '[NoveltyTypes] create ok',
  CreateError = '[NoveltyTypes] create error',

  Update = '[NoveltyTypes] update',
  UpdateOk = '[NoveltyTypes] update ok',
  UpdateError = '[NoveltyTypes] update error',

  Trash = '[NoveltyTypes] trash',
  TrashOk = '[NoveltyTypes] trash ok',
  TrashError = '[NoveltyTypes] trash error',

  SetError = '[NoveltyTypes] set error',
}

export class SearchNoveltyTypes implements Action {
  readonly type = NoveltyTypesActionTypes.Search;
  constructor(public payload: any) {}
}

export class SearchNoveltyTypesOk implements Action {
  readonly type = NoveltyTypesActionTypes.SearchOk;
  constructor(public payload: Pagination<NoveltyTypeInterface>) {}
}

export class SearchNoveltyTypesError implements Action {
  readonly type = NoveltyTypesActionTypes.SearchError;
  constructor(public payload: ApiError) {}
}

export class GetNoveltyType implements Action {
  readonly type = NoveltyTypesActionTypes.Get;
  constructor(public payload: string) {}
}

export class GetNoveltyTypeOk implements Action {
  readonly type = NoveltyTypesActionTypes.GetOk;
  constructor(public payload: NoveltyTypeInterface) {}
}

export class GetNoveltyTypeError implements Action {
  readonly type = NoveltyTypesActionTypes.GetError;
  constructor(public payload: ApiError) {}
}

export class CreateNoveltyType implements Action {
  readonly type = NoveltyTypesActionTypes.Create;
  constructor(public payload: any) {}
}

export class CreateNoveltyTypeOk implements Action {
  readonly type = NoveltyTypesActionTypes.CreateOk;
  constructor(public payload: NoveltyTypeInterface) {}
}

export class CreateNoveltyTypeError implements Action {
  readonly type = NoveltyTypesActionTypes.CreateError;
  constructor(public payload: ApiError) {}
}

export class UpdateNoveltyType implements Action {
  readonly type = NoveltyTypesActionTypes.Update;
  constructor(public payload: { id: string; data: any }) {}
}

export class UpdateNoveltyTypeOk implements Action {
  readonly type = NoveltyTypesActionTypes.UpdateOk;
  constructor(public payload: NoveltyTypeInterface) {}
}

export class UpdateNoveltyTypeError implements Action {
  readonly type = NoveltyTypesActionTypes.UpdateError;
  constructor(public payload: ApiError) {}
}


export class TrashNoveltyType implements Action {
  readonly type = NoveltyTypesActionTypes.Trash;
  constructor(public payload: string) {}
}

export class TrashNoveltyTypeOk implements Action {
  readonly type = NoveltyTypesActionTypes.TrashOk;
  constructor(public payload: string) {}
}

export class TrashNoveltyTypeError implements Action {
  readonly type = NoveltyTypesActionTypes.TrashError;
  constructor(public payload: ApiError) {}
}

export class SetError implements Action {
  readonly type = NoveltyTypesActionTypes.SetError;
  constructor(public payload: ApiError) {}
}

export type NoveltyTypesAction =
  | SearchNoveltyTypes
  | SearchNoveltyTypesOk
  | SearchNoveltyTypesError
  | GetNoveltyType
  | GetNoveltyTypeOk
  | GetNoveltyTypeError
  | CreateNoveltyType
  | CreateNoveltyTypeOk
  | CreateNoveltyTypeError
  | UpdateNoveltyType
  | UpdateNoveltyTypeOk
  | UpdateNoveltyTypeError
  | TrashNoveltyType
  | TrashNoveltyTypeOk
  | TrashNoveltyTypeError
  | SetError;

export const fromNoveltyTypesActions = {
  SearchNoveltyTypes,
  SearchNoveltyTypesOk,
  SearchNoveltyTypesError,
  GetNoveltyType,
  GetNoveltyTypeOk,
  GetNoveltyTypeError,
  CreateNoveltyType,
  CreateNoveltyTypeOk,
  CreateNoveltyTypeError,
  UpdateNoveltyType,
  UpdateNoveltyTypeOk,
  UpdateNoveltyTypeError,
  TrashNoveltyType,
  TrashNoveltyTypeOk,
  TrashNoveltyTypeError,
  SetError,
};
