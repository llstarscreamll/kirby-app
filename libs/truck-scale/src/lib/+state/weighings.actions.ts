import { createActionGroup } from '@ngrx/store';

import { ApiError } from '@kirby/shared';

import { WeighingsEntity } from './weighings.models';

export const actions = createActionGroup({
  source: 'Weighings',
  events: {
    'search vehicles': (term: string) => ({ term }),
    'search weighings': (query: any = {}) => ({ query }),
    'load weighings success': (weighings: WeighingsEntity[]) => ({ weighings }),
    'load weighings failure': (error: ApiError) => ({ error }),
  },
});
