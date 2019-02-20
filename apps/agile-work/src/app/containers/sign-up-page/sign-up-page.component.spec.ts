import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFacade } from '@agile-work/auth-state';
import { SignUpPageComponent } from './sign-up-page.component';
import { TESTING_PROVIDERS, TESTING_IMPORTS } from '../../utils/testing';
import { NewAccount } from 'libs/auth-state/src/lib/interfaces/new-account';

describe('SignUpPageComponent', () => {
  let component: SignUpPageComponent;
  let fixture: ComponentFixture<SignUpPageComponent>;
  let authFacade: AuthFacade;
  const newAccount: NewAccount = { name: 'Tony Stark', email: 'tony@stark.com', password: 'tony.123', password_confirmation: 'tony.123' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ...TESTING_IMPORTS,
      ],
      declarations: [SignUpPageComponent],
      providers: [...TESTING_PROVIDERS],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    authFacade = TestBed.get(AuthFacade);

    spyOn(authFacade, 'signUp').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have sign up title', () => {
    const html: HTMLElement = fixture.debugElement.nativeElement;

    expect(html.querySelector('h1').textContent).toContain('Crea una cuenta');
  });

  it('should have sign-up-component on template', () => {
    expect(fixture.debugElement.nativeElement.querySelector('auth-sign-up-form')).toBeTruthy();
  });

  it('should dispatch sign up action on signUp method', () => {
    component.signUp(newAccount);

    expect(authFacade.signUp).toHaveBeenCalledWith(newAccount);
  });
});
