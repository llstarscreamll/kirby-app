import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { WorkShiftService } from './work-shift.service';
import { WorkShiftsFacade } from './+state/work-shifts.facade';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WorkShiftsEffects } from './+state/work-shifts.effects';
import { workShiftsReducer } from './+state/work-shifts.reducer';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    StoreModule.forFeature(workShiftsReducer),
    EffectsModule.forFeature([WorkShiftsEffects]),
  ],
  providers: [WorkShiftsFacade, WorkShiftService],
})
export class WorkShiftsDataAccessModule {}
