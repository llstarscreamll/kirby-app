import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@llstarscreamll/shared';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TimeClockLogsUiModule } from "@llstarscreamll/time-clock-logs/ui";
import { AuthenticationDataAccessModule } from '@llstarscreamll/authentication-data-access';
import { TimeClockLogsDataAccessModule } from '@llstarscreamll/time-clock-logs/data-access/src';
import { TimeClockLogsPageComponent } from './time-clock-logs-page/time-clock-logs-page.component';
import { EntryAndExitLogPageComponent } from './entry-and-exit-log-page/entry-and-exit-log-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    TimeClockLogsUiModule,
    TimeClockLogsDataAccessModule,
    AuthenticationDataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TimeClockLogsPageComponent },
      { path: 'entry-and-exit-log', component: EntryAndExitLogPageComponent },
    ])
  ],
  declarations: [EntryAndExitLogPageComponent, TimeClockLogsPageComponent]
})
export class TimeClockLogsFeatureModule { }
