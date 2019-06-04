import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";

import { EntryAndExitLogFormComponent } from './entry-and-exit-log-form/entry-and-exit-log-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [EntryAndExitLogFormComponent],
  exports: [EntryAndExitLogFormComponent]
})
export class TimeClockLogsUiModule { }
