import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { truckScaleRoutes } from './lib.routes';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromWeighings from './+state/weighings.reducer';
import { WeighingsEffects } from './+state/weighings.effects';
import { EditWeighingPage } from './pages/edit-weighing/edit-weighing.page';
import { WeighingsListPage } from './pages/weighings-list/weighings-list.page';
import { CreateWeighingPage } from './pages/create-weighing/create-weighing.page';
import { WeighingFormComponent } from './components/weighing-form/weighing-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(truckScaleRoutes),
    StoreModule.forFeature(fromWeighings.WEIGHINGS_FEATURE_KEY, fromWeighings.weighingsReducer),
    EffectsModule.forFeature([WeighingsEffects]),
  ],
  declarations: [WeighingsListPage, CreateWeighingPage, EditWeighingPage, WeighingFormComponent],
})
export class TruckScaleModule {}
