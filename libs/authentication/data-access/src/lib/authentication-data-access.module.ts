import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthFacade } from './+state/auth.facade';
import { AuthEffects } from './+state/auth.effects';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './services/auth.service';
import { SharedModule } from '@llstarscreamll/shared';
import { authReducer, initialState, AUTH_FEATURE_KEY } from './+state/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, { initialState: initialState }),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthFacade, AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AuthenticationDataAccessModule { }
