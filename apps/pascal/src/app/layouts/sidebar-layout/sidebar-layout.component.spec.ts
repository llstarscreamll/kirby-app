import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

import { SidebarLayoutComponent } from './sidebar-layout.component';
import { TESTING_PROVIDERS, TESTING_IMPORTS } from '../../utils/testing';

describe('SidebarLayoutComponent', () => {
  let component: SidebarLayoutComponent;
  let fixture: ComponentFixture<SidebarLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarLayoutComponent],
      imports: [
        ...TESTING_IMPORTS,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ],
      providers: [...TESTING_PROVIDERS]
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
