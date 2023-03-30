import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthFacade } from '@kirby/authentication/data-access';

@Component({
  selector: 'pascal-auth-sign-up-page',
  templateUrl: './sign-up-page.component.html',
})
export class SignUpPageComponent implements OnInit, OnDestroy {
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

  signUp(credentials) {
    this.authFacade.signUp(credentials);
  }
}
