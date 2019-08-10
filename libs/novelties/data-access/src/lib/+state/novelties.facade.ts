import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { noveltiesQuery } from './novelties.selectors';
import { NoveltiesPartialState } from './novelties.reducer';
import { SearchNovelties, GetNovelty, SearchNoveltyTypes, UpdateNovelty } from './novelties.actions';

@Injectable()
export class NoveltiesFacade {
  public loaded$ = this.store.pipe(select(noveltiesQuery.getLoaded));
  public paginatedNovelties$ = this.store.pipe(select(noveltiesQuery.getPaginatedList));
  public paginatedNoveltyTypes$ = this.store.pipe(select(noveltiesQuery.getPaginatedNoveltyTypesList));
  public selectedNovelty$ = this.store.pipe(select(noveltiesQuery.getSelectedNovelty));

  public constructor(private store: Store<NoveltiesPartialState>) { }

  public search(query: any = {}) {
    this.store.dispatch(new SearchNovelties(query));
  }

  public get(noveltyId: string) {
    this.store.dispatch(new GetNovelty(noveltyId));
  }

  public update(noveltyId: string, noveltyData) {
    this.store.dispatch(new UpdateNovelty({ id: noveltyId, noveltyData }));
  }

  /**
   * @todo move all related stuff from novelty types to specific lib
   * @param query
   */
  public searchNoveltyTypes(query: any = {}) {
    this.store.dispatch(new SearchNoveltyTypes(query));
  }
}
