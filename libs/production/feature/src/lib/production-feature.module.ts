import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '@kirby/shared';
import { ProductionService } from './production.service';
import * as fromProduction from './+state/production.reducer';
import { ProductionFacade } from './+state/production.facade';
import { ProductionEffects } from './+state/production.effects';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';
import { ProductionLogsPage } from './production-logs/production-logs.page';
import { AuthenticationDataAccessModule } from '@kirby/authentication/data-access';
import { CreateProductionLogPage } from './create-production-log/create-production-log.page';
import { WeighingMachineService } from './weighing-machine.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    EmployeesDataAccessModule,
    AuthenticationDataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProductionLogsPage },
      { path: 'create', component: CreateProductionLogPage },
    ]),
    StoreModule.forFeature(fromProduction.PRODUCTION_FEATURE_KEY, fromProduction.reducer),
    EffectsModule.forFeature([ProductionEffects]),
  ],
  declarations: [CreateProductionLogPage, ProductionLogsPage],
  providers: [ProductionFacade, ProductionService, WeighingMachineService],
})
export class ProductionFeatureModule {}
