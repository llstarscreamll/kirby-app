import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'kirby-file-upload',
  template: `
    <input type="file" class="hidden" (change)="uploadFile($event)" accept="image/*, .pdf" #fileInput />
    <button [disabled]="progress != 100" (click)="fileInput.click()" mat-stroked-button type="button">
      <mat-icon *ngIf="progress != 100">
        <mat-spinner diameter="18" [value]="progress" mode="determinate" color="accent"></mat-spinner>
      </mat-icon>
      <mat-icon *ngIf="progress === 100">upload</mat-icon>
      Subir archivo
    </button>
  `,
})
export class FileUploadComponent {
  @Output() fileUploaded = new EventEmitter();

  fileName = '';
  fileUrl = '';
  progress = 100;

  constructor(
    private httpClient: HttpClient,
    @Inject('environment')
    private env
  ) {}

  uploadFile(event) {
    const files: FileList = event.target.files;
    const file = files.item(0);
    this.fileName = file.name;
    this.progress = 0;

    const formData = new FormData();
    formData.append('file', file);

    this.httpClient
      .post(`${this.env.api}api/v1/files`, formData, { reportProgress: true, observe: 'events' })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * (event.loaded / event.total));
        }

        if (event.type === HttpEventType.Response && event.status === 200) {
          const body: any = event.body;
          this.fileUrl = body.data;
        }

        if (this.progress === 100) {
          this.fileUploaded.emit({
            url: this.fileUrl,
            name: this.fileName,
          });
        }
      });
  }
}
