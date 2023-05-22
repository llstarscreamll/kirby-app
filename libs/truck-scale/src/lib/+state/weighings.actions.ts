import { createActionGroup } from '@ngrx/store';

import { ApiError } from '@kirby/shared';

import { WeighingsEntity } from './weighings.models';

export const actions = createActionGroup({
  source: 'Weighings',
  events: {
    'search vehicles': (term: string) => ({ term }),
    'search weighings': (query: any = {}) => ({ query }),
    'search weighings ok': (weighings: WeighingsEntity[]) => ({ weighings }),
    'search weighings error': (error: ApiError) => ({ error }),
  },
});
