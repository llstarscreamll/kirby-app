import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { noveltyTypesQuery as query } from './novelty-types.selectors';
import { noveltyTypesActions as actions } from './novelty-types.actions';

@Injectable()
export class NoveltyTypesFacade {
  paginatedNoveltyTypes$ = this.store.pipe(select(query.getPaginated));
  selectedNoveltyType$ = this.store.pipe(select(query.getSelected));
  errors$ = this.store.pipe(select(query.getError));

  constructor(private store: Store) {}

  search(query: any = {}) {
    this.store.dispatch(actions.search(query));
  }

  get(noveltyTypeId: string) {
    this.store.dispatch(actions.get(noveltyTypeId));
  }

  cleanSelected() {
    this.store.dispatch(actions.getOk(null));
  }

  create(data: any = {}) {
    this.store.dispatch(actions.create(data));
  }

  update(noveltyTypeId: string, data: any = {}) {
    this.store.dispatch(actions.update({ id: noveltyTypeId, data }));
  }

  trash(noveltyTypeId: string) {
    this.store.dispatch(actions.trash(noveltyTypeId));
  }
}
