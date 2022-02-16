import { Subject, timer } from 'rxjs';
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
  machines$ = this.productionFacade.machines$;
  products$ = this.productionFacade.products$;
  pagination$ = this.productionFacade.pagination$;
  productionLogs$ = this.productionFacade.productionLogs$;
  subCostCenters$ = this.productionFacade.subCostCenters$;
  paginatedEmployees$ = this.employeesFacade.paginatedEmployees$;

  constructor(
    private authFacade: AuthFacade,
    private employeesFacade: EmployeesFacade,
    private productionFacade: ProductionFacade
  ) {}

  ngOnInit(): void {
    this.searchLogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  searchLogs(query: any = {}) {
    this.productionFacade.searchProductionLogs({ include: 'employee,product,machine', ...query });
  }

  searchEmployees(query) {
    this.employeesFacade.search(query);
  }

  searchMachines(query) {
    this.productionFacade.searchMachines(query);
  }

  searchProducts(query) {
    this.productionFacade.searchProducts(query);
  }

  searchSubCostCenters(query) {
    this.productionFacade.searchSubCostCenters(query);
  }

  exportLogsToCsv(filter) {
    this.productionFacade.exportToCsv({ filter });
  }
}
