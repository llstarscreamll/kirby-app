import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { sameAs } from '@kirby/shared';
import { AuthFacade } from '@kirby/authentication-data-access';

@Component({
  selector: 'shop-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  form = this.formBuilder.group({
    first_name: ['', [Validators.required, Validators.minLength(3)]],
    last_name: ['', [Validators.required, Validators.minLength(3)]],
    phone_prefix: ['+57', [Validators.required]],
    phone_number: ['', [Validators.required, Validators.minLength(10)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required, sameAs('password')]],
    agreement: [false, [Validators.requiredTrue]],
  });

  constructor(
    private authFacade: AuthFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  formSubmit() {
    this.authFacade.signUp(this.form.value);
  }
}
