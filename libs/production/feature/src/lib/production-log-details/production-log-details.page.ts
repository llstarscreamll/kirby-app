import { Component, OnInit } from '@angular/core';
import { ProductionFacade } from '../+state/production.facade';

@Component({
  selector: 'kirby-production-log-details',
  templateUrl: './production-log-details.page.html',
  styleUrls: ['./production-log-details.page.scss'],
})
export class ProductionLogDetailsPage implements OnInit {
  productionLog$ = this.production.selectedProductionLog$;

  constructor(private production: ProductionFacade) {}

  ngOnInit(): void {}

  printTicket(productionLog) {
    this.production.printProductionLogTicket(productionLog);
  }
}
