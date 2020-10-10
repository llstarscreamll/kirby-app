import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '@kirby/shared';

@Injectable()
export class ShopService extends BaseService {
  private baseUrl = `${this.env.api}api/v1/orders`;

  constructor(
    @Inject('environment')
    private env: { api: string },
    private httpClient: HttpClient
  ) {
    super();
  }

  placeOrder(orderData: any) {
    return this.httpClient.post(this.baseUrl, orderData, { headers: this.defaultHeaders });
  }
}
