import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SharedModule } from '@kirby/shared';
import { WorkShiftsUiModule } from '@kirby/work-shifts/ui';
import { WorkShiftsDataAccessModule } from '@kirby/work-shifts/data-access';

import { WorkShiftFeatureEffects } from './work-shift-feature.effects';
import { EditWorkShiftPage } from './edit-work-shift-page/edit-work-shift.page';
import { ListWorkShiftsPageComponent } from './list-work-shifts-page/list-work-shifts-page.component';
import { CreateWorkShiftPageComponent } from './create-work-shift-page/create-work-shift-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
    EffectsModule.forFeature([WorkShiftFeatureEffects]),
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ListWorkShiftsPageComponent },
      {
        path: 'create',
        component: CreateWorkShiftPageComponent,
      },
      {
        path: ':id/edit',
        component: EditWorkShiftPage,
      },
    ]),
    WorkShiftsUiModule,
    WorkShiftsDataAccessModule,
  ],
  declarations: [EditWorkShiftPage, ListWorkShiftsPageComponent, CreateWorkShiftPageComponent],
})
export class WorkShiftsFeatureModule {}
