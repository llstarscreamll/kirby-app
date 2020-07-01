import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Pagination, BaseService } from '@kirby/shared';
import { NoveltyTypeInterface } from '@kirby/novelty-types/data/src';

@Injectable()
export class NoveltyTypeService extends BaseService {
  private endpoint = this.env.api + 'api/v1/novelty-types/';

  constructor(
    @Inject('environment')
    private env,
    private httpClient: HttpClient
  ) {
    super();
  }

  search(query: any = {}): Observable<Pagination<NoveltyTypeInterface>> {
    return this.httpClient.get<Pagination<NoveltyTypeInterface>>(
      this.endpoint,
      { headers: this.defaultHeaders, params: query }
    );
  }

  get(id: any = {}): Observable<{ data: NoveltyTypeInterface }> {
    return this.httpClient.get<{ data: NoveltyTypeInterface }>(
      this.endpoint + id,
      { headers: this.defaultHeaders }
    );
  }

  create(data): Observable<{ data: NoveltyTypeInterface }> {
    return this.httpClient.post<{ data: NoveltyTypeInterface }>(
      this.endpoint,
      data,
      { headers: this.defaultHeaders }
    );
  }

  update(id: string, data: any): Observable<{ data: NoveltyTypeInterface }> {
    return this.httpClient.put<{ data: NoveltyTypeInterface }>(
      this.endpoint + id,
      data,
      { headers: this.defaultHeaders }
    );
  }

  trash(id: any = {}): Observable<any> {
    return this.httpClient.delete(this.endpoint + id, {
      headers: this.defaultHeaders,
    });
  }
}
