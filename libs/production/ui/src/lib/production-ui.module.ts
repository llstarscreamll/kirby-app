import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ProductionLogFormComponent } from './production-log-form/production-log-form.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  declarations: [ProductionLogFormComponent],
  exports: [ProductionLogFormComponent],
})
export class ProductionUiModule {}
