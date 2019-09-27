import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { EmployeesDataAccessModule } from "@kirby/employees/data-access";
import { SyncEmployeesByCsvFilePageComponent } from './sync-employees-by-csv-file-page/sync-employees-by-csv-file-page.component';

export const employeesFeatureRoutes: Route[] = [
  { path: 'sync-by-csv-file', component: SyncEmployeesByCsvFilePageComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    EmployeesDataAccessModule,
    RouterModule.forChild(employeesFeatureRoutes)
  ],
  declarations: [SyncEmployeesByCsvFilePageComponent]
})
export class EmployeesFeatureModule { }
