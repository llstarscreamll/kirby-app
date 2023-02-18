import {
  MatFormFieldDefaultOptions,
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { NxModule } from '@nrwl/angular';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { ActionReducer, INIT, MetaReducer, UPDATE } from '@ngrx/store';
import { DefaultRouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@kirby/shared';
import { AppComponent } from './app.component';
import { LocalStorageService } from '@kirby/shared';
import { environment } from '../environments/environment';
import { PrinterService, WeighingMachineService } from '@kirby/production/feature';
import { AuthenticationDataAccessModule } from '@kirby/authentication/data-access';
import { SignInPageComponent } from './containers/sign-in-page/sign-in-page.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { WelcomePageComponent } from './containers/welcome-page/welcome-page.component';

export function initStateFromLocalStorage(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    const newState = reducer(state, action);
    if ([INIT.toString(), UPDATE.toString()].includes(action.type)) {
      return { ...newState, ...LocalStorageService.loadInitialState() };
    }
    return newState;
  };
}

export const metaReducers: MetaReducer<any>[] = [initStateFromLocalStorage];

const matFormFieldAppearance: MatFormFieldDefaultOptions = { appearance: 'outline' };

const routes: Route[] = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  { path: 'login', component: SignInPageComponent },
  { path: 'welcome', component: WelcomePageComponent },
  {
    path: 'production',
    loadChildren: () => import('@kirby/production/feature').then((m) => m.ProductionFeatureModule),
  },
];

@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    BrowserModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    NxModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AuthenticationDataAccessModule,
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
    StoreRouterConnectingModule.forRoot({
      serializer: DefaultRouterStateSerializer,
    }),
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  declarations: [AppComponent, LandingPageComponent, WelcomePageComponent, SignInPageComponent, SignInFormComponent],
  providers: [
    PrinterService,
    WeighingMachineService,
    { provide: 'environment', useValue: environment },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: matFormFieldAppearance,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
