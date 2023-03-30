import {
  MatFormFieldModule,
  MatFormFieldDefaultOptions,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@kirby/shared';
import { AuthorizationUiModule } from '@kirby/authorization/ui';
import { AuthenticationDataAccessModule } from '@kirby/authentication/data-access';

import { CoreModule } from './core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './containers/sign-in-page/sign-in-page.component';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { WelcomePageComponent } from './containers/welcome-page/welcome-page.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';

const matFormFieldAppearance: MatFormFieldDefaultOptions = { appearance: 'outline' };

export const routes: Route[] = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  { path: 'login', component: SignInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'welcome', component: WelcomePageComponent },
  {
    path: 'work-shifts',
    loadChildren: () => import('@kirby/work-shifts/feature').then((m) => m.WorkShiftsFeatureModule),
  },
  {
    path: 'time-clock-logs',
    loadChildren: () => import('@kirby/time-clock-logs/feature').then((m) => m.TimeClockLogsFeatureModule),
  },
  {
    path: 'employees',
    loadChildren: () => import('@kirby/employees/feature').then((m) => m.EmployeesFeatureModule),
  },
  {
    path: 'novelties',
    loadChildren: () => import('@kirby/novelties/feature').then((m) => m.NoveltiesFeatureModule),
  },
  {
    path: 'production',
    loadChildren: () => import('@kirby/production/feature').then((m) => m.ProductionFeatureModule),
  },
];

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    LayoutModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    BrowserModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HttpClientModule,
    MatSidenavModule,
    MatGridListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    AuthorizationUiModule,
    BrowserAnimationsModule,
    AuthenticationDataAccessModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
  ],
  declarations: [
    AppComponent,
    SignUpPageComponent,
    SignInFormComponent,
    SignUpFormComponent,
    SignInPageComponent,
    LandingPageComponent,
    WelcomePageComponent,
    SidebarLayoutComponent,
  ],
  providers: [
    { provide: 'environment', useValue: environment },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: matFormFieldAppearance,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
