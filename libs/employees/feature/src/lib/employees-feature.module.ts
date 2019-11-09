import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '@kirby/shared';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { SyncEmployeesByCsvFilePageComponent } from './sync-employees-by-csv-file-page/sync-employees-by-csv-file-page.component';

export const employeesFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: EmployeesPageComponent },
  { path: 'sync-by-csv-file', component: SyncEmployeesByCsvFilePageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    ReactiveFormsModule,
    EmployeesDataAccessModule,
    RouterModule.forChild(employeesFeatureRoutes)
  ],
  declarations: [SyncEmployeesByCsvFilePageComponent, EmployeesPageComponent]
})
export class EmployeesFeatureModule {}
