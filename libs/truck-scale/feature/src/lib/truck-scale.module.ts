import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
import { WeighingStatusLabelComponent } from './components/weighing-status-label/weighing-status-label.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
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
  declarations: [
    EditWeighingPage,
    WeighingsListPage,
    CreateWeighingPage,
    WeighingFormComponent,
    WeighingStatusLabelComponent,
  ],
  providers: [WeighingsService, WeighingsFacade],
})
export class TruckScaleModule {}
