import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';

import { WorkShiftFormComponent } from './work-shift-form/work-shift-form.component';
import { WorkShiftsTableListComponent } from './work-shifts-table-list/work-shifts-table-list.component';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [WorkShiftsTableListComponent, WorkShiftFormComponent],
  exports: [WorkShiftsTableListComponent, WorkShiftFormComponent]
})
export class WorkShiftsUiModule { }
