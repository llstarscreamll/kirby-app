import { NxModule } from '@nrwl/angular';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import { CoreModule } from './core';
import { AppComponent } from './app.component';
import { SharedModule } from '@kirby/shared';
import { environment } from '../environments/environment';
import { AuthorizationUiModule } from '@kirby/authorization/ui';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './containers/sign-in-page/sign-in-page.component';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { WelcomePageComponent } from './containers/welcome-page/welcome-page.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { AuthenticationDataAccessModule } from '@kirby/authentication-data-access';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  { path: 'login', component: SignInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'welcome', component: WelcomePageComponent },
  {
    path: 'work-shifts',
    loadChildren: () =>
      import('@kirby/work-shifts/feature').then(m => m.WorkShiftsFeatureModule)
  },
  {
    path: 'time-clock-logs',
    loadChildren: () =>
      import('@kirby/time-clock-logs/feature').then(
        m => m.TimeClockLogsFeatureModule
      )
  },
  {
    path: 'employees',
    loadChildren: () =>
      import('@kirby/employees/feature').then(m => m.EmployeesFeatureModule)
  },
  {
    path: 'novelties',
    loadChildren: () =>
      import('@kirby/novelties/feature').then(m => m.NoveltiesFeatureModule)
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    AuthorizationUiModule,
    AuthenticationDataAccessModule,

    BrowserAnimationsModule,
    MatMomentDateModule,
    LayoutModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  declarations: [
    AppComponent,
    SignInFormComponent,
    SignUpFormComponent,
    SignInPageComponent,
    LandingPageComponent,
    WelcomePageComponent,
    SignUpPageComponent,
    SidebarLayoutComponent
  ],
  providers: [{ provide: 'environment', useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule {}
