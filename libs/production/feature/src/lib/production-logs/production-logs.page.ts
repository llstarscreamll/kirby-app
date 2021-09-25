import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthFacade } from '@kirby/authentication/data-access';
import { ProductionFacade } from '../+state/production.facade';

@Component({
  selector: 'kirby-production-logs',
  templateUrl: './production-logs.page.html',
  styleUrls: ['./production-logs.page.scss'],
})
export class ProductionLogsPage implements OnInit {
  user$ = this.authFacade.authUser$;
  errors$ = this.productionFacade.errors$;
  productionLogs$ = this.productionFacade.productionLogs$;

  constructor(private authFacade: AuthFacade, private productionFacade: ProductionFacade) {}

  ngOnInit(): void {
    this.searchLogs();
  }

  searchLogs(query: any = {}) {
    this.productionFacade.searchProductionLogs({ include: 'employee,product,machine', ...query });
  }

  exportLogsToCsv() {
    this.productionFacade.exportToCsv({});
  }
}
