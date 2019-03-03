import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthTokens } from '../interfaces/auth-tokens';
import { BaseAuthService } from '../abstracts/abstract-auth.service';
import { NewAccount } from '../interfaces/new-account';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class AuthService extends BaseAuthService {

  private signUpEndpoint = this.env.api + 'api/sign-up';
  private loginEndpoint = this.env.api + 'api/login';
  private logoutEndpoint = this.env.api + 'api/logout';
  private authUserEndpoint = this.env.api + 'api/user';

  constructor(
    @Inject('environment')
    private env,
    private http: HttpClient
  ) { super(); }

  public signUp(newAccount: NewAccount): Observable<AuthTokens | any> {
    return this.http.post(this.signUpEndpoint, newAccount, { headers: this.defaultHeaders });
  }

  public loginWithCredentials(credentials): Observable<any> {
    return this.http.post(this.loginEndpoint, credentials, { headers: this.defaultHeaders });
  }

  public logout(authTokens: AuthTokens): Observable<any> {
    return this.http.delete(this.logoutEndpoint, { headers: this.authHeaders(authTokens) });
  }

  public getAuthUser(tokens): Observable<any> {
    return this.http.get(this.authUserEndpoint, { headers: this.authHeaders(tokens) });
  }
}
