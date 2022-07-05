import { Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthFacade } from '@kirby/authentication/data-access';
import { EmployeesFacade } from '@kirby/employees/data-access';
import { ProductionFacade } from '../+state/production.facade';

@Component({
  selector: 'kirby-production-logs',
  templateUrl: './production-logs.page.html',
})
export class ProductionLogsPage implements OnInit, OnDestroy {
  destroy$ = new Subject();
  user$ = this.authFacade.authUser$;
  errors$ = this.productionFacade.errors$;
  pagination$ = this.productionFacade.pagination$;
  productionLogs$ = this.productionFacade.productionLogs$;

  constructor(private authFacade: AuthFacade, private productionFacade: ProductionFacade) {}

  ngOnInit(): void {
    this.searchLogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchLogs(query: any = {}, pagination: any = {}) {
    this.productionFacade.searchProductionLogs({ include: 'employee,product,machine', ...query, ...pagination });
  }

  exportLogsToCsv(filter) {
    this.productionFacade.exportToCsv({ filter });
  }
}
