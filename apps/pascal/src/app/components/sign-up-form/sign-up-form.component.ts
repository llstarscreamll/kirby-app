import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { ApiError, sameAs } from '@kirby/shared';
import { flatApiErrors } from '@kirby/shared';

@Component({
  selector: 'pascal-auth-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent implements OnInit {
  @Input()
  public status: string;

  @Input()
  public errors: ApiError;

  @Output()
  public submitted = new EventEmitter();

  public form: FormGroup;

  public constructor(private fb: FormBuilder) {}

  public ngOnInit() {
    this.form = this.fb.group({
      first_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      last_name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      phone_prefix: ['57', [Validators.required]],
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(150),
        ],
      ],
      password_confirmation: ['', [Validators.required, sameAs('password')]],
    });
  }

  public submitForm() {
    this.submitted.emit({
      ...this.form.value,
      phone_number: `+${this.form.value.phone_prefix}${this.form.value.phone_number}`,
    });
  }

  public get disableButton(): boolean {
    return this.form.invalid || this.status === 'signingIn';
  }
}
