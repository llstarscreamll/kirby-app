import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { ApiError } from '@kirby/shared';

@Component({
  selector: 'pascal-auth-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {
  @Input()
  status: string;

  @Input()
  errors: ApiError;

  @Output()
  submitted = new EventEmitter();

  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitForm() {
    this.submitted.emit(this.form.value);
  }

  get disableButton(): boolean {
    return this.form.invalid || this.status === 'loggingIn';
  }
}
