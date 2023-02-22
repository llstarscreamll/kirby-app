import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FullRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { debug } from './meta-reducers/debug.reducer';
import { environment } from '../../environments/environment';
import { AnimationsService } from './animations/animations.service';
import { initStateFromLocalStorage } from './meta-reducers/init-state-from-local-storage.reducer';

export const metaReducers: MetaReducer<any>[] = [initStateFromLocalStorage];

if (!environment.production) {
  if (!environment.test) {
    metaReducers.unshift(debug);
  }
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ serializer: FullRouterStateSerializer }),
  ],
  providers: [AnimationsService],
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
