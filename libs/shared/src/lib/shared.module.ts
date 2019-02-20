import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';
import { ApiErrorsComponent } from './components/api-errors/api-errors.component';

@NgModule({
  imports: [CommonModule],
  providers: [
    LocalStorageService
  ],
  declarations: [ApiErrorsComponent],
  exports: [ApiErrorsComponent]
})
export class SharedModule { }
