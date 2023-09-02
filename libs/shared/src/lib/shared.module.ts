import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FilesService } from './services/files.service';
import { PrinterService } from './services/printer.service';
import { LocalStorageService } from './services/local-storage.service';
import { WeighingMachineService } from './services/weighing-machine.service';
import { ApiErrorsComponent } from './components/api-errors/api-errors.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { CommentModalComponent } from './components/comment-modal/comment-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  providers: [LocalStorageService, FilesService, WeighingMachineService, PrinterService],
  declarations: [ApiErrorsComponent, PaginationComponent, FileUploadComponent, CommentModalComponent],
  exports: [ApiErrorsComponent, PaginationComponent, FileUploadComponent],
})
export class SharedModule {}
