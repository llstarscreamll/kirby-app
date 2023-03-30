import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

import { NoveltyTypeFormComponent } from './novelty-type-form/novelty-type-form.component';
import { NoveltyTypesTableComponent } from './novelty-types-table/novelty-types-table.component';
import { NoveltyTypesSearchFormComponent } from './novelty-types-search-form/novelty-types-search-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,

    ReactiveFormsModule,
  ],
  declarations: [
    NoveltyTypeFormComponent,
    NoveltyTypesTableComponent,
    NoveltyTypesSearchFormComponent,
  ],
  exports: [
    NoveltyTypeFormComponent,
    NoveltyTypesTableComponent,
    NoveltyTypesSearchFormComponent,
  ],
})
export class NoveltyTypesUiModule {}
