import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';

import { AuthFacade } from '@kirby/authentication/data-access';

@Component({
  selector: 'pascal-sidebar-layout',
  templateUrl: './sidebar-layout.component.html',
  styleUrls: ['./sidebar-layout.component.scss'],
})
export class SidebarLayoutComponent {
  authenticated$ = this.authFacade.isLoggedIn$;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(map((result) => result.matches));

  mediaQueryList = this.mediaMatcher.matchMedia('print');
  menuItems = [
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
      icon: 'precision_manufacturing',
      link: ['/production'],
      label: 'Producción',
      can: ['production-logs.search'],
    },
    {
      icon: 'supervised_user_circle',
      link: ['/employees/'],
      label: 'Empleados',
      can: ['employees.search'],
    },
  ];

  constructor(
    private authFacade: AuthFacade,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver
  ) {}

  get isPrint(): boolean {
    return this.mediaQueryList.matches;
  }

  logout() {
    this.authFacade.logout();
  }
}
