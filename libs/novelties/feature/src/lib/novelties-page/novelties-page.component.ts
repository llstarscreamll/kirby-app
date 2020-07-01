import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators/tap';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '@kirby/users/util';
import { NoveltyModel } from '@kirby/novelties/data';
import { AuthFacade } from '@kirby/authentication-data-access';
import { NoveltiesFacade } from '@kirby/novelties/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { CostCentersFacade } from '@kirby/cost-centers/data-access/src';

@Component({
  selector: 'kirby-novelties-page',
  templateUrl: './novelties-page.component.html',
  styleUrls: ['./novelties-page.component.scss']
})
export class NoveltiesPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public user$ = this.authFacade.authUser$;
  public errors$ = this.noveltiesFacade.error$;
  public novelties$ = this.noveltiesFacade.paginatedNovelties$;
  public paginatedCostCenters$ = this.costCentersFacade.paginatedList$;
  public paginatedEmployees$ = this.employeesFacade.paginatedEmployees$;
  public paginatedNoveltyTypes$ = this.noveltiesFacade.paginatedNoveltyTypes$;

  private user: User;
  public searchQuery = {};
  private searchOptions = {
    orderBy: 'created_at',
    sortedBy: 'desc'
  };

  constructor(
    private authFacade: AuthFacade,
    private employeesFacade: EmployeesFacade,
    private noveltiesFacade: NoveltiesFacade,
    private costCentersFacade: CostCentersFacade
  ) {}

  ngOnInit() {
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

  searchCostCenters(query: any = {}) {
    this.costCentersFacade.search(query);
  }

  searchEmployees(query) {
    this.employeesFacade.search(query);
  }

  searchNoveltyTypes(query) {
    this.noveltiesFacade.searchNoveltyTypes(query);
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
