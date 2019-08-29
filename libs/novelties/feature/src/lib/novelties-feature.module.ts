import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NoveltiesUiModule } from '@llstarscreamll/novelties/ui';
import { NoveltiesFeatureEffects } from './+state/novelties-feature.effects';
import { EditNoveltyPageComponent } from './edit-novelty/edit-novelty-page.component';
import { NoveltiesDataAccessModule } from '@llstarscreamll/novelties/data-access';
import { EmployeesDataAccessModule } from '@llstarscreamll/employees/data-access';
import { CreateNoveltiesToEmployeesPageComponent } from './create-novelties-to-employees-page/create-novelties-to-employees-page.component';

@NgModule({
  imports: [
    CommonModule,
    NoveltiesUiModule,
    NoveltiesDataAccessModule,
    EmployeesDataAccessModule,
    RouterModule.forChild([
      {
        path: ':id/edit',
        pathMatch: 'full',
        component: EditNoveltyPageComponent
      },
      {
        path: 'create-novelties-to-employees',
        pathMatch: 'full',
        component: CreateNoveltiesToEmployeesPageComponent
      }
    ]),
    EffectsModule.forFeature([NoveltiesFeatureEffects])
  ],
  declarations: [
    EditNoveltyPageComponent,
    CreateNoveltiesToEmployeesPageComponent
  ]
})
export class NoveltiesFeatureModule {}
