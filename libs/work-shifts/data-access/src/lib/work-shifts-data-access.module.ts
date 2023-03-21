import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import {
  initialState as workShiftsInitialState,
  WORK_SHIFTS_FEATURE_KEY,
  workShiftsReducer,
} from './+state/work-shifts.reducer';
import { WorkShiftService } from './work-shift.service';
import { WorkShiftsFacade } from './+state/work-shifts.facade';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkShiftsEffects } from './+state/work-shifts.effects';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    StoreModule.forFeature(WORK_SHIFTS_FEATURE_KEY, workShiftsReducer, {
      initialState: workShiftsInitialState,
    }),
    EffectsModule.forFeature([WorkShiftsEffects]),
  ],
  providers: [WorkShiftsFacade, WorkShiftService],
})
export class WorkShiftsDataAccessModule {}
