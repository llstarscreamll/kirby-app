import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

import { AuthFacade } from '@llstarscreamll/authentication-data-access';

@Component({
  selector: 'pascal-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss']
})
export class SidebarLayoutComponent implements OnInit {

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map(result => result.matches));

  public authenticated$: Observable<boolean>;

  public menuItems = [
    { icon: 'home', link: ['/welcome'], label: 'Home' },
    { icon: 'supervised_user_circle', link: ['/employees/sync-by-csv-file'], label: 'Empleados' },
    { icon: 'alarm', link: ['/time-clock-logs/entry-and-exit-log'], label: 'Portería' },
  ];

  public mediaQueryList: MediaQueryList;

  public constructor(
    private authFacade: AuthFacade,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
  ) { }

  public get isPrint(): boolean {
    return this.mediaQueryList.matches;
  }

  public ngOnInit(): void {
    this.authenticated$ = this.authFacade.isLoggedIn$;
    this.mediaQueryList = this.mediaMatcher.matchMedia('print');
  }

  public logout() {
    this.authFacade.logout();
  }

}
