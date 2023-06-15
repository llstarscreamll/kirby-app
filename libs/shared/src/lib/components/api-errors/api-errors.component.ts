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

  get errorHeader(): string {
    return this.specificErrorText || this.topLevelErrorText;
  }

  get specificErrorText(): string {
    return get(this.apiError, 'error.message');
  }

  get topLevelErrorText(): string {
    return getMessage(get(this.apiError, 'message', 'Error desconocido'));
  }

  get errors(): string[] {
    return flatApiErrors(this.apiError);
  }
}

function getMessage(error: string): string {
  const errorsMap = {
    unauthorized: 'Credenciales incorrectas',
    '403 forbidden': 'No tienes permisos para realizar esta acción',
    '404 not found': 'Recurso no encontrado',
    '422 unprocessable content': 'Datos incorrectos',
  };

  const errorKey = Object.keys(errorsMap).filter((pattern) => error.match(new RegExp(pattern, 'i')))[0];

  return errorsMap[errorKey] || error;
}
