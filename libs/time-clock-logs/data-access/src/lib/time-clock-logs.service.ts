import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Pagination, ApiResponse } from '@llstarscreamll/shared';
import { BaseAuthService } from '@llstarscreamll/authentication/utils';
import { TimeClockLogInterface } from '@llstarscreamll/time-clock-logs/util';

@Injectable()
export class TimeClockLogsService extends BaseAuthService {

  private endpoint = this.env.api + 'api/v1/time-clock-logs/';

  public constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) { super(); }

  public search(query: any = {}): Observable<Pagination<TimeClockLogInterface>> {
    return this.http.get<Pagination<TimeClockLogInterface>>(this.endpoint, { headers: this.defaultHeaders });
  }

  public create(workShiftData: any): Observable<TimeClockLogInterface> {
    return this.http.post<ApiResponse<TimeClockLogInterface>>(this.endpoint, workShiftData, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public createExitAndEntryLog(entryAndExitLog: { identification_code: string, action: string }): Observable<any> {
    return this.http.post<ApiResponse<any>>(this.endpoint, entryAndExitLog, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public get(workShiftId: string): Observable<TimeClockLogInterface> {
    return this.http.get<ApiResponse<TimeClockLogInterface>>(this.endpoint + workShiftId, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public update(workShiftId: string, workShiftData: any): Observable<TimeClockLogInterface> {
    return this.http.put<ApiResponse<TimeClockLogInterface>>(this.endpoint + workShiftId, workShiftData, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  public delete(workShiftId: string): Observable<any> {
    return this.http.delete(this.endpoint + workShiftId, { headers: this.defaultHeaders });
  }

}
