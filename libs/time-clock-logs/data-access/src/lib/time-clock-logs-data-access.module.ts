import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  TIME_CLOCK_LOGS_FEATURE_KEY,
  initialState as timeClockLogsInitialState,
  timeClockLogsReducer
} from './+state/time-clock-logs.reducer';
import { TimeClockLogsEffects } from './+state/time-clock-logs.effects';
import { TimeClockLogsFacade } from './+state/time-clock-logs.facade';
import { TimeClockLogsService } from './time-clock-logs.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(TIME_CLOCK_LOGS_FEATURE_KEY, timeClockLogsReducer, {
      initialState: timeClockLogsInitialState
    }),
    EffectsModule.forFeature([TimeClockLogsEffects])
  ],
  providers: [TimeClockLogsFacade, TimeClockLogsService]
})
export class TimeClockLogsDataAccessModule { }
