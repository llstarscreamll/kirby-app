import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class FilesService {
  private endpoint = this.env.api + 'api/v1/files/';

  constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) {}

  getFile(filePath: string) {
    return this.http.get(`${this.endpoint}${filePath}`, { responseType: 'blob' }).pipe(
      tap((response) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.target = '_blank';
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        document.body.appendChild(downloadLink);
        downloadLink.click();
      })
    );
  }
}
