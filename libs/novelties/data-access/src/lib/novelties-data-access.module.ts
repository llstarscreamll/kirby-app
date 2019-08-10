import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  NOVELTIES_FEATURE_KEY,
  initialState as noveltiesInitialState,
  noveltiesReducer
} from './+state/novelties.reducer';
import { NoveltiesEffects } from './+state/novelties.effects';
import { NoveltiesFacade } from './+state/novelties.facade';
import { NoveltyService } from './novelty.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(NOVELTIES_FEATURE_KEY, noveltiesReducer, { initialState: noveltiesInitialState }),
    EffectsModule.forFeature([NoveltiesEffects])
  ],
  providers: [NoveltiesFacade, NoveltyService]
})
export class NoveltiesDataAccessModule { }
