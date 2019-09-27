import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { noveltiesQuery } from './novelties.selectors';
import { NoveltiesPartialState } from './novelties.reducer';
import {
  SearchNovelties,
  GetNovelty,
  SearchNoveltyTypes,
  UpdateNovelty,
  GetNoveltyOk,
  CleanSelectedNovelty,
  CreateNoveltiesToEmployees,
  CleanApiErrors,
  ResetCreateNoveltiesToEmployees,
  ApproveNovelty,
  DeleteNoveltyApproval
} from './novelties.actions';
import { UserInterface } from '@kirby/users/util/src';

@Injectable()
export class NoveltiesFacade {
  public loaded$ = this.store.pipe(select(noveltiesQuery.getLoaded));
  public error$ = this.store.pipe(select(noveltiesQuery.getError));
  public createNoveltiesToEmployeesStatus$ = this.store.pipe(
    select(noveltiesQuery.getCreateNoveltiesToEmployeesStatus)
  );
  public paginatedNovelties$ = this.store.pipe(
    select(noveltiesQuery.getPaginatedList)
  );
  public paginatedNoveltyTypes$ = this.store.pipe(
    select(noveltiesQuery.getPaginatedNoveltyTypesList)
  );
  public selectedNovelty$ = this.store.pipe(
    select(noveltiesQuery.getSelectedNovelty)
  );

  public constructor(private store: Store<NoveltiesPartialState>) {}

  public search(query: any = {}) {
    this.store.dispatch(new SearchNovelties(query));
  }

  public get(noveltyId: string) {
    this.store.dispatch(new GetNovelty(noveltyId));
  }

  public update(noveltyId: string, noveltyData) {
    this.store.dispatch(new UpdateNovelty({ id: noveltyId, noveltyData }));
  }

  public createNoveltiesToEmployees(data) {
    this.store.dispatch(new CreateNoveltiesToEmployees(data));
  }

  /**
   * @todo move all related stuff from novelty types to specific lib
   * @param query
   */
  public searchNoveltyTypes(query: any = {}) {
    this.store.dispatch(new SearchNoveltyTypes(query));
  }

  public cleanSelected() {
    this.store.dispatch(new CleanSelectedNovelty());
  }

  public resetCreateNoveltiesToEmployees() {
    this.store.dispatch(new ResetCreateNoveltiesToEmployees());
  }

  public cleanApiErrors() {
    this.store.dispatch(new CleanApiErrors());
  }

  public approve(noveltyId: string, user: UserInterface) {
    this.store.dispatch(new ApproveNovelty({ noveltyId, user }));
  }

  public deleteNoveltyApproval(noveltyId: string, user: UserInterface) {
    this.store.dispatch(new DeleteNoveltyApproval({ noveltyId, user }));
  }
}
