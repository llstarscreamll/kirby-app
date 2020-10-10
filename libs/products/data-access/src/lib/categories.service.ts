import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { QuerySearch } from './+state/categories.actions';
import {
  BaseService,
  flatToOneLevelObject,
  Pagination,
  deserializeJsonApi,
} from '@kirby/shared';
import { ICategory } from '@kirby/products/data';

@Injectable()
export class CategoriesService extends BaseService {
  private baseUrl = `${this.env.api}api/v1/categories/`;

  constructor(
    @Inject('environment')
    private env: { api: string },
    private http: HttpClient
  ) {
    super();
  }

  search(query: QuerySearch) {
    return this.http
      .get<Pagination<ICategory>>(this.baseUrl, {
        headers: this.defaultHeaders,
        params: flatToOneLevelObject(query),
      })
      .pipe(map(deserializeJsonApi));
  }

  getBySlug(slug: string, query: any = {}) {
    return this.http
      .get<Pagination<ICategory>>(`${this.baseUrl}${slug}`, {
        headers: this.defaultHeaders,
        params: { ...query, by_slug: '1' },
      })
      .pipe(map(deserializeJsonApi));
  }
}
