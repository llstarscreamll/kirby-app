import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NoveltyFormComponent } from './novelty-form/novelty-form.component';
import { BalanceDialogComponent } from './balance-dialog/balance-dialog.component';
import { NoveltiesSearchFormComponent } from './novelties-search-form/novelties-search-form.component';
import { CreateNoveltiesToEmployeesFormComponent } from './create-novelties-to-employees-form/create-novelties-to-employees-form.component';
import { ResumeByEmployeesAndNoveltyTypesTableComponent } from './resume-by-employees-and-novelty-types-table/resume-by-employees-and-novelty-types-table.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  declarations: [
    NoveltyFormComponent,
    NoveltiesSearchFormComponent,
    CreateNoveltiesToEmployeesFormComponent,
    ResumeByEmployeesAndNoveltyTypesTableComponent,
    BalanceDialogComponent,
  ],
  exports: [
    NoveltyFormComponent,
    NoveltiesSearchFormComponent,
    CreateNoveltiesToEmployeesFormComponent,
    ResumeByEmployeesAndNoveltyTypesTableComponent,
    BalanceDialogComponent,
  ],
  entryComponents: [BalanceDialogComponent]
})
export class NoveltiesUiModule {}
