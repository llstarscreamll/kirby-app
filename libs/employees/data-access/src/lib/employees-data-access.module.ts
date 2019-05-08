import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  EMPLOYEES_FEATURE_KEY,
  initialState as employeesInitialState,
  employeesReducer
} from './+state/employees.reducer';
import { EmployeeService } from './employee.service';
import { EmployeesEffects } from './+state/employees.effects';
import { EmployeesFacade } from './+state/employees.facade';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
    StoreModule.forFeature(EMPLOYEES_FEATURE_KEY, employeesReducer, {
      initialState: employeesInitialState
    }),
    EffectsModule.forFeature([EmployeesEffects])
  ],
  providers: [EmployeesFacade, EmployeeService]
})
export class EmployeesDataAccessModule { }
