import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { truckScaleRoutes } from './lib.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeighings from './+state/weighings.reducer';
import { WeighingsEffects } from './+state/weighings.effects';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(truckScaleRoutes),
    StoreModule.forFeature(fromWeighings.WEIGHINGS_FEATURE_KEY, fromWeighings.weighingsReducer),
    EffectsModule.forFeature([WeighingsEffects]),
  ],
})
export class TruckScaleModule {}
