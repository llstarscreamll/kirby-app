import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Pagination, BaseService } from '@kirby/shared';
import { NoveltyType } from '@kirby/novelty-types/data';

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

  search(query: any = {}): Observable<Pagination<NoveltyType>> {
    return this.httpClient.get<Pagination<NoveltyType>>(
      this.endpoint,
      { headers: this.defaultHeaders, params: query }
    );
  }

  get(id: any = {}): Observable<{ data: NoveltyType }> {
    return this.httpClient.get<{ data: NoveltyType }>(
      this.endpoint + id,
      { headers: this.defaultHeaders }
    );
  }

  create(data): Observable<{ data: NoveltyType }> {
    return this.httpClient.post<{ data: NoveltyType }>(
      this.endpoint,
      data,
      { headers: this.defaultHeaders }
    );
  }

  update(id: string, data: any): Observable<{ data: NoveltyType }> {
    return this.httpClient.put<{ data: NoveltyType }>(
      this.endpoint + id,
      data,
      { headers: this.defaultHeaders }
    );
  }

  trash(id: string): Observable<any> {
    return this.httpClient.delete(this.endpoint + id, {
      headers: this.defaultHeaders,
    });
  }
}
