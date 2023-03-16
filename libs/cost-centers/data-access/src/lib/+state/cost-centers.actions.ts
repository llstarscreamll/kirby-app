import { Action, createActionGroup, emptyProps } from '@ngrx/store';
import { Pagination, ApiError } from '@kirby/shared';
import { CostCenter } from '@kirby/cost-centers/data';

export const costCentersActions = createActionGroup({
  source: 'costCenters',
  events: {
    'search': (payload: any) => ({ payload }),
    'search ok': (payload: Pagination<CostCenter>) => ({ payload }),
    'search error': (payload: ApiError) => ({ payload }),
  },
});
