import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '@kirby/shared';
import { AuthorizationUiModule } from '@kirby/authorization/ui';
import { TimeClockLogsUiModule } from '@kirby/time-clock-logs/ui';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';
import { AuthenticationDataAccessModule } from '@kirby/authentication/data-access';
import { TimeClockLogsDataAccessModule } from '@kirby/time-clock-logs/data-access';
import { TimeClockLogsPageComponent } from './time-clock-logs-page/time-clock-logs-page.component';
import { EntryAndExitLogPageComponent } from './entry-and-exit-log-page/entry-and-exit-log-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AuthorizationUiModule,
    MatAutocompleteModule,
    TimeClockLogsUiModule,
    EmployeesDataAccessModule,
    TimeClockLogsDataAccessModule,
    AuthenticationDataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TimeClockLogsPageComponent },
      { path: 'entry-and-exit-log', component: EntryAndExitLogPageComponent },
    ]),
  ],
  declarations: [EntryAndExitLogPageComponent, TimeClockLogsPageComponent],
})
export class TimeClockLogsFeatureModule {}
