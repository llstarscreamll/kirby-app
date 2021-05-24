import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService, oneLevelFlattenObject, Pagination } from '@kirby/shared';

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
    return this.httpClient
      .get(this.endpoint, { headers: this.defaultHeaders, params: query })
      .pipe(map(({ data, ...meta }: any) => ({ data, meta })));
  }

  createProductionLog(data: any): Observable<any> {
    return this.httpClient.post(this.endpoint, data, { headers: this.defaultHeaders });
  }

  get(id: string): Observable<any> {
    return this.httpClient
      .get(`${this.endpoint}${id}`, { headers: this.defaultHeaders })
      .pipe(map(({ data }: any) => ({ data })));
  }

  // ######################################################################## //
  // @todo: los siguientes métodos deben ser movidos a servicios especializados
  // en las entidades correspondientes
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
