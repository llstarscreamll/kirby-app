import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { AuthFacade } from './+state/auth.facade';
import { SharedModule } from '@agile-work/shared';
import { AuthEffects } from './+state/auth.effects';
import { AuthService } from './services/auth.service';
import { authReducer, initialState } from './+state/auth.reducer';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('auth', authReducer, { initialState: initialState }),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthFacade, AuthService]
})
export class AuthStateModule { }
