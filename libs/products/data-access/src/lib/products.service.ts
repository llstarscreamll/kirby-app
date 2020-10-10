import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import {
  BaseService,
  deserializeJsonApi,
  flatToOneLevelObject,
} from '@kirby/shared';
import { QuerySearch } from './+state/categories.actions';

@Injectable()
export class ProductsService extends BaseService {
  private baseUrl = `${this.env.api}api/v1/products/`;

  constructor(
    @Inject('environment')
    private env: { api: string },
    private http: HttpClient
  ) {
    super();
  }

  search(query: QuerySearch) {
    return this.http
      .get(this.baseUrl, {
        headers: this.defaultHeaders,
        params: flatToOneLevelObject(query),
      })
      .pipe(map(deserializeJsonApi));
  }
}
