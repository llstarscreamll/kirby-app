import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TimeClockLogsTableComponent } from './time-clock-logs-table/time-clock-logs-table.component';
import { EntryAndExitLogFormComponent } from './entry-and-exit-log-form/entry-and-exit-log-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  declarations: [EntryAndExitLogFormComponent, TimeClockLogsTableComponent],
  exports: [EntryAndExitLogFormComponent, TimeClockLogsTableComponent]
})
export class TimeClockLogsUiModule { }
