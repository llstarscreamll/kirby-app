import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '@kirby/shared';
import { EmployeesUiModule } from '@kirby/employees/ui';
import { AuthorizationUiModule } from '@kirby/authorization/ui';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';
import { WorkShiftsDataAccessModule } from '@kirby/work-shifts/data-access';
import { CostCentersDataAccessModule } from '@kirby/cost-centers/data-access';

import { EmployeeFeatureEffects } from './+state/employee-feature.effects';
import { EmployeesPageComponent } from './employees-page/employees-page.component';
import { EditEmployeePageComponent } from './edit-employee-page/edit-employee-page.component';
import { CreateEmployeePageComponent } from './create-employee-page/create-employee-page.component';

export const employeesFeatureRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: EmployeesPageComponent },
  { path: 'create', component: CreateEmployeePageComponent },
  { path: ':id/edit', component: EditEmployeePageComponent },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,

    EmployeesUiModule,
    ReactiveFormsModule,
    AuthorizationUiModule,
    EmployeesDataAccessModule,
    WorkShiftsDataAccessModule,
    CostCentersDataAccessModule,
    EffectsModule.forFeature([EmployeeFeatureEffects]),
    RouterModule.forChild(employeesFeatureRoutes),
  ],
  declarations: [EmployeesPageComponent, EditEmployeePageComponent, CreateEmployeePageComponent],
})
export class EmployeesFeatureModule {}
