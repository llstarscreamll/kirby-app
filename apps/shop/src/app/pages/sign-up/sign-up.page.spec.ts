import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpPage } from './sign-up.page';
import { AuthFacade } from '@kirby/authentication-data-access';

describe('SignUpPage', () => {
  let component: SignUpPage;
  let authFacade: AuthFacade;
  let template: HTMLDivElement;
  let fixture: ComponentFixture<SignUpPage>;
  const defaults = {
    first_name: 'John',
    last_name: 'Doe',
    phone_prefix: '+57',
    phone_number: '3111234567',
    email: 'john@doe.com',
    password: 'Secret.12345678',
    password_confirmation: 'Secret.12345678',
    agreement: true,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [SignUpPage],
      providers: [{ provide: AuthFacade, useValue: { signUp: () => true } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpPage);
    authFacade = TestBed.inject(AuthFacade);
    component = fixture.componentInstance;
    template = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain elements', () => {
    expect(template.querySelector('form')).toBeTruthy();
    expect(
      template.querySelector('[formControlName="first_name"]')
    ).toBeTruthy();
    expect(
      template.querySelector('[formControlName="last_name"]')
    ).toBeTruthy();
    expect(
      template.querySelector('[formControlName="phone_number"]')
    ).toBeTruthy();
    expect(template.querySelector('[formControlName="email"]')).toBeTruthy();
    expect(template.querySelector('[formControlName="password"]')).toBeTruthy();
    expect(
      template.querySelector('[formControlName="password_confirmation"]')
    ).toBeTruthy();
    expect(
      template.querySelector('[formControlName="agreement"]')
    ).toBeTruthy();
    expect(template.querySelector('[routerLink="/legal"]')).toBeTruthy();
    expect(template.querySelector('button[type="submit"]')).toBeTruthy();
    expect(template.querySelector('[routerLink="/sign-in"]')).toBeTruthy();
  });

  it('should have invalid form by default', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should have submit button disabled when form is not valid', () => {
    expect(component.form.valid).toBe(false);
    expect(
      template.querySelector('form button[type=submit]:disabled')
    ).toBeTruthy();
  });

  it('should have enabled submit button when form is valid', () => {
    component.form.patchValue(defaults);
    fixture.detectChanges();

    expect(
      template.querySelector('form button[type=submit]:disabled')
    ).toBeFalsy();
  });

  it('should validate phone_number field has 10 digits', () => {
    component.form.patchValue({ ...defaults, phone_number: '311' });
    expect(component.form.valid).toBe(false);

    component.form.patchValue({ ...defaults, phone_number: 3119876543 }); // number, not string
    expect(component.form.valid).toBe(true);

    component.form.patchValue({ ...defaults, phone_number: '3119876543' }); // string, not number
    expect(component.form.valid).toBe(true);
  });

  it('should validate password field has at least 8 characters', () => {
    component.form.patchValue({
      ...defaults,
      password: '311',
      password_confirmation: '311',
    });
    expect(component.form.valid).toBe(false);

    component.form.patchValue({
      ...defaults,
      password: '12345678',
      password_confirmation: '12345678',
    });
    expect(component.form.valid).toBe(true);
  });

  it('should validate first_name field has at least 3 characters', () => {
    component.form.patchValue({ ...defaults, first_name: 'J' });
    expect(component.form.valid).toBe(false);

    component.form.patchValue({ ...defaults, first_name: 'Ana' });
    expect(component.form.valid).toBe(true);
  });

  it('should validate last_name field has at least 3 characters', () => {
    component.form.patchValue({ ...defaults, last_name: 'J' });
    expect(component.form.valid).toBe(false);

    component.form.patchValue({ ...defaults, last_name: 'Ana' });
    expect(component.form.valid).toBe(true);
  });

  it('should call AuthFacade.signUp(...) on form submit', () => {
    spyOn(authFacade, 'signUp');
    component.form.patchValue(defaults);

    fixture.detectChanges();

    const submitBtn: any = template.querySelector('form button[type=submit]');
    submitBtn.click();

    expect(authFacade.signUp).toHaveBeenCalledWith(defaults);
  });
});
