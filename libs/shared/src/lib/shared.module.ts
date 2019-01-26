import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    LocalStorageService
  ],
})
export class SharedModule { }
