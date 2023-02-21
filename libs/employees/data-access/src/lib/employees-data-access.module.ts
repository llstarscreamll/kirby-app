import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { EmployeeService } from './employee.service';
import { EmployeesFacade } from './+state/employees.facade';
import { EmployeesEffects } from './+state/employees.effects';
import { EMPLOYEES_FEATURE_KEY, initialState, employeesReducer } from './+state/employees.reducer';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    StoreModule.forFeature(EMPLOYEES_FEATURE_KEY, employeesReducer, { initialState }),
    EffectsModule.forFeature([EmployeesEffects]),
  ],
  providers: [EmployeesFacade, EmployeeService],
})
export class EmployeesDataAccessModule {}
