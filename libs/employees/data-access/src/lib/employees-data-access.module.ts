import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  EMPLOYEES_FEATURE_KEY,
  initialState as employeesInitialState,
  employeesReducer
} from './+state/employees.reducer';
import { EmployeesEffects } from './+state/employees.effects';
import { EmployeesFacade } from './+state/employees.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(EMPLOYEES_FEATURE_KEY, employeesReducer, {
      initialState: employeesInitialState
    }),
    EffectsModule.forFeature([EmployeesEffects])
  ],
  providers: [EmployeesFacade]
})
export class EmployeesDataAccessModule {}
