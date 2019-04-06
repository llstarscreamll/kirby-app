import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkShiftsTableListComponent } from './work-shifts-table-list/work-shifts-table-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [WorkShiftsTableListComponent],
  exports: [WorkShiftsTableListComponent]
})
export class WorkShiftsUiModule { }
