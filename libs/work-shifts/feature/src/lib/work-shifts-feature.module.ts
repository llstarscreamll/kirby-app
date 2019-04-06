import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { WorkShiftsUiModule } from '@llstarscreamll/work-shifts/ui';
import { WorkShiftsDataAccessModule } from '@llstarscreamll/work-shifts/data-access';
import { ListWorkShiftsPageComponent } from './list-work-shifts-page/list-work-shifts-page.component';
import { CreateWorkShiftPageComponent } from './create-work-shift-page/create-work-shift-page.component';
import { UpdateWorkShiftPageComponent } from './update-work-shift-page/update-work-shift-page.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ListWorkShiftsPageComponent },
      { path: 'create', pathMatch: 'full', component: CreateWorkShiftPageComponent },
      { path: ':id/update', pathMatch: 'full', component: UpdateWorkShiftPageComponent },
    ]),
    WorkShiftsUiModule,
    WorkShiftsDataAccessModule,
  ],
  declarations: [
    ListWorkShiftsPageComponent,
    CreateWorkShiftPageComponent,
    UpdateWorkShiftPageComponent,
  ]
})
export class WorkShiftsFeatureModule { }
