import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthFacade } from '@kirby/authentication/data-access';

@Component({
  selector: 'kirby-auth-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styles: [
    `
      .wrapper {
        width: 100%;
        min-width: 280px;
        max-width: 400px;
        margin: 0 auto;
      }
    `,
  ],
})
export class SignInPageComponent implements OnInit, OnDestroy {
  errors$: Observable<any>;
  status$: Observable<string>;

  constructor(private authFacade: AuthFacade) {}

  ngOnInit() {
    this.errors$ = this.authFacade.errors$;
    this.status$ = this.authFacade.status$;
  }

  ngOnDestroy(): void {
    this.authFacade.cleanErrors();
  }

  login(credentials) {
    this.authFacade.loginWithCredentials(credentials);
  }
}
