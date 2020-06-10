import { Action } from '@ngrx/store';
import { Pagination, ApiError } from '@kirby/shared';
import { CostCenter } from '@kirby/cost-centers/data/src';

export enum CostCentersActionTypes {
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

export type CostCentersAction =
  | SearchCostCenters
  | SearchCostCentersOk
  | SearchCostCentersError;

export const fromCostCentersActions = {
  SearchCostCenters,
  SearchCostCentersOk,
  SearchCostCentersError
};
