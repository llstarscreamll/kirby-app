import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Pagination, ApiResponse } from '@kirby/shared';
import { BaseAuthService } from '@kirby/authentication/utils';
import { TimeClockLogModel } from '@kirby/time-clock-logs/util';

@Injectable()
export class TimeClockLogsService extends BaseAuthService {
  private endpoint = this.env.api + 'api/v1/time-clock-logs/';

  public constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) {
    super();
  }

  public search(query: any = {}): Observable<Pagination<TimeClockLogModel>> {
    return this.http
      .get<Pagination<TimeClockLogModel>>(this.endpoint, {
        headers: this.defaultHeaders,
        params: query
      })
      .pipe(
        map(resp => ({
          ...resp,
          data: TimeClockLogModel.fromJsonList(resp.data)
        }))
      );
  }

  public getEmployeeTimeClockData(query: any = {}): Observable<any> {
    return this.http.get(
      this.env.api + 'api/v1/time-clock/employee-access-data',
      { headers: this.defaultHeaders, params: query }
    );
  }

  public searchSubCostCenters(query: any = {}): Observable<any> {
    return this.http.get<Pagination<any>>(
      this.env.api + 'api/v1/sub-cost-centers',
      { headers: this.defaultHeaders, params: query }
    );
  }

  public create(workShiftData: any): Observable<TimeClockLogModel> {
    return this.http
      .post<ApiResponse<TimeClockLogModel>>(this.endpoint, workShiftData, {
        headers: this.defaultHeaders
      })
      .pipe(map(response => response.data));
  }

  public get(workShiftId: string): Observable<TimeClockLogModel> {
    return this.http
      .get<ApiResponse<TimeClockLogModel>>(this.endpoint + workShiftId, {
        headers: this.defaultHeaders
      })
      .pipe(map(response => response.data));
  }

  public update(
    workShiftId: string,
    workShiftData: any
  ): Observable<TimeClockLogModel> {
    return this.http
      .put<ApiResponse<TimeClockLogModel>>(
        this.endpoint + workShiftId,
        workShiftData,
        { headers: this.defaultHeaders }
      )
      .pipe(map(response => response.data));
  }

  public delete(workShiftId: string): Observable<any> {
    return this.http.delete(this.endpoint + workShiftId, {
      headers: this.defaultHeaders
    });
  }

  public checkIn(entryAndExitLog: {
    identification_code: string;
    action: string;
  }): Observable<any> {
    return this.http
      .post<ApiResponse<any>>(
        `${this.env.api}api/v1/time-clock/check-in`,
        entryAndExitLog,
        { headers: this.defaultHeaders }
      )
      .pipe(map(response => response.data));
  }

  public checkOut(entryAndExitLog: {
    identification_code: string;
    action: string;
  }): Observable<any> {
    return this.http
      .post<ApiResponse<any>>(
        `${this.env.api}api/v1/time-clock/check-out`,
        entryAndExitLog,
        { headers: this.defaultHeaders }
      )
      .pipe(map(response => response.data));
  }

  public approve(timeClockLogId: string): Observable<any> {
    const endpoint = `${
      this.env.api
    }api/v1/time-clock-logs/${timeClockLogId}/approvals`;
    return this.http.post<any>(endpoint, {}, { headers: this.defaultHeaders });
  }

  public deleteApproval(timeClockLogId: string): Observable<any> {
    // always send 1, approval id doesn't matters, since the authenticated user
    // approval to said timeClockLogId will be deleted
    const endpoint = `${
      this.env.api
    }api/v1/time-clock-logs/${timeClockLogId}/approvals/1`;
    return this.http.delete<any>(endpoint, { headers: this.defaultHeaders });
  }
}
