import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { reducer } from './+state/novelty-types.reducer';
import { NoveltyTypeService } from './novelty-type.service';
import { NoveltyTypesFacade } from './+state/novelty-types.facade';
import { NoveltyTypesEffects } from './+state/novelty-types.effects';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(reducer), EffectsModule.forFeature([NoveltyTypesEffects])],
  providers: [NoveltyTypeService, NoveltyTypesFacade],
})
export class NoveltyTypesDataAccessModule {}
