import { NxModule } from '@nrwl/nx';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatListModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { CoreModule } from './core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthStateModule } from '@agile-work/auth-state';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInPageComponent } from './containers/sign-in-page/sign-in-page.component';
import { SidebarLayoutComponent } from './layouts/sidebar-layout/sidebar-layout.component';
import { LandingPageComponent } from './containers/landing-page/landing-page.component';
import { WelcomePageComponent } from './containers/welcome-page/welcome-page.component';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', component: LandingPageComponent },
  { path: 'login', component: SignInPageComponent },
  { path: 'welcome', component: WelcomePageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarLayoutComponent,
    SignInFormComponent,
    SignInPageComponent,
    LandingPageComponent,
    WelcomePageComponent,
  ],
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    ReactiveFormsModule,
    CoreModule,
    AuthStateModule,

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
  ],
  providers: [
    { provide: 'environment', useValue: environment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
