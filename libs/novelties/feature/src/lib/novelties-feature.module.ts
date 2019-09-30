import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

import { SharedModule } from '@kirby/shared';
import { NoveltiesUiModule } from '@kirby/novelties/ui';
import { AuthorizationUiModule } from '@kirby/authorization/ui';
import { NoveltiesDataAccessModule } from '@kirby/novelties/data-access';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';
import { NoveltiesFeatureEffects } from './+state/novelties-feature.effects';
import { NoveltiesPageComponent } from './novelties-page/novelties-page.component';
import { EditNoveltyPageComponent } from './edit-novelty/edit-novelty-page.component';
import { CreateNoveltiesToEmployeesPageComponent } from './create-novelties-to-employees-page/create-novelties-to-employees-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NoveltiesUiModule,
    MatTooltipModule,
    MatFormFieldModule,
    AuthorizationUiModule,
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
