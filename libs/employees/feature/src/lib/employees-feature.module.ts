import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '@kirby/shared';
import { EmployeesUiModule } from '@kirby/employees/ui';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { SyncEmployeesByCsvFilePageComponent } from './sync-employees-by-csv-file-page/sync-employees-by-csv-file-page.component';
import { EditEmployeePageComponent } from './edit-employee-page/edit-employee-page.component';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeFeatureEffects } from './+state/employee-feature.effects';
import { WorkShiftsDataAccessModule } from '@kirby/work-shifts/data-access/src';

export const employeesFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: EmployeesPageComponent },
  { path: ':id', component: EditEmployeePageComponent },
  { path: 'sync-by-csv-file', component: SyncEmployeesByCsvFilePageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    EmployeesUiModule,
    ReactiveFormsModule,
    EmployeesDataAccessModule,
    WorkShiftsDataAccessModule,
    EffectsModule.forFeature([EmployeeFeatureEffects]),
    RouterModule.forChild(employeesFeatureRoutes)
  ],
  declarations: [
    SyncEmployeesByCsvFilePageComponent,
    EmployeesPageComponent,
    EditEmployeePageComponent
  ]
})
export class EmployeesFeatureModule {}
