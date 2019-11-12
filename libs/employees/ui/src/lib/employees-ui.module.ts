import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatIconModule
} from '@angular/material';

import { EmployeeFormComponent } from './employee-form/employee-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  declarations: [EmployeeFormComponent],
  exports: [EmployeeFormComponent]
})
export class EmployeesUiModule {}
