import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'kirby-file-upload',
  template: `
    <input type="file" class="hidden" (change)="uploadFile($event)" #fileInput />
    <button mat-stroked-button type="button" (click)="fileInput.click()">
      <mat-icon *ngIf="progress != 100">
        <mat-spinner diameter="18" [value]="progress" mode="determinate" color="accent"></mat-spinner>
      </mat-icon>
      <mat-icon *ngIf="progress === 100">upload</mat-icon>
      Subir archivo
    </button>
    <a *ngIf="fileUrl" [href]="fileUrl" target="_blank" class="ml-2 underline">{{ fileName }}</a>
  `,
})
export class FileUploadComponent {
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

    const formData = new FormData();
    formData.append('file', file);

    this.httpClient
      .post(`${this.env.api}api/v1/files`, formData, { reportProgress: true, observe: 'events' })
      .subscribe((event) => {
        console.log(event, event.type === HttpEventType.UploadProgress, this.progress);

        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * (event.loaded / event.total));
        }

        if (event.type === HttpEventType.Response && event.status === 200) {
          const body: any = event.body;
          this.fileUrl = `${this.env.api}${body.data}`;
        }
      });
  }
}
