import { NxModule } from '@nrwl/nx';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { SharedModule } from '@llstarscreamll/shared';
import { environment } from '../environments/environment';
import { LlstarscreamllCoreModule } from '@llstarscreamll/web';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './containers/sign-in-page/sign-in-page.component';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { WelcomePageComponent } from './containers/welcome-page/welcome-page.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { AuthenticationDataAccessModule } from '@llstarscreamll/authentication-data-access';
import { ProductionRecordByWeightComponent } from './containers/production-record-by-weight/production-record-by-weight.component';
import { HttpClientModule } from '@angular/common/http';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  { path: 'login', component: SignInPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'production-record-by-weight', component: ProductionRecordByWeightComponent },
  { path: 'work-shifts', loadChildren: '@llstarscreamll/work-shifts/feature#WorkShiftsFeatureModule' },
];

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ReactiveFormsModule,
    CoreModule,
    LlstarscreamllCoreModule,
    SharedModule,
    AuthenticationDataAccessModule,
    HttpClientModule,

    BrowserAnimationsModule,
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
    SidebarLayoutComponent,
    ProductionRecordByWeightComponent
  ],
  providers: [
    { provide: 'environment', useValue: environment },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
