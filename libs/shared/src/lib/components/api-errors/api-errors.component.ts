import { get } from 'lodash';
import { Component, OnInit, Input } from '@angular/core';

import { ApiError } from '../../interfaces/api-error';
import { flatApiErrors } from '../../utils/common-functions';

@Component({
  selector: 'kirby-api-errors',
  templateUrl: './api-errors.component.html',
  styleUrls: ['./api-errors.component.scss']
})
export class ApiErrorsComponent implements OnInit {

  @Input()
  public apiError: ApiError;

  public constructor() { }

  public ngOnInit() { }

  public get topLevelErrorText(): string {
    return get(this.apiError, 'message', 'Unknown Error');
  }

  public get specificErrorText(): string {
    return get(this.apiError, 'error.message');
  }

  public get errorHeader(): string {
    return this.specificErrorText || this.topLevelErrorText;
  }

  public get errors(): string[] {
    return flatApiErrors(this.apiError);
  }

}
