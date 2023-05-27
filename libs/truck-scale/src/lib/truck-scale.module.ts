import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '@kirby/shared';
import { AuthorizationUiModule } from '@kirby/authorization/ui';

import { truckScaleRoutes } from './lib.routes';
import { WeighingsService } from './weighings.service';
import * as fromWeighings from './+state/weighings.reducer';
import { WeighingsFacade } from './+state/weighings.facade';
import { WeighingsEffects } from './+state/weighings.effects';
import { EditWeighingPage } from './pages/edit-weighing/edit-weighing.page';
import { WeighingsListPage } from './pages/weighings-list/weighings-list.page';
import { CreateWeighingPage } from './pages/create-weighing/create-weighing.page';
import { WeighingFormComponent } from './components/weighing-form/weighing-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AuthorizationUiModule,
    MatAutocompleteModule,
    RouterModule.forChild(truckScaleRoutes),
    StoreModule.forFeature(fromWeighings.WEIGHINGS_FEATURE_KEY, fromWeighings.weighingsReducer),
    EffectsModule.forFeature([WeighingsEffects]),
  ],
  declarations: [WeighingsListPage, CreateWeighingPage, EditWeighingPage, WeighingFormComponent],
  providers: [WeighingsService, WeighingsFacade],
})
export class TruckScaleModule {}
