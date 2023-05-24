import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseAuthService } from '@kirby/authentication/utils';
import { Observable } from 'rxjs';
import { Vehicle } from './+state/models';

@Injectable()
export class WeighingsService extends BaseAuthService {
  private vehiclesEndpoint = `${this.env.api}api/1.0/vehicles`;

  constructor(
    @Inject('environment')
    private env: { api: string },
    private httpClient: HttpClient
  ) {
    super();
  }

  searchVehicles(term: string): Observable<{ data: Vehicle[] }> {
    return this.httpClient.get<{ data: Vehicle[] }>(this.vehiclesEndpoint, {
      params: { s: term },
      headers: this.defaultHeaders,
    });
  }
}
