import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthFacade } from '@kirby/authentication/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'pascal-auth-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
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
