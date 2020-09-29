import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInPage } from './sign-in.page';
import { AuthFacade } from '@kirby/authentication-data-access';

describe('SignInPage', () => {
  let component: SignInPage;
  let authFacade: AuthFacade;
  let template: HTMLDivElement;
  let fixture: ComponentFixture<SignInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignInPage],
      providers: [
        { provide: AuthFacade, useValue: { loginWithCredentials: () => true } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPage);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    authFacade = TestBed.inject(AuthFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    expect(template.querySelector('h1')).toBeTruthy();
    expect(template.querySelector('form [formControlName=email]')).toBeTruthy();
    expect(
      template.querySelector('form [formControlName=password]')
    ).toBeTruthy();
    expect(template.querySelector('form button[type=submit]')).toBeTruthy();
    expect(template.querySelector('[routerLink="/sign-up"]')).toBeTruthy();
  });

  it('should have not valid form and for submit btn disabled by default', () => {
    expect(component.form.valid).toBe(false);
    expect(
      template.querySelector('form button[type=submit]:disabled')
    ).toBeTruthy();
  });

  it('should have submit button enabled when form is valid', () => {
    component.form.patchValue({
      email: 'john@doe.com',
      password: '1234567890',
    });

    fixture.detectChanges();

    expect(
      template.querySelector('form button[type=submit]:disabled')
    ).toBeFalsy();
  });

  it('should call AuthFacade.loginWithCredentials(...) on form submit', () => {
    component.form.patchValue({
      email: 'john@doe.com',
      password: '1234567890',
    });

    spyOn(authFacade, 'loginWithCredentials');

    fixture.detectChanges();
    const submitBtn: any = template.querySelector('form button[type=submit]');
    submitBtn.click();

    expect(authFacade.loginWithCredentials).toHaveBeenCalledWith({
      email: 'john@doe.com',
      password: '1234567890',
    });
  });
});
