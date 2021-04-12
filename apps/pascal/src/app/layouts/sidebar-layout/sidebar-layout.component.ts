import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

import { AuthFacade } from '@kirby/authentication-data-access';

@Component({
  selector: 'pascal-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss'],
})
export class SidebarLayoutComponent implements OnInit {
  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map((result) => result.matches));

  public authenticated$: Observable<boolean>;

  public menuItems = [
    {
      icon: 'supervised_user_circle',
      link: ['/employees/'],
      label: 'Empleados',
      can: ['employees.search'],
    },
    {
      icon: 'compare_arrows',
      link: ['/time-clock-logs'],
      label: 'Entradas/salidas',
      can: ['time-clock-logs.global-search', 'time-clock-logs.employee-search'],
    },
    {
      icon: 'feedback',
      link: ['/novelties'],
      label: 'Novedades',
      can: ['novelties.global-search', 'novelties.employee-search'],
    },
    {
      icon: 'alarm',
      link: ['/work-shifts'],
      label: 'Turnos',
      can: ['work-shift.search'],
    },
    {
      icon: 'precision_manufacturing',
      link: ['/production'],
      label: 'Producción',
      can: ['production-logs.search'],
    },
  ];

  public mediaQueryList: MediaQueryList;

  public constructor(
    private authFacade: AuthFacade,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver
  ) {}

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
