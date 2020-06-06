import { Action } from '@ngrx/store';
import { Entity } from './cost-centers.reducer';
import { Pagination, ApiError } from '@kirby/shared';
import { CostCenter } from '@kirby/cost-centers/data/src';

export enum CostCentersActionTypes {
  LoadCostCenters = '[CostCenters] Load CostCenters',
  CostCentersLoaded = '[CostCenters] CostCenters Loaded',
  CostCentersLoadError = '[CostCenters] CostCenters Load Error',
  SearchCostCenters = '[CostCenters] search',
  SearchCostCentersOk = '[CostCenters] search ok',
  SearchCostCentersError = '[CostCenters] search error'
}

export class SearchCostCenters implements Action {
  readonly type = CostCentersActionTypes.SearchCostCenters;
  constructor(public payload: any) {}
}

export class SearchCostCentersOk implements Action {
  readonly type = CostCentersActionTypes.SearchCostCentersOk;
  constructor(public payload: Pagination<CostCenter>) {}
}

export class SearchCostCentersError implements Action {
  readonly type = CostCentersActionTypes.SearchCostCentersError;
  constructor(public payload: ApiError) {}
}

export class LoadCostCenters implements Action {
  readonly type = CostCentersActionTypes.LoadCostCenters;
}

export class CostCentersLoadError implements Action {
  readonly type = CostCentersActionTypes.CostCentersLoadError;
  constructor(public payload: any) {}
}

export class CostCentersLoaded implements Action {
  readonly type = CostCentersActionTypes.CostCentersLoaded;
  constructor(public payload: Entity[]) {}
}

export type CostCentersAction =
  | LoadCostCenters
  | CostCentersLoaded
  | CostCentersLoadError
  | SearchCostCenters
  | SearchCostCentersOk
  | SearchCostCentersError;

export const fromCostCentersActions = {
  LoadCostCenters,
  CostCentersLoaded,
  CostCentersLoadError,
  SearchCostCenters,
  SearchCostCentersOk,
  SearchCostCentersError
};
