import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { AuthFacade } from './+state/auth.facade';
import { SharedModule } from '@llstarscreamll/shared';
import { AuthEffects } from './+state/auth.effects';
import { AuthService } from './services/auth.service';
import { authReducer, initialState, AUTH_FEATURE_KEY } from './+state/auth.reducer';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forFeature(AUTH_FEATURE_KEY, authReducer, { initialState: initialState }),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthFacade, AuthService],
})
export class AuthStateModule { }
