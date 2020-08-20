import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { Pagination } from '@kirby/shared';
import { CostCenter } from '@kirby/cost-centers/data';
import { BaseAuthService } from '@kirby/authentication/utils';

@Injectable()
export class CostCentersService extends BaseAuthService {
  private endpoint = this.env.api + 'api/v1/cost-centers/';

  constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) {
    super();
  }

  search(query: any) {
    return this.http.get<Pagination<CostCenter>>(this.endpoint, {
      headers: this.defaultHeaders,
      params: query
    });
  }
}
