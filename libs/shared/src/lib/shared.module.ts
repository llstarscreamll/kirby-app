import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FilesService } from './services/files.service';
import { PrinterService } from './services/printer.service';
import { LocalStorageService } from './services/local-storage.service';
import { WeighingMachineService } from './services/weighing-machine.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { ApiErrorsComponent } from './components/api-errors/api-errors.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  providers: [LocalStorageService, FilesService, WeighingMachineService, PrinterService],
  declarations: [ApiErrorsComponent, PaginationComponent, FileUploadComponent],
  exports: [ApiErrorsComponent, PaginationComponent, FileUploadComponent],
})
export class SharedModule {}
