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
import { SharedModule } from '@llstarscreamll/shared';
import { NoveltiesPageComponent } from './novelties-page/novelties-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NoveltiesUiModule,
    MatFormFieldModule,
    NoveltiesDataAccessModule,
    EmployeesDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: NoveltiesPageComponent
      },
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
    CreateNoveltiesToEmployeesPageComponent,
    NoveltiesPageComponent
  ]
})
export class NoveltiesFeatureModule {}
