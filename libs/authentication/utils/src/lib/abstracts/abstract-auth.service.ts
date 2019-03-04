import { HttpHeaders } from "@angular/common/http";

import { BaseService } from "@llstarscreamll/shared";

export abstract class BaseAuthService extends BaseService {

  public authHeaders(tokens: any): HttpHeaders {
    return this.defaultHeaders.append('Authorization', 'Bearer ' + tokens.access_token);
  }

}