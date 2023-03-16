import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@kirby/authentication/data-access';

@Component({
  selector: 'kirby-welcome-page',
  templateUrl: './welcome-page.component.html',
})
export class WelcomePageComponent implements OnInit {

  user$: Observable<any>;

  constructor(private authFacade: AuthFacade) { }

  ngOnInit() {
    this.user$ = this.authFacade.authUser$;
  }

}
