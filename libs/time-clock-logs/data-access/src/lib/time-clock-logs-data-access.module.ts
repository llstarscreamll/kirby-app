import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { TimeClockLogsService } from './time-clock-logs.service';
import { TimeClockLogsFacade } from './+state/time-clock-logs.facade';
import { TimeClockLogsEffects } from './+state/time-clock-logs.effects';
import { TIME_CLOCK_LOGS_FEATURE_KEY, initialState as timeClockLogsInitialState, timeClockLogsReducer } from './+state/time-clock-logs.reducer';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    StoreModule.forFeature(TIME_CLOCK_LOGS_FEATURE_KEY, timeClockLogsReducer, {
      initialState: timeClockLogsInitialState
    }),
    EffectsModule.forFeature([TimeClockLogsEffects])
  ],
  providers: [TimeClockLogsFacade, TimeClockLogsService]
})
export class TimeClockLogsDataAccessModule { }
