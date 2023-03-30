import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SharedModule } from '@kirby/shared';
import { NoveltiesUiModule } from '@kirby/novelties/ui';
import { AuthorizationUiModule } from '@kirby/authorization/ui';
import { NoveltiesDataAccessModule } from '@kirby/novelties/data-access';
import { EmployeesDataAccessModule } from '@kirby/employees/data-access';
import { NoveltiesFeatureEffects } from './+state/novelties-feature.effects';
import { CostCentersDataAccessModule } from '@kirby/cost-centers/data-access';
import { NoveltiesPageComponent } from './novelties-page/novelties-page.component';
import { EditNoveltyPageComponent } from './edit-novelty/edit-novelty-page.component';
import { ReportByEmployeePageComponent } from './report-by-employee-page/report-by-employee-page.component';
import { CreateNoveltiesToEmployeesPageComponent } from './create-novelties-to-employees-page/create-novelties-to-employees-page.component';
import { ResumeByEmployeesAndNoveltyTypesPageComponent } from './resume-by-employees-and-novelty-types-page/resume-by-employees-and-novelty-types-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,

    NoveltiesUiModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AuthorizationUiModule,
    MatAutocompleteModule,
    NoveltiesDataAccessModule,
    EmployeesDataAccessModule,
    CostCentersDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: NoveltiesPageComponent,
      },
      {
        path: ':id/edit',
        component: EditNoveltyPageComponent,
      },
      {
        path: 'report-by-employee',
        component: ReportByEmployeePageComponent,
      },
      {
        path: 'create-novelties-to-employees',
        component: CreateNoveltiesToEmployeesPageComponent,
      },
      {
        path: 'resume-by-novelty-type-and-employee',
        component: ResumeByEmployeesAndNoveltyTypesPageComponent,
      },
      {
        path: 'novelty-types',
        loadChildren: () =>
          import('@kirby/novelty-types/feature').then(
            (m) => m.NoveltyTypesFeatureModule
          ),
      },
    ]),

    EffectsModule.forFeature([NoveltiesFeatureEffects]),
  ],
  declarations: [
    NoveltiesPageComponent,
    EditNoveltyPageComponent,
    ReportByEmployeePageComponent,
    CreateNoveltiesToEmployeesPageComponent,
    ResumeByEmployeesAndNoveltyTypesPageComponent,
  ],
})
export class NoveltiesFeatureModule {}
