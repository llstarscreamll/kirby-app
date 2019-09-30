import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { ENV_MOCK, CREDENTIALS } from '../utils/mocks';
import { AUTH_TOKENS_MOCK, USER } from '@kirby/authentication/utils';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  const authUser = USER;
  const authTokens = AUTH_TOKENS_MOCK;
  const credentials = CREDENTIALS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: 'environment', useValue: ENV_MOCK }]
    });

    httpController = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it("should send POST '/api/v1/auth/login' with certain headers on loginWithCredentials()", fakeAsync(() => {
    authService
      .loginWithCredentials(credentials)
      .subscribe(data => expect(data).toEqual(authTokens), fail);

    const request = httpController.expectOne(
      ENV_MOCK.api + 'api/v1/auth/login'
    );
    expect(request.request.method).toEqual('POST');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual(
      'application/json'
    );
    expect(request.request.body).toEqual(credentials);

    request.flush(authTokens);
  }));

  it("should send DELETE '/api/v1/auth/logout' with certain headers on logout()", fakeAsync(() => {
    authService.logout().subscribe();

    const request = httpController.expectOne(
      ENV_MOCK.api + 'api/v1/auth/logout'
    );
    expect(request.request.method).toEqual('DELETE');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual(
      'application/json'
    );

    request.flush(['ok']);
  }));

  it("should send GET '/api/v1/auth/user' with certain headers on getAuthUser()", fakeAsync(() => {
    authService.getAuthUser().subscribe(data => expect(data).toEqual(authUser));

    const request = httpController.expectOne(ENV_MOCK.api + 'api/v1/auth/user');
    expect(request.request.method).toEqual('GET');
    expect(request.request.headers.get('Accept')).toEqual('application/json');
    expect(request.request.headers.get('Content-type')).toEqual(
      'application/json'
    );

    request.flush({ data: authUser });
  }));
});
