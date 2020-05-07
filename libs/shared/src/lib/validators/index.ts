import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isObject as IsObject, isEmpty } from 'lodash';

export function isObject(control: AbstractControl): ValidationErrors | null {
  if (isEmpty(control.value) || IsObject(control.value)) {
    return null;
  }

  return { isObject: 'value is not object' };
}
