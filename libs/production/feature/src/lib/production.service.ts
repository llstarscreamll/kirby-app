import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService, oneLevelFlattenObject, Pagination } from '@kirby/shared';
import { ProductionLog } from './+state/production.models';

@Injectable()
export class ProductionService extends BaseService {
  private endpoint = this.env.api + 'api/v1/production-logs/';

  constructor(
    @Inject('environment')
    private env,
    private httpClient: HttpClient
  ) {
    super();
  }

  searchProductionLogs(query: any): Observable<any> {
    return this.httpClient.get(this.endpoint, { headers: this.defaultHeaders, params: query });
  }

  createProductionLog(data: any): Observable<any> {
    return this.httpClient.post(this.endpoint, data, { headers: this.defaultHeaders });
  }

  // ######################################################################## //
  searchProducts(query: any): Observable<any> {
    return this.httpClient.get(`${this.env.api}api/v1/products`, {
      headers: this.defaultHeaders,
      params: oneLevelFlattenObject(query),
    });
  }

  searchMachines(query: any): Observable<any> {
    return this.httpClient.get(`${this.env.api}api/v1/machines`, {
      headers: this.defaultHeaders,
      params: oneLevelFlattenObject(query),
    });
  }

  searchCustomers(query: any): Observable<any> {
    return this.httpClient.get(`${this.env.api}api/v1/customers`, {
      headers: this.defaultHeaders,
      params: oneLevelFlattenObject(query),
    });
  }
}
