import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WorkShiftInterface } from './work-shift.interface';
import { BaseAuthService } from '@llstarscreamll/authentication/utils';
import { WorkShiftPaginationInterface } from './work-shift-pagination.interface';

@Injectable()
export class WorkShiftService extends BaseAuthService {

  private endpoint = this.env.api + 'api/v1/work-shifts/';

  public constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) { super(); }

  public search(query: any, tokens: any): Observable<WorkShiftPaginationInterface> {
    return this.http.get<WorkShiftPaginationInterface>(this.endpoint, { headers: this.authHeaders(tokens) });
  }

  public create(workShiftData: any, tokens: any): Observable<WorkShiftInterface> {
    return this.http.post<WorkShiftInterface>(this.endpoint, workShiftData, { headers: this.authHeaders(tokens) });
  }

  public getById(workShiftId: number, tokens: any): Observable<WorkShiftInterface> {
    return this.http.get<WorkShiftInterface>(this.endpoint + workShiftId, { headers: this.authHeaders(tokens) });
  }

  public updateById(workShiftId: number, workShiftData: any, tokens: any): Observable<WorkShiftInterface> {
    return this.http.put<WorkShiftInterface>(this.endpoint + workShiftId, workShiftData, { headers: this.authHeaders(tokens) });
  }

}
