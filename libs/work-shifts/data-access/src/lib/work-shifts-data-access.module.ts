import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { WorkShiftService } from './work-shift.service';
import { WorkShiftsEffects } from './+state/work-shifts.effects';
import { WorkShiftsFacade } from './+state/work-shifts.facade';
import { WORK_SHIFTS_FEATURE_KEY, initialState as workShiftsInitialState, workShiftsReducer } from './+state/work-shifts.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(WORK_SHIFTS_FEATURE_KEY, workShiftsReducer, {
      initialState: workShiftsInitialState
    }),
    EffectsModule.forFeature([WorkShiftsEffects])
  ],
  providers: [WorkShiftsFacade, WorkShiftService]
})
export class WorkShiftsDataAccessModule { }
