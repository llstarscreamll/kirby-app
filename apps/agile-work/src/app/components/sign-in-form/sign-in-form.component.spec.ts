import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFormComponent } from './sign-in-form.component';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;
  let html: HTMLDocument;
  let submitBtn: HTMLButtonElement;
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  const credentials = {
    email: 'tony@stark.com',
    password: 'tony.123',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [SignInFormComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;

    html = fixture.nativeElement;
    submitBtn = html.querySelector('form button[type=submit]');
    emailInput = html.querySelector('form input[type=email]');
    passwordInput = html.querySelector('form input[type=password]');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have email, password and submit btn', () => {
    expect(emailInput).toBeTruthy('email field present');
    expect(passwordInput).toBeTruthy('password field present');
    expect(submitBtn).toBeTruthy('submit btn present');
  });

  it('should have invalid form on initial state', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should have submit btn disabled on initial state', () => {
    expect(component.status).toBeFalsy();
    expect(submitBtn.disabled).toBe(true, 'submit btn disabled on initial state');
  });

  it('should have submit btn disabled if form status equals to sending', () => {
    component.status = 'loggingIn';
    component.form.patchValue(credentials);

    fixture.detectChanges();

    expect(submitBtn.disabled).toBe(true);
  });

  it('should have submit btn enabled if form is valid', () => {
    component.form.patchValue(credentials);

    fixture.detectChanges();

    expect(component.form.valid).toBe(true);
    expect(submitBtn.disabled).toBe(false, 'submit btn enabled if form is valid');
  });

  it('should emit event when form is submitted', () => {
    spyOn(component.submitted, 'emit').and.callThrough();

    component.form.patchValue(credentials);
    fixture.detectChanges();

    submitBtn.click();
    fixture.detectChanges();

    expect(component.submitted.emit).toHaveBeenCalledWith(credentials);
  });

  it('should display errors if any', () => {
    component.errors = {
      message: 'Auth error',
      errors: { email: ['email is invalid'] }
    };

    fixture.detectChanges();

    const template: HTMLDocument = fixture.nativeElement;
    const errorMessage = template.querySelector('.errors .error-message');
    const errorsList = template.querySelector('.errors .errors-list');

    expect(errorMessage).toBeTruthy('error message displayed');
    expect(errorsList).toBeTruthy('errors list displayed');

    expect(errorMessage.textContent).toContain('Auth error');
    expect(errorsList.textContent).toContain('email is invalid');
  });
});
