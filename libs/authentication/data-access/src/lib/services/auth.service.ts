import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';

import { BaseAuthService } from '@kirby/authentication/utils';
import { NewAccount, AuthTokens } from '@kirby/authentication/utils';

@Injectable()
export class AuthService extends BaseAuthService {

  private signUpEndpoint = this.env.api + 'api/v1/auth/sign-up';
  private loginEndpoint = this.env.api + 'api/v1/auth/login';
  private logoutEndpoint = this.env.api + 'api/v1/auth/logout';
  private authUserEndpoint = this.env.api + 'api/v1/auth/user';

  constructor(
    @Inject('environment')
    private env: any,
    private http: HttpClient
  ) { super(); }

  signUp(newAccount: NewAccount): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(this.signUpEndpoint, newAccount, { headers: this.defaultHeaders });
  }

  loginWithCredentials(credentials: any): Observable<AuthTokens> {
    return this.http.post<AuthTokens>(this.loginEndpoint, credentials, { headers: this.defaultHeaders });
  }

  logout(): Observable<any> {
    return this.http.delete(this.logoutEndpoint, { headers: this.defaultHeaders });
  }

  getAuthUser(): Observable<any> {
    return this.http.get<any>(this.authUserEndpoint, { headers: this.defaultHeaders })
      .pipe(map(res => res.data));
  }
}
