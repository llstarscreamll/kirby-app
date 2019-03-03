import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthFacade } from '@llstarscreamll/authentication-data-access';

@Component({
  selector: 'pascal-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent implements OnInit {

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  public authenticated$: Observable<boolean>;

  public constructor(
    private breakpointObserver: BreakpointObserver,
    private authFacade: AuthFacade,
  ) { }

  public ngOnInit(): void {
    this.authenticated$ = this.authFacade.isLoggedIn$;
  }

  public logout() {
    this.authFacade.logout();
  }

}
