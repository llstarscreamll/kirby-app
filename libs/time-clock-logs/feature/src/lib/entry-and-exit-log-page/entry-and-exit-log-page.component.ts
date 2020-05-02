import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { TimeClockLogsFacade } from "@kirby/time-clock-logs/data-access";

@Component({
  selector: 'kirby-entry-and-exit-log-page',
  templateUrl: './entry-and-exit-log-page.component.html',
  styleUrls: ['./entry-and-exit-log-page.component.scss']
})
export class EntryAndExitLogPageComponent implements OnInit, OnDestroy {

  public apiError$: Observable<any>;
  public creatingStatus$: Observable<any>;
  public subCostCenters$: Observable<any>;
  public employeeTimeClockData$: Observable<any>;

  constructor(private timeClockLogsFacade: TimeClockLogsFacade) { }

  ngOnInit(): void {
    this.apiError$ = this.timeClockLogsFacade.apiError$;
    this.creatingStatus$ = this.timeClockLogsFacade.creatingStatus$;
    this.subCostCenters$ = this.timeClockLogsFacade.subCostCenters$;
    this.employeeTimeClockData$ = this.timeClockLogsFacade.employeeTimeClockData$;
  }

  ngOnDestroy(): void {
    this.timeClockLogsFacade.cleanError();
  }

  onCreateLogFormSubmitted(data: any) {
    this.timeClockLogsFacade.createEntryAndExitLog(data);
  }

  onCodeObtained(code: any) {
    this.timeClockLogsFacade.getTimeClockData(code);
  }

  onSearchSubCostCenters(code: any) {
    this.timeClockLogsFacade.searchSubCostCenters(code);
  }

}
