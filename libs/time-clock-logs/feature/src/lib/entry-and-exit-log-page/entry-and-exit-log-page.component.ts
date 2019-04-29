import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { TimeClockLogsFacade } from "@llstarscreamll/time-clock-logs/data-access";

@Component({
  selector: 'llstarscreamll-entry-and-exit-log-page',
  templateUrl: './entry-and-exit-log-page.component.html',
  styleUrls: ['./entry-and-exit-log-page.component.scss']
})
export class EntryAndExitLogPageComponent implements OnInit, OnDestroy {

  public apiError$: Observable<any>;
  public creatingStatus$: Observable<any>;

  public constructor(private timeClockLogsFacade: TimeClockLogsFacade) { }

  public ngOnInit(): void {
    this.apiError$ = this.timeClockLogsFacade.apiError$;
    this.creatingStatus$ = this.timeClockLogsFacade.creatingStatus$;
  }

  public ngOnDestroy(): void {
    this.timeClockLogsFacade.cleanError();
  }

  public onCreateLogFormSubmitted(data: any) {
    this.timeClockLogsFacade.createEntryAndExitLog(data);
  }

}
