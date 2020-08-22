import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccount } from '@kirby/authentication/utils';
import { TESTING_PROVIDERS } from '../../utils/testing';
import { SignUpFormComponent } from './sign-up-form.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;
  let html: HTMLDocument;
  let submitBtn: HTMLButtonElement;
  let firstNameInput: HTMLInputElement;
  let lastNameInput: HTMLInputElement;
  let phoneInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let passwordConfirmationInput: HTMLInputElement;
  const newAccount = {
    first_name: 'Tony',
    last_name: 'Stark',
    phone_prefix: '57',
    phone_number: '3219876543',
    email: 'tony@stark.com',
    password: 'tony.123',
    password_confirmation: 'tony.123',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      declarations: [SignUpFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [...TESTING_PROVIDERS],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;

    html = fixture.nativeElement;
    submitBtn = html.querySelector('form button[type=submit]');
    firstNameInput = html.querySelector(
      'form input[formControlName="first_name"]'
    );
    lastNameInput = html.querySelector(
      'form input[formControlName="last_name"]'
    );
    phoneInput = html.querySelector(
      'form input[formControlName="phone_number"]'
    );
    emailInput = html.querySelector('form input[formControlName="email"]');
    passwordInput = html.querySelector(
      'form input[formControlName="password"]'
    );
    passwordConfirmationInput = html.querySelector(
      'form input[formControlName="password_confirmation"]'
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have certain form elements', () => {
    expect(firstNameInput).toBeTruthy();
    expect(lastNameInput).toBeTruthy();
    expect(phoneInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(passwordConfirmationInput).toBeTruthy();
    expect(submitBtn).toBeTruthy();
  });

  it('should have invalid form on initial state', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should have submit btn disabled on initial state', () => {
    expect(component.status).toBeFalsy();
    expect(submitBtn.disabled).toBe(true);
  });

  it('should have submit btn disabled if form status equals to signingIn', () => {
    component.status = 'signingIn';
    component.form.patchValue(newAccount);

    fixture.detectChanges();

    expect(submitBtn.disabled).toBe(true);
  });

  it('should have submit btn enabled if form is valid', () => {
    component.form.patchValue(newAccount);

    fixture.detectChanges();

    expect(component.form.valid).toBe(true);
    expect(submitBtn.disabled).toBe(false);
  });

  it('should emit event when form is submitted', () => {
    spyOn(component.submitted, 'emit').and.callThrough();

    component.form.patchValue(newAccount);
    fixture.detectChanges();

    submitBtn.click();
    fixture.detectChanges();

    expect(component.submitted.emit).toHaveBeenCalledWith({
      ...newAccount,
      phone_number: `+${newAccount.phone_prefix}${newAccount.phone_number}`,
    });
  });

  it('should use kirby-api-errors component in template', () => {
    component.errors = {
      message: 'Unprocessable entity',
      ok: false,
      error: {
        message: 'Wrong data!!',
        errors: { email: ['email is invalid'] },
      },
    };

    fixture.detectChanges();

    const template: HTMLDocument = fixture.nativeElement;
    const errorsComponent = template.querySelector('kirby-api-errors');

    expect(errorsComponent).toBeTruthy();
  });
});
