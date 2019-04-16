import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryAndExitLogFormComponent } from './entry-and-exit-log-form/entry-and-exit-log-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [EntryAndExitLogFormComponent],
  exports: [EntryAndExitLogFormComponent]
})
export class TimeClockLogsUiModule {}
