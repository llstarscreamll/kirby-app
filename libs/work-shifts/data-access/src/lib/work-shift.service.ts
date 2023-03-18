import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Pagination, ApiResponse } from '@kirby/shared';
import { BaseAuthService } from '@kirby/authentication/utils';
import { WorkShiftInterface } from '@kirby/work-shifts/util';

@Injectable()
export class WorkShiftService extends BaseAuthService {
  private endpoint = this.env.api + 'api/v1/work-shifts/';

  constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) {
    super();
  }

  search(query: any = {}): Observable<Pagination<WorkShiftInterface>> {
    return this.http.get<Pagination<WorkShiftInterface>>(this.endpoint, {
      headers: this.defaultHeaders,
      params: query,
    });
  }

  create(workShiftData: any): Observable<WorkShiftInterface> {
    return this.http
      .post<ApiResponse<WorkShiftInterface>>(this.endpoint, workShiftData, { headers: this.defaultHeaders })
      .pipe(map((response) => response.data));
  }

  get(workShiftId: string): Observable<WorkShiftInterface> {
    return this.http
      .get<ApiResponse<WorkShiftInterface>>(this.endpoint + workShiftId, { headers: this.defaultHeaders })
      .pipe(map((response) => response.data));
  }

  update(workShiftId: string, workShiftData: any): Observable<WorkShiftInterface> {
    return this.http
      .put<ApiResponse<WorkShiftInterface>>(this.endpoint + workShiftId, workShiftData, {
        headers: this.defaultHeaders,
      })
      .pipe(map((response) => response.data));
  }

  delete(workShiftId: string): Observable<any> {
    return this.http.delete(this.endpoint + workShiftId, { headers: this.defaultHeaders });
  }
}
