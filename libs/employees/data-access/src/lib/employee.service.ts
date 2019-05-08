import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {

  private endpoint = this.env.api + 'api/v1/employees/sync-by-csv-file';

  public constructor(
    @Inject('environment')
    private env,
    private httpClient: HttpClient
  ) { }

  public syncEmployeesByCsvFile(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('csv_file', data.csv_file);
    return this.httpClient.post(this.endpoint, formData);
  }

}