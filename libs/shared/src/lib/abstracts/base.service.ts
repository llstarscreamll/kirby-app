import { HttpHeaders } from "@angular/common/http";

export abstract class BaseService {

  get defaultHeaders(): HttpHeaders {
    return new HttpHeaders()
      .append('Accept', 'application/json')
      .append('Content-type', 'application/json');
  }

}
