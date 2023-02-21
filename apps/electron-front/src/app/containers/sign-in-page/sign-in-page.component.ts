import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthFacade } from '@kirby/authentication/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'pascal-auth-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
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
