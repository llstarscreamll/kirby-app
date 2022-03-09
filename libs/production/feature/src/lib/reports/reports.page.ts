import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartConfiguration } from 'chart.js';
import { Component, OnInit } from '@angular/core';

import { ProductionFacade } from '../+state/production.facade';
import { TagOptions } from '@kirby/production/ui';
import moment from 'moment';

@Component({
  selector: 'kirby-reports',
  templateUrl: './reports.page.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ReportsPage implements OnInit {
  errors$ = this.productionFacade.errors$;
  chartLabels$: Observable<string[]> = this.productionFacade.productionReport$.pipe(
    map((report) => report.map((r) => r.short_name))
  );
  data$ = this.productionFacade.productionReport$.pipe(
    map((report) => [
      {
        data: report.map((r) => r.kgs),
        borderWidth: 3,
        hoverBorderColor: 'rgba(59,130,246,0.9)',
        hoverBackgroundColor: 'rgba(59,130,246,0.5)',
        backgroundColor: 'rgba(59,130,246,0.3)',
        borderColor: 'rgba(59,130,246,0.6)',
      },
    ])
  );
  totalKgs$ = this.productionFacade.productionReport$.pipe(
    map((data) => data.reduce((acc, row) => acc + parseFloat(row.kgs), 0).toFixed(2))
  );

  chartOptions: ChartConfiguration['options'] = {
    // indexAxis: 'y', // this line works on the latest version og ng2-chart
    responsive: true,
  };
  searchFormDefaults = {
    tags: [TagOptions[0]],
    tagUpdatedAtStart: moment().startOf('month').format('YYYY-MM-DDTHH:mm'),
    tagUpdatedAtEnd: moment().endOf('day').format('YYYY-MM-DDTHH:mm'),
  };

  constructor(private productionFacade: ProductionFacade) {}

  ngOnInit(): void {
    this.productionFacade.getProductionReport(this.searchFormDefaults);
  }

  getReport(filter) {
    this.productionFacade.getProductionReport({ filter });
  }
}
