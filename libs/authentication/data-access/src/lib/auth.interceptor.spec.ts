import { from } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ENV_MOCK } from './testing';
import { AuthFacade } from './+state/auth.facade';
import { AuthInterceptor } from './auth.interceptor';
import { AUTH_TOKENS_MOCK } from '@kirby/authentication/utils';
import {
  AUTH_FEATURE_KEY,
  authReducer,
  initialState
} from './+state/auth.reducer';

@Injectable()
class FakeService {
  public constructor(private httpClient: HttpClient) {}

  public sendData(data = {}) {
    return this.httpClient.post('http://fake-endpoint.test/path', data);
  }
}

describe('AuthInterceptor', () => {
  let fakeService: FakeService;
  let httpController: HttpTestingController;
  const authTokens = AUTH_TOKENS_MOCK;
  let facade: AuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(
          {},
          {
            runtimeChecks: {
              strictStateImmutability: true,
              strictActionImmutability: true
            }
          }
        ),
        StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, { initialState })
      ],
      providers: [
        FakeService,
        AuthFacade,
        { provide: 'environment', useValue: ENV_MOCK },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });

    httpController = TestBed.get(HttpTestingController);
    fakeService = TestBed.get(FakeService);
    facade = TestBed.get(AuthFacade);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', inject([FakeService], (service: FakeService) => {
    expect(service).toBeTruthy();
  }));

  it('should set Authorization header if tokens exists', fakeAsync(() => {
    facade.authTokens$ = from([authTokens]);

    const fakeResponse = { data: 'all ok!!' };
    const fakeBody = { email: 'foo@bar.com' };

    fakeService
      .sendData(fakeBody)
      .subscribe(data => expect(data).toEqual(fakeResponse), fail);

    const request = httpController.expectOne('http://fake-endpoint.test/path');
    expect(request.request.method).toEqual('POST');
    expect(request.request.headers.get('Authorization')).toEqual(
      `Bearer ${authTokens.access_token}`
    );
    expect(request.request.body).toEqual(fakeBody);

    request.flush(fakeResponse);
  }));

  it('should not set Authorization header if tokens does not exists', fakeAsync(() => {
    facade.authTokens$ = from([null]);

    const fakeResponse = { data: 'all ok!!' };
    const fakeBody = { email: 'foo@bar.com' };

    fakeService
      .sendData(fakeBody)
      .subscribe(data => expect(data).toEqual(fakeResponse), fail);

    const request = httpController.expectOne('http://fake-endpoint.test/path');
    expect(request.request.headers.has('Authorization')).toBe(false);
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(fakeBody);

    request.flush(fakeResponse);
  }));
});
