import { createActionGroup } from '@ngrx/store';

import { Pagination, ApiError } from '@kirby/shared';
import { INoveltyType } from '@kirby/novelty-types/data';

export const noveltyTypesActions = createActionGroup({
  source: 'NoveltyTypes',
  events: {
    search: (payload: any) => ({ payload }),
    'search ok': (payload: Pagination<INoveltyType>) => ({ payload }),
    'search error': (payload: ApiError) => ({ payload }),

    get: (payload: string) => ({ payload }),
    'get ok': (payload: INoveltyType) => ({ payload }),
    'get error': (payload: ApiError) => ({ payload }),

    create: (payload: any) => ({ payload }),
    'create ok': (payload: INoveltyType) => ({ payload }),
    'create error': (payload: ApiError) => ({ payload }),

    update: (payload: { id: string; data: any }) => ({ payload }),
    'update ok': (payload: INoveltyType) => ({ payload }),
    'update error': (payload: ApiError) => ({ payload }),

    trash: (payload: string) => ({ payload }),
    'trash ok': (payload: string) => ({ payload }),
    'trash error': (payload: ApiError) => ({ payload }),

    'set error': (payload: ApiError) => ({ payload }),
  },
});
