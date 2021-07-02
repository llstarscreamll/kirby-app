import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthFacade } from '@kirby/authentication/data-access';
import { SignInPageComponent } from './sign-in-page.component';

describe('SignInPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;
  let authFacade: AuthFacade;
  const credentials = { email: 'tony@stark.com', password: 'tony.123' };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [SignInPageComponent],
        providers: [{ provide: AuthFacade, useValue: { cleanErrors: () => true, loginWithCredentials: () => true } }],

        schemas: [NO_ERRORS_SCHEMA],
      }).compileComponents();

      fixture = TestBed.createComponent(SignInPageComponent);
      component = fixture.componentInstance;
      authFacade = TestBed.get(AuthFacade);

      spyOn(authFacade, 'loginWithCredentials').and.callThrough();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sign in title', () => {
    const html: HTMLElement = fixture.debugElement.nativeElement;

    expect(html.querySelector('h1').textContent).toContain('Inicia sesión');
  });

  it('should have sign in component on template', () => {
    expect(fixture.debugElement.nativeElement.querySelector('pascal-auth-sign-in-form')).toBeTruthy();
  });

  it('should dispatch login action on onSubmit method', () => {
    component.login(credentials);

    expect(authFacade.loginWithCredentials).toHaveBeenCalledWith(credentials);
  });
});
