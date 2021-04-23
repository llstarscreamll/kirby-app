import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { SidebarLayoutComponent } from './sidebar-layout.component';
import { AuthorizationUiTestModule } from '@kirby/authorization/ui';
import { TESTING_PROVIDERS, TESTING_IMPORTS } from '../../utils/testing';

describe('SidebarLayoutComponent', () => {
  let component: SidebarLayoutComponent;
  let fixture: ComponentFixture<SidebarLayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarLayoutComponent],
      imports: [
        ...TESTING_IMPORTS,
        AuthorizationUiTestModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule
      ],
      providers: [...TESTING_PROVIDERS],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation elements when unauthenticated', () => {
    const html: HTMLElement = fixture.debugElement.nativeElement;
    const topBarElement = html.querySelector('.main-top-bar');

    expect(topBarElement).toBeTruthy();
    expect(topBarElement.textContent).toContain('Entrar');
    expect(topBarElement.textContent).toContain('Crear cuenta');
  });
});
