import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Pagination } from '@kirby/shared';
import { User } from '@kirby/users/util';
import { NoveltyModel } from '@kirby/novelties/data';
import { AuthFacade } from '@kirby/authentication-data-access';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'kirby-novelties-page',
  templateUrl: './novelties-page.component.html',
  styleUrls: ['./novelties-page.component.scss']
})
export class NoveltiesPageComponent implements OnInit, OnDestroy {
  public novelties$: Observable<Pagination<NoveltyModel>>;
  public user$: Observable<User>;
  private user: User;
  private destroy$ = new Subject();
  public searchQuery = {};
  private searchOptions = {
    orderBy: 'created_at',
    sortedBy: 'desc'
  };

  constructor(
    private noveltiesFacade: NoveltiesFacade,
    private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    this.novelties$ = this.noveltiesFacade.paginatedNovelties$;
    this.user$ = this.authFacade.authUser$;
    this.user$
      .pipe(
        tap(user => (this.user = user)),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.searchNovelties();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.noveltiesFacade.cleanNoveltiesSearch();
  }

  searchNovelties(query: any = {}) {
    this.searchQuery = { ...this.searchQuery, ...query };
    this.noveltiesFacade.search({ ...this.searchOptions, ...this.searchQuery });
  }

  shortName(approver: { first_name: string; last_name: string }) {
    return [
      approver.first_name
        .trim()
        .split(' ')
        .shift(),
      approver.last_name
        .trim()
        .split(' ')
        .shift()
    ].join(' ');
  }

  showApproveButton(novelty: NoveltyModel): boolean {
    return (
      this.user &&
      this.user.can('novelties.approvals.create') &&
      !novelty.isApprovedByUserId(this.user.id)
    );
  }

  showDeleteApprovalButton(novelty: NoveltyModel): boolean {
    return (
      this.user &&
      this.user.can('novelties.approvals.delete') &&
      novelty.isApprovedByUserId(this.user.id)
    );
  }

  approveNovelty(novelty: NoveltyModel) {
    this.noveltiesFacade.approve(novelty.id, this.user);
  }

  deleteNoveltyApproval(novelty: NoveltyModel) {
    this.noveltiesFacade.deleteNoveltyApproval(novelty.id, this.user);
  }
}
