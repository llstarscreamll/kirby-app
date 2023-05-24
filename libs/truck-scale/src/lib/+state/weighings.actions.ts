import { createActionGroup } from '@ngrx/store';

import { ApiError } from '@kirby/shared';

import { Vehicle, Weighing } from './models';

export const actions = createActionGroup({
  source: 'Weighings',
  events: {
    'search vehicles': (term: string) => ({ term }),
    'search vehicles ok': (vehicles: Vehicle[]) => ({ vehicles }),
    'search vehicles error': (error: ApiError) => ({ error }),
    'search weighings': (query: any = {}) => ({ query }),
    'search weighings ok': (weighings: Weighing[]) => ({ weighings }),
    'search weighings error': (error: ApiError) => ({ error }),
  },
});
