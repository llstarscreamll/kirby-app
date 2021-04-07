import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as fromProduction from './+state/production.reducer';
import { ProductionEffects } from './+state/production.effects';
import { ProductionFacade } from './+state/production.facade';
import { ProductionLogsPage } from './production-logs/production-logs.page';
import { CreateProductionLogPage } from './create-production-log/create-production-log.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      /* {path: '', pathMatch: 'full', component: InsertYourComponentHere} */
    ]),
    StoreModule.forFeature(fromProduction.PRODUCTION_FEATURE_KEY, fromProduction.reducer),
    EffectsModule.forFeature([ProductionEffects]),
  ],
  providers: [ProductionFacade],
  declarations: [CreateProductionLogPage, ProductionLogsPage],
})
export class ProductionFeatureModule {}
