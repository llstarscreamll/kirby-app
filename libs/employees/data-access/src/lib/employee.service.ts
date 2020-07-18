import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '@kirby/shared';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class EmployeeService extends BaseService {
  private endpoint = this.env.api + 'api/v1/employees/';

  constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) {
    super();
  }

  search(query: any = {}): Observable<any> {
    return this.http.get<any>(this.endpoint, {
      headers: this.defaultHeaders,
      params: query,
    });
  }

  get(id: string): Observable<any> {
    return this.http
      .get<any>(this.endpoint + id, {
        headers: this.defaultHeaders,
      })
      .pipe(map((response) => response.data));
  }

  create(data: any): Observable<any> {
    return this.http
      .post<any>(this.endpoint, data, {
        headers: this.defaultHeaders,
      })
      .pipe(map((response) => response.data));
  }

  update(employeeId: string, data: any): Observable<any> {
    return this.http
      .put<any>(this.endpoint + employeeId, data, {
        headers: this.defaultHeaders,
      })
      .pipe(map((response) => response.data));
  }

  syncEmployeesByCsvFile(data: any): Observable<any> {
    const formData = new FormData();
    formData.append('csv_file', data.csv_file);
    return this.http.post(this.endpoint + 'sync-by-csv-file', formData);
  }
}
