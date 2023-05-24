import { get } from 'lodash-es';
import { Component, OnInit, Input } from '@angular/core';

import { ApiError } from '../../interfaces/api-error';
import { flatApiErrors } from '../../utils/common-functions';

@Component({
  selector: 'kirby-api-errors',
  templateUrl: './api-errors.component.html',
  styles: [
    `
      ul {
        padding-inline-start: 20px;
      }
    `,
  ],
})
export class ApiErrorsComponent implements OnInit {
  @Input()
  apiError: ApiError | null;

  constructor() {}

  ngOnInit() {}

  get topLevelErrorText(): string {
    return get(this.apiError, 'message', 'Unknown Error');
  }

  get specificErrorText(): string {
    return get(this.apiError, 'error.message');
  }

  get errorHeader(): string {
    return this.specificErrorText || this.topLevelErrorText;
  }

  get errors(): string[] {
    return flatApiErrors(this.apiError);
  }
}
