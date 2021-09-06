import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '@kirby/shared';
import { PrinterService } from './printer.service';
import { ProductionService } from './production.service';
import * as fromProduction from './+state/production.reducer';
import { ProductionFacade } from './+state/production.facade';
import { ProductionEffects } from './+state/production.effects';
import { WeighingMachineService } from './weighing-machine.service';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';
import { ProductionLogsPage } from './production-logs/production-logs.page';
import { AuthenticationDataAccessModule } from '@kirby/authentication/data-access';
import { CreateProductionLogPage } from './create-production-log/create-production-log.page';
import { ProductionLogDetailsPage } from './production-log-details/production-log-details.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    EmployeesDataAccessModule,
    AuthenticationDataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProductionLogsPage },
      { path: 'create', component: CreateProductionLogPage },
      { path: ':id', component: ProductionLogDetailsPage },
    ]),
    StoreModule.forFeature(fromProduction.PRODUCTION_FEATURE_KEY, fromProduction.reducer),
    EffectsModule.forFeature([ProductionEffects]),
  ],
  declarations: [CreateProductionLogPage, ProductionLogsPage, ProductionLogDetailsPage],
  providers: [ProductionFacade, ProductionService, WeighingMachineService, PrinterService],
})
export class ProductionFeatureModule {}
