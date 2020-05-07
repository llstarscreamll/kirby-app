import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isObject as IsObject } from 'lodash';

export function isObject(control: AbstractControl): ValidationErrors | null {
    if (IsObject(control.value)) {
        return null
    }

    return {isObject: 'value is not object'};
}