import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { ApiError } from '@agile-work/shared';
import { flatApiErrors } from '@agile-work/shared';

@Component({
  selector: 'auth-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent implements OnInit {

  @Input()
  public status: string;

  @Input()
  public errors: ApiError;

  @Output()
  public submitted = new EventEmitter();

  public form: FormGroup;

  public constructor(private fb: FormBuilder) { }

  public ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public submitForm() {
    this.submitted.emit(this.form.value);
  }

  public get errorsCollection(): string[] {
    return flatApiErrors(this.errors);
  }
}
