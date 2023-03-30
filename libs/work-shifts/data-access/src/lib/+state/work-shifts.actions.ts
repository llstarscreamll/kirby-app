import { createActionGroup } from '@ngrx/store';

import { Pagination, ApiError } from '@kirby/shared';
import { WorkShiftInterface } from '@kirby/work-shifts/util';

export const workShiftsActionTypes = createActionGroup({
  source: 'WorkShifts',
  events: {
    search: (payload: any) => ({ payload }),
    'search ok': (payload: Pagination<WorkShiftInterface>) => ({ payload }),
    'search error': (payload: ApiError) => ({ payload }),

    create: (payload: WorkShiftInterface) => ({ payload }),
    'create ok': (payload: WorkShiftInterface) => ({ payload }),
    'create error': (payload: ApiError) => ({ payload }),

    get: (payload: string) => ({ payload }),
    'get ok': (payload: WorkShiftInterface) => ({ payload }),
    'get error': (payload: ApiError) => ({ payload }),

    update: (payload: { id: string; data: WorkShiftInterface }) => ({ payload }),
    'update ok': (payload: WorkShiftInterface) => ({ payload }),
    'update error': (payload: ApiError) => ({ payload }),

    delete: (payload: string) => ({ payload }),
    'delete ok': (payload: string) => ({ payload }),
    'delete error': (payload: ApiError) => ({ payload }),
  },
});
