import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthFacade } from '@kirby/authentication-data-access';

@Component({
  selector: 'shop-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private formBuilder: FormBuilder, private authFacade: AuthFacade) {}

  ngOnInit(): void {}

  onSubmit() {
    this.authFacade.loginWithCredentials(this.form.value);
  }
}
