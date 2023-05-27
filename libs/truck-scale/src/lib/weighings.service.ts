import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Driver, Vehicle } from './+state/models';
import { BaseAuthService } from '@kirby/authentication/utils';

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
