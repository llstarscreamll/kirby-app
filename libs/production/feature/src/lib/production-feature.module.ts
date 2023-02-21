import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '@kirby/shared';
import { ProductionUiModule } from '@kirby/production/ui';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';

import { PrinterService } from './printer.service';
import { ReportsPage } from './reports/reports.page';
import { ProductionService } from './production.service';
import * as fromProduction from './+state/production.reducer';
import { ProductionFacade } from './+state/production.facade';
import { ProductionEffects } from './+state/production.effects';
import { WeighingMachineService } from './weighing-machine.service';
import { SearchFormComponent } from './search-form/search-form.component';
import { ProductionLogsPage } from './production-logs/production-logs.page';
import { EditProductionLogPage } from './edit-production-log/edit-production-log.page';
import { CreateProductionLogPage } from './create-production-log/create-production-log.page';
import { ProductionLogDetailsPage } from './production-log-details/production-log-details.page';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    ChartsModule,
    MatChipsModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    ProductionUiModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    EmployeesDataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProductionLogsPage },
      { path: 'reports', pathMatch: 'full', component: ReportsPage },
      { path: 'create', component: CreateProductionLogPage },
      { path: ':id', component: ProductionLogDetailsPage },
      { path: ':id/edit', component: EditProductionLogPage },
    ]),
    StoreModule.forFeature(fromProduction.PRODUCTION_FEATURE_KEY, fromProduction.reducer),
    EffectsModule.forFeature([ProductionEffects]),
  ],
  declarations: [
    ReportsPage,
    ProductionLogsPage,
    SearchFormComponent,
    EditProductionLogPage,
    CreateProductionLogPage,
    ProductionLogDetailsPage,
  ],
  providers: [ProductionFacade, ProductionService, WeighingMachineService, PrinterService],
})
export class ProductionFeatureModule {}
