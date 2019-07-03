import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Pagination, ApiResponse } from '@llstarscreamll/shared';
import { BaseAuthService } from '@llstarscreamll/authentication/utils';
import { TimeClockLogModel } from '@llstarscreamll/time-clock-logs/util';

@Injectable()
export class TimeClockLogsService extends BaseAuthService {

  private endpoint = this.env.api + 'api/v1/time-clock-logs/';

  public constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) { super(); }

  public search(query: any = {}): Observable<Pagination<TimeClockLogModel>> {
    return this.http.get<Pagination<TimeClockLogModel>>(
      this.endpoint,
      { headers: this.defaultHeaders, params: query }
    ).pipe(map(resp => ({ ...resp, data: TimeClockLogModel.fromJsonList(resp.data) })));
  }

  public create(workShiftData: any): Observable<TimeClockLogModel> {
    return this.http.post<ApiResponse<TimeClockLogModel>>(this.endpoint, workShiftData, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public get(workShiftId: string): Observable<TimeClockLogModel> {
    return this.http.get<ApiResponse<TimeClockLogModel>>(this.endpoint + workShiftId, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public update(workShiftId: string, workShiftData: any): Observable<TimeClockLogModel> {
    return this.http.put<ApiResponse<TimeClockLogModel>>(this.endpoint + workShiftId, workShiftData, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public delete(workShiftId: string): Observable<any> {
    return this.http.delete(this.endpoint + workShiftId, { headers: this.defaultHeaders });
  }

  public checkIn(entryAndExitLog: { identification_code: string, action: string }): Observable<any> {
    return this.http.post<ApiResponse<any>>(`${this.env.api}api/v1/time-clock/check-in`, entryAndExitLog, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public checkOut(entryAndExitLog: { identification_code: string, action: string }): Observable<any> {
    return this.http.post<ApiResponse<any>>(`${this.env.api}api/v1/time-clock/check-out`, entryAndExitLog, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

}
