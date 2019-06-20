import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LocalStorageService } from './services/local-storage.service';
import { ApiErrorsComponent } from './components/api-errors/api-errors.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [
    LocalStorageService
  ],
  declarations: [ApiErrorsComponent, PaginationComponent],
  exports: [ApiErrorsComponent, PaginationComponent]
})
export class SharedModule { }
