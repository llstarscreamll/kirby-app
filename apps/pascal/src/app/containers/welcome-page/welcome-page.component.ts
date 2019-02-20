import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@llstarscreamll/auth-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'pascal-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  public user$: Observable<any>;

  public constructor(private authFacade: AuthFacade) { }

  public ngOnInit() {
    this.user$ = this.authFacade.authUser$;
  }

}
