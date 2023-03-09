import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '@kirby/shared';

import { AuthFacade } from './+state/auth.facade';
import { AuthEffects } from './+state/auth.effects';
import { authReducer } from './+state/auth.reducer';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from './services/auth.service';
import { AddAccessTokenInterceptor } from './add-access-token.interceptor';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    StoreModule.forFeature(authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [
    AuthFacade,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AddAccessTokenInterceptor, multi: true },
  ],
})
export class AuthenticationDataAccessModule {}
