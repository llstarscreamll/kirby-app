import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Pagination, ApiResponse } from '@llstarscreamll/shared';
import { BaseAuthService } from '@llstarscreamll/authentication/utils';
import { WorkShiftInterface } from '@llstarscreamll/work-shifts/util';

@Injectable()
export class WorkShiftService extends BaseAuthService {

  private endpoint = this.env.api + 'api/v1/work-shifts/';

  public constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) { super(); }

  public search(query: any = {}): Observable<Pagination<WorkShiftInterface>> {
    return this.http.get<Pagination<WorkShiftInterface>>(this.endpoint, { headers: this.defaultHeaders });
  }

  public create(workShiftData: any): Observable<WorkShiftInterface> {
    return this.http.post<ApiResponse<WorkShiftInterface>>(this.endpoint, workShiftData, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public get(workShiftId: string): Observable<WorkShiftInterface> {
    return this.http.get<ApiResponse<WorkShiftInterface>>(this.endpoint + workShiftId, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public update(workShiftId: string, workShiftData: any): Observable<WorkShiftInterface> {
    return this.http.put<ApiResponse<WorkShiftInterface>>(this.endpoint + workShiftId, workShiftData, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public delete(workShiftId: string): Observable<any> {
    return this.http.delete(this.endpoint + workShiftId, { headers: this.defaultHeaders });
  }

}
