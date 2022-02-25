import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService, oneLevelFlattenObject } from '@kirby/shared';

@Injectable()
export class ProductionService extends BaseService {
  private logsEndpoint = this.env.api + 'api/v1/production-logs/';
  private reportEndpoint = this.env.api + 'api/v1/production-reports/';

  constructor(
    @Inject('environment')
    private env,
    private httpClient: HttpClient
  ) {
    super();
  }

  searchProductionLogs(query: any): Observable<any> {
    return this.httpClient.get(this.logsEndpoint, {
      headers: this.defaultHeaders,
      params: oneLevelFlattenObject(query),
    });
  }

  createProductionLog(data: any): Observable<any> {
    return this.httpClient.post(this.logsEndpoint, data, { headers: this.defaultHeaders });
  }

  updateProductionLog(id, data: any): Observable<any> {
    return this.httpClient.put(`${this.logsEndpoint}${id}`, data, { headers: this.defaultHeaders });
  }

  exportToCsv(data: any): Observable<any> {
    return this.httpClient.post(`${this.logsEndpoint}export-to-csv`, data, { headers: this.defaultHeaders });
  }

  get(id: string): Observable<any> {
    return this.httpClient
      .get(`${this.logsEndpoint}${id}`, { headers: this.defaultHeaders })
      .pipe(map(({ data }: any) => ({ data })));
  }

  getReport(query: any): Observable<any> {
    return this.httpClient
      .get(this.reportEndpoint, { headers: this.defaultHeaders, params: oneLevelFlattenObject(query) })
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

  searchCostCenters(query: any): Observable<any> {
    return this.httpClient.get(`${this.env.api}api/v1/cost-centers`, {
      headers: this.defaultHeaders,
      params: oneLevelFlattenObject(query),
    });
  }
}
