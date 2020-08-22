import { isObject as IsObject, isEmpty } from 'lodash-es';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function isObject(control: AbstractControl): ValidationErrors | null {
  if (isEmpty(control.value) || IsObject(control.value)) {
    return null;
  }

  return { isObject: 'value is not object' };
}

export function sameAs(fieldName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const parentForm = control.parent;

    if (!parentForm) {
      return { sameAs: `control does not has parent form group` };
    }

    const comparisonControl = parentForm.get(fieldName);

    if (!comparisonControl) {
      return { sameAs: `form control ${fieldName} does not exist` };
    }

    if (comparisonControl.value === control.value) {
      return null;
    }

    return { sameAs: 'those fields are not equal' };
  };
}
