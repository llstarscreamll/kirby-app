import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { BaseService, oneLevelFlattenObject } from '@kirby/shared';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class NoveltyService extends BaseService {
  private endpoint = this.env.api + 'api/v1/novelties/';

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
      params: oneLevelFlattenObject(query)
    });
  }

  searchNoveltyTypes(query: any = {}): Observable<any> {
    const endpoint = this.env.api + 'api/v1/novelty-types/';
    return this.http.get<any>(endpoint, {
      headers: this.defaultHeaders,
      params: query
    });
  }

  createMany(data: any): Observable<any> {
    const endpoint = this.endpoint + 'create-many';
    return this.http
      .post<any>(endpoint, data, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  get(id: string): Observable<any> {
    const endpoint = this.endpoint + id;
    return this.http
      .get<any>(endpoint, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  downloadReport(query: {
    employee_id?: string;
    start_date: string;
    end_date: string;
  }): Observable<any> {
    const endpoint = `${this.endpoint}export`;
    return this.http
      .post<any>(endpoint, query, {
        headers: this.defaultHeaders
      })
      .pipe(map(response => response.data));
  }

  update(id: string, noveltyData: any): Observable<any> {
    const endpoint = this.endpoint + id;
    return this.http
      .put<any>(endpoint, noveltyData, { headers: this.defaultHeaders })
      .pipe(map(response => response.data));
  }

  trash(id: string): Observable<any> {
    const endpoint = this.endpoint + id;
    return this.http.delete<any>(endpoint, { headers: this.defaultHeaders });
  }

  approve(noveltyId: string): Observable<any> {
    const endpoint = `${this.endpoint}${noveltyId}/approvals`;
    return this.http.post<any>(endpoint, {}, { headers: this.defaultHeaders });
  }

  setApprovalsByEmployeeAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const endpoint = `${this.endpoint}approvals-by-employee-and-date-range`;
    return this.http.post<any>(
      endpoint,
      {
        employee_id: employeeId,
        start_date: startDate,
        end_date: endDate
      },
      { headers: this.defaultHeaders }
    );
  }

  deleteApprovalsByEmployeeAndDateRange(
    employeeId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const endpoint = `${this.endpoint}approvals-by-employee-and-date-range`;
    return this.http.delete<any>(endpoint, {
      headers: this.defaultHeaders,
      params: {
        employee_id: employeeId,
        start_date: startDate,
        end_date: endDate
      }
    });
  }

  deleteApproval(noveltyId: string): Observable<any> {
    // always send 1, approval id doesn't matters, since the authenticated user
    // approval to said noveltyId will be deleted
    const endpoint = `${this.endpoint}${noveltyId}/approvals/1`;
    return this.http.delete<any>(endpoint, { headers: this.defaultHeaders });
  }
}
