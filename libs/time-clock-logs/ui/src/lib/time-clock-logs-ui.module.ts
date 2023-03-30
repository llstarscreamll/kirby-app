import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TimeClockLogsTableComponent } from './time-clock-logs-table/time-clock-logs-table.component';
import { EntryAndExitLogFormComponent } from './entry-and-exit-log-form/entry-and-exit-log-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  declarations: [EntryAndExitLogFormComponent, TimeClockLogsTableComponent],
  exports: [EntryAndExitLogFormComponent, TimeClockLogsTableComponent],
})
export class TimeClockLogsUiModule {}
