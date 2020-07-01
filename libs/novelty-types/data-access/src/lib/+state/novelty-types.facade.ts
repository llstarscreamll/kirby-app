import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import {
  GetNoveltyType,
  CreateNoveltyType,
  SearchNoveltyTypes,
  UpdateNoveltyType,
  TrashNoveltyType,
  GetNoveltyTypeOk,
} from './novelty-types.actions';
import { noveltyTypesQuery as query } from './novelty-types.selectors';
import { NoveltyTypesPartialState } from './novelty-types.reducer';

@Injectable()
export class NoveltyTypesFacade {
  paginatedNoveltyTypes$ = this.store.pipe(select(query.getPaginated));

  selectedNoveltyType$ = this.store.pipe(select(query.getSelected));

  errors$ = this.store.pipe(select(query.getError));

  constructor(private store: Store<NoveltyTypesPartialState>) {}

  search(query: any = {}) {
    this.store.dispatch(new SearchNoveltyTypes(query));
  }

  get(noveltyTypeId: string) {
    this.store.dispatch(new GetNoveltyType(noveltyTypeId));
  }

  cleanSelected() {
    this.store.dispatch(new GetNoveltyTypeOk(null));
  }

  create(data: any = {}) {
    this.store.dispatch(new CreateNoveltyType(data));
  }

  update(noveltyTypeId: string, data: any = {}) {
    this.store.dispatch(new UpdateNoveltyType({ id: noveltyTypeId, data }));
  }

  trash(noveltyTypeId: string) {
    this.store.dispatch(new TrashNoveltyType(noveltyTypeId));
  }
}
