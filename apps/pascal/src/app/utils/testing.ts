import { NxModule } from '@nrwl/nx';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthStateModule } from '@llstarscreamll/authentication-data-access';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

export const TESTING_ENVIRONMENT = {
  api: 'http://my.api',
};

export const TESTING_PROVIDERS = [
  { provide: 'environment', useValue: TESTING_ENVIRONMENT }
];

export const TESTING_IMPORTS = [
  NxModule.forRoot(),
  StoreModule.forRoot({}),
  EffectsModule.forRoot([]),
  AuthStateModule,
  ReactiveFormsModule,
  RouterTestingModule,
  NoopAnimationsModule,
];