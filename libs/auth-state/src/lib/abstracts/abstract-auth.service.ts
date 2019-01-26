import { HttpHeaders } from "@angular/common/http";

import { AuthTokens } from "../interfaces/auth-tokens";
import { BaseService } from "libs/shared/src/lib/abstracts/base.service";

export abstract class BaseAuthService extends BaseService {

  public authHeaders(tokens: AuthTokens): HttpHeaders {
    return this.defaultHeaders.append('Authorization', 'Bearer ' + tokens.access_token);
  }

}