import { createActionGroup } from '@ngrx/store';

import { ApiError } from '@kirby/shared';

import { Driver, Vehicle, Weighing } from './models';

export const actions = createActionGroup({
  source: 'Weighings',
  events: {
    'create weighing': (data: any) => ({ data }),
    'create weighing ok': (id: string) => ({ data: id }),
    'create weighing error': (error: ApiError) => ({ error }),
    'search vehicles': (term: string) => ({ term }),
    'search vehicles ok': (vehicles: Vehicle[]) => ({ vehicles }),
    'search vehicles error': (error: ApiError) => ({ error }),
    'search drivers': (term: string) => ({ term }),
    'search drivers ok': (drivers: Driver[]) => ({ drivers }),
    'search drivers error': (error: ApiError) => ({ error }),
    'search weighings': (query: any = {}) => ({ query }),
    'search weighings ok': (weighings: Weighing[]) => ({ weighings }),
    'search weighings error': (error: ApiError) => ({ error }),
  },
});
