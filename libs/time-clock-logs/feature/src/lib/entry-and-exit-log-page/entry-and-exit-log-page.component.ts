import { Component, OnInit } from '@angular/core';

import { TimeClockLogsFacade } from "@llstarscreamll/time-clock-logs/data-access";
import { Observable } from 'rxjs';

@Component({
  selector: 'llstarscreamll-entry-and-exit-log-page',
  templateUrl: './entry-and-exit-log-page.component.html',
  styleUrls: ['./entry-and-exit-log-page.component.scss']
})
export class EntryAndExitLogPageComponent implements OnInit {

  public creatingStatus$: Observable<any>;

  public constructor(private timeClockLogsFacade: TimeClockLogsFacade) { }

  public ngOnInit() {
    this.creatingStatus$ = this.timeClockLogsFacade.creatingStatus$;
  }

  public onCreateLogFormSubmitted(data: any) {
    this.timeClockLogsFacade.createEntryAndExitLog(data);
  }

}
