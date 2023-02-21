import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@kirby/authentication/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'pascal-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  user$: Observable<any>;

  constructor(private authFacade: AuthFacade) { }

  ngOnInit() {
    this.user$ = this.authFacade.authUser$;
  }

}
