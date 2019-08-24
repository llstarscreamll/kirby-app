import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, Location, PlatformLocation } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';


import { debug } from './meta-reducers/debug.reducer';
import { AnimationsService } from './animations/animations.service';
import { environment } from '../../environments/environment';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';

export const metaReducers: MetaReducer<any>[] = [initStateFromLocalStorage];

if (!environment.production) {
  metaReducers.unshift(storeFreeze);
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

@NgModule({
  imports: [
    // angular
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot({}, { metaReducers, runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true } }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
  ],
  declarations: [],
  providers: [
    AnimationsService,
  ],
  exports: []
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
