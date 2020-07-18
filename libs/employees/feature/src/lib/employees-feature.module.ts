import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '@kirby/shared';
import { EmployeesUiModule } from '@kirby/employees/ui';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';
import { EmployeeFeatureEffects } from './+state/employee-feature.effects';
import { WorkShiftsDataAccessModule } from '@kirby/work-shifts/data-access';
import { CostCentersDataAccessModule } from '@kirby/cost-centers/data-access';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { EditEmployeePageComponent } from './edit-employee-page/edit-employee-page.component';

export const employeesFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: EmployeesPageComponent },
  { path: ':id', component: EditEmployeePageComponent },
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
    CostCentersDataAccessModule,
    EffectsModule.forFeature([EmployeeFeatureEffects]),
    RouterModule.forChild(employeesFeatureRoutes),
  ],
  declarations: [EmployeesPageComponent, EditEmployeePageComponent],
})
export class EmployeesFeatureModule {}
