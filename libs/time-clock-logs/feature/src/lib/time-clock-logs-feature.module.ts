import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TimeClockLogsUiModule } from "@llstarscreamll/time-clock-logs/ui";
import { EntryAndExitLogPageComponent } from './entry-and-exit-log-page/entry-and-exit-log-page.component';

@NgModule({
  imports: [
    CommonModule,
    TimeClockLogsUiModule,
    RouterModule.forChild([
      { path: 'entry-and-exit-log', component: EntryAndExitLogPageComponent }
    ])
  ],
  declarations: [EntryAndExitLogPageComponent]
})
export class TimeClockLogsFeatureModule { }
