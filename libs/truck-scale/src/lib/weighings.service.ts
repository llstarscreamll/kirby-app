import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Driver, Vehicle } from './+state/models';
import { BaseAuthService } from '@kirby/authentication/utils';
import { Pagination, oneLevelFlattenObject } from '@kirby/shared';

interface WeighingPaginatedResponse {
  data: any[];
  current_page: number;
  from: number;
  to: number;
  per_page: number;
  path: string;
  first_page_url: string;
  next_page_url: string;
  prev_page_url: string;
}

@Injectable()
export class WeighingsService extends BaseAuthService {
  private weighingsEndpoint = `${this.env.api}api/1.0/weighings`;
  private vehiclesEndpoint = `${this.env.api}api/1.0/vehicles`;
  private driversEndpoint = `${this.env.api}api/1.0/drivers`;

  constructor(
    @Inject('environment')
    private env: { api: string },
    private httpClient: HttpClient
  ) {
    super();
  }

  searchWeighings(query = {}): Observable<Pagination<any>> {
    return this.httpClient
      .get<WeighingPaginatedResponse>(this.weighingsEndpoint, {
        params: oneLevelFlattenObject(query),
        headers: this.defaultHeaders,
      })
      .pipe(
        map(({ data, current_page, from, to, per_page, path, first_page_url, next_page_url, prev_page_url }) => ({
          data,
          meta: { current_page, from, to, per_page, path, first_page_url, next_page_url, prev_page_url },
        }))
      );
  }

  exportWeighings(query: any): Observable<{ data: string }> {
    return this.httpClient.post<{ data: string }>(`${this.weighingsEndpoint}/export`, query, {
      headers: this.defaultHeaders,
    });
  }

  createWeighing(data: any): Observable<{ data: string }> {
    return this.httpClient.post<{ data: string }>(this.weighingsEndpoint, data, { headers: this.defaultHeaders });
  }

  searchVehicles(term: string): Observable<{ data: Vehicle[] }> {
    return this.httpClient.get<{ data: Vehicle[] }>(this.vehiclesEndpoint, {
      params: { s: term },
      headers: this.defaultHeaders,
    });
  }

  searchDrivers(term: string): Observable<{ data: Driver[] }> {
    return this.httpClient.get<{ data: Driver[] }>(this.driversEndpoint, {
      params: { s: term },
      headers: this.defaultHeaders,
    });
  }
}