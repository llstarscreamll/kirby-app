import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { NoveltyFormComponent } from './novelty-form/novelty-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  declarations: [NoveltyFormComponent],
  exports: [NoveltyFormComponent]
})
export class NoveltiesUiModule { }
