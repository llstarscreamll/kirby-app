import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkShiftsTableListComponent } from './work-shifts-table-list/work-shifts-table-list.component';
import { WorkShiftFormComponent } from './work-shift-form/work-shift-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [WorkShiftsTableListComponent, WorkShiftFormComponent],
  exports: [WorkShiftsTableListComponent, WorkShiftFormComponent]
})
export class WorkShiftsUiModule { }
