import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthFacade } from '@llstarscreamll/authentication-data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'auth-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit, OnDestroy {

  public errors$: Observable<any>;
  public status$: Observable<string>;

  public constructor(private authFacade: AuthFacade) { }

  public ngOnInit() {
    this.errors$ = this.authFacade.errors$;
    this.status$ = this.authFacade.status$;
  }

  public ngOnDestroy(): void {
    this.authFacade.cleanErrors();
  }

  public signUp(credentials) {
    this.authFacade.signUp(credentials);
  }

}
