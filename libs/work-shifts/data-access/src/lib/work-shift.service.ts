import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Pagination } from '@llstarscreamll/shared';
import { WorkShiftInterface } from './work-shift.interface';
import { BaseAuthService } from '@llstarscreamll/authentication/utils';

@Injectable()
export class WorkShiftService extends BaseAuthService {

  private endpoint = this.env.api + 'api/v1/work-shifts/';

  public constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) { super(); }

  public search(query: any, tokens: any): Observable<Pagination<WorkShiftInterface>> {
    return this.http.get<PaginatedWorkShiftsInterface>(this.endpoint, { headers: this.authHeaders(tokens) });
  }

  public create(workShiftData: any, tokens: any): Observable<WorkShiftInterface> {
    return this.http.post<WorkShiftInterface>(this.endpoint, workShiftData, { headers: this.authHeaders(tokens) });
  }

  public get(workShiftId: number, tokens: any): Observable<WorkShiftInterface> {
    return this.http.get<WorkShiftInterface>(this.endpoint + workShiftId, { headers: this.authHeaders(tokens) });
  }

  public update(workShiftId: number, workShiftData: any, tokens: any): Observable<WorkShiftInterface> {
    return this.http.put<WorkShiftInterface>(this.endpoint + workShiftId, workShiftData, { headers: this.authHeaders(tokens) });
  }

  public delete(workShiftId: number, tokens: any): Observable<any> {
    return this.http.delete(this.endpoint + workShiftId, { headers: this.authHeaders(tokens) });
  }

}
