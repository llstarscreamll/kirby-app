import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFormComponent } from './sign-in-form.component';
import { TESTING_IMPORTS, TESTING_PROVIDERS } from '../../utils/testing';

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
        ...TESTING_IMPORTS,
      ],
      declarations: [SignInFormComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [...TESTING_PROVIDERS],
    }).compileComponents();
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
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitBtn).toBeTruthy();
  });

  it('should have invalid form on initial state', () => {
    expect(component.form.valid).toBe(false);
  });

  it('should have submit btn disabled on initial state', () => {
    expect(component.status).toBeFalsy();
    expect(submitBtn.disabled).toBe(true);
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
    expect(submitBtn.disabled).toBe(false);
  });

  it('should emit event when form is submitted', () => {
    spyOn(component.submitted, 'emit').and.callThrough();

    component.form.patchValue(credentials);
    fixture.detectChanges();

    submitBtn.click();
    fixture.detectChanges();

    expect(component.submitted.emit).toHaveBeenCalledWith(credentials);
  });

  it('should use pascal-api-errors component in template', () => {
    component.errors = {
      message: 'Unprocessable entity',
      ok: false,
      error: { message: 'Wrong data!!', errors: { email: ['email is invalid'] } }
    };

    fixture.detectChanges();

    const template: HTMLDocument = fixture.nativeElement;
    const errorsComponent = template.querySelector('pascal-api-errors');

    expect(errorsComponent).toBeTruthy();
  });
});
