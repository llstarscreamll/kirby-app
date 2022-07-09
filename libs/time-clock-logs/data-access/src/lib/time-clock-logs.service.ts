import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Pagination, ApiResponse } from '@kirby/shared';
import { BaseAuthService } from '@kirby/authentication/utils';
import { TimeClockLogModel } from '@kirby/time-clock-logs/util';

@Injectable()
export class TimeClockLogsService extends BaseAuthService {
  private endpoint = this.env.api + 'api/v1/time-clock-logs/';

  constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) {
    super();
  }

  search(query: any = {}): Observable<Pagination<TimeClockLogModel>> {
    return this.http
      .get<Pagination<TimeClockLogModel>>(this.endpoint, {
        headers: this.defaultHeaders,
        params: query,
      })
      .pipe(
        map((resp) => ({
          ...resp,
          data: TimeClockLogModel.fromJsonList(resp.data),
        }))
      );
  }

  downloadReport(query = {}): Observable<any> {
    return this.http.get(`${this.endpoint}export`, { params: query, headers: this.defaultHeaders });
  }

  getStatistics(): Observable<any> {
    return this.http.get(`${this.env.api}api/v1/time-clock/statistics`, { headers: this.defaultHeaders });
  }

  getEmployeeTimeClockData(query: any = {}): Observable<any> {
    return this.http.get(this.env.api + 'api/v1/time-clock/employee-access-data', {
      headers: this.defaultHeaders,
      params: query,
    });
  }

  searchSubCostCenters(query: any = {}): Observable<any> {
    return this.http.get<Pagination<any>>(this.env.api + 'api/v1/sub-cost-centers', {
      headers: this.defaultHeaders,
      params: query,
    });
  }

  create(workShiftData: any): Observable<TimeClockLogModel> {
    return this.http
      .post<ApiResponse<TimeClockLogModel>>(this.endpoint, workShiftData, {
        headers: this.defaultHeaders,
      })
      .pipe(map((response) => response.data));
  }

  get(workShiftId: string): Observable<TimeClockLogModel> {
    return this.http
      .get<ApiResponse<TimeClockLogModel>>(this.endpoint + workShiftId, {
        headers: this.defaultHeaders,
      })
      .pipe(map((response) => response.data));
  }

  update(workShiftId: string, workShiftData: any): Observable<TimeClockLogModel> {
    return this.http
      .put<ApiResponse<TimeClockLogModel>>(this.endpoint + workShiftId, workShiftData, { headers: this.defaultHeaders })
      .pipe(map((response) => response.data));
  }

  delete(workShiftId: string): Observable<any> {
    return this.http.delete(this.endpoint + workShiftId, {
      headers: this.defaultHeaders,
    });
  }

  checkIn(entryAndExitLog: { identification_code: string; action: string }): Observable<any> {
    return this.http
      .post<ApiResponse<any>>(`${this.env.api}api/v1/time-clock/check-in`, entryAndExitLog, {
        headers: this.defaultHeaders,
      })
      .pipe(map((response) => response.data));
  }

  checkOut(entryAndExitLog: { identification_code: string; action: string }): Observable<any> {
    return this.http
      .post<ApiResponse<any>>(`${this.env.api}api/v1/time-clock/check-out`, entryAndExitLog, {
        headers: this.defaultHeaders,
      })
      .pipe(map((response) => response.data));
  }

  approve(timeClockLogId: string): Observable<any> {
    const endpoint = `${this.env.api}api/v1/time-clock-logs/${timeClockLogId}/approvals`;
    return this.http.post<any>(endpoint, {}, { headers: this.defaultHeaders });
  }

  deleteApproval(timeClockLogId: string): Observable<any> {
    // always send 1, approval id doesn't matters, since the authenticated user
    // approval to said timeClockLogId will be deleted
    const endpoint = `${this.env.api}api/v1/time-clock-logs/${timeClockLogId}/approvals/1`;
    return this.http.delete<any>(endpoint, { headers: this.defaultHeaders });
  }
}
