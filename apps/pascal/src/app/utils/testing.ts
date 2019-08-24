import { NxModule } from '@nrwl/angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationDataAccessModule } from '@llstarscreamll/authentication-data-access';

export const TESTING_ENVIRONMENT = {
  api: 'http://my-api.com/'
};

export const TESTING_PROVIDERS = [
  { provide: 'environment', useValue: TESTING_ENVIRONMENT }
];

export const TESTING_IMPORTS = [
  NxModule.forRoot(),
  StoreModule.forRoot({}, { runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true }}),
  EffectsModule.forRoot([]),
  AuthenticationDataAccessModule,
  ReactiveFormsModule,
  RouterTestingModule,
  NoopAnimationsModule,
  HttpClientTestingModule
];
