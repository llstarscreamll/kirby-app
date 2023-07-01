import { createActionGroup, emptyProps } from '@ngrx/store';

import { ApiError, Pagination } from '@kirby/shared';

import { Driver, Vehicle, Weighing } from './models';

export const actions = createActionGroup({
  source: 'Weighings',
  events: {
    'search weighings': (query: any = {}) => ({ query }),
    'search weighings ok': (paginatedWeighings: Pagination<any>) => ({ paginatedWeighings }),
    'search weighings error': (error: ApiError) => ({ error }),
    'create weighing': (data: any) => ({ data }),
    'create weighing ok': (id: string) => ({ data: id }),
    'create weighing error': (error: ApiError) => ({ error }),
    'update weighing': (data: any) => ({ data }),
    'update weighing ok': (id: string) => ({ data: id }),
    'update weighing error': (error: ApiError) => ({ error }),
    'get weighing': (id: string) => ({ id }),
    'get weighing ok': (data: any) => ({ data }),
    'get weighing error': (error: ApiError) => ({ error }),
    'export weighings': (query: any = {}) => ({ query }),
    'export weighings ok': emptyProps(),
    'export weighings error': (error: ApiError) => ({ error }),

    'search vehicles': (term: string) => ({ term }),
    'search vehicles ok': (vehicles: Vehicle[]) => ({ vehicles }),
    'search vehicles error': (error: ApiError) => ({ error }),

    'search drivers': (term: string) => ({ term }),
    'search drivers ok': (drivers: Driver[]) => ({ drivers }),
    'search drivers error': (error: ApiError) => ({ error }),

    'search clients': (term: string) => ({ term }),
    'search clients ok': (clients: { name: string }[]) => ({ clients }),
    'search clients error': (error: ApiError) => ({ error }),

    'search commodities': (term: string) => ({ term }),
    'search commodities ok': (commodities: { name: string }[]) => ({ commodities }),
    'search commodities error': (error: ApiError) => ({ error }),

    'clean selected': () => emptyProps(),
    'clean errors': () => emptyProps(),
  },
});
