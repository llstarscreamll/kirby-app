import { FormControl } from '@angular/forms';

import { isObject } from '.';

describe('custom validators', () => {
  it('should return null when form field value is an object', () => {
    const control = new FormControl({ id: 1, name: 'John' });
    expect(isObject(control)).toBeNull();
  });

  it('should return null when value is an empty string or null', () => {
    const emptyString = new FormControl('');
    expect(isObject(emptyString)).toBeNull();

    const nullValue = new FormControl(null);
    expect(isObject(nullValue)).toBeNull();
  });

  it('should return object when form field value is NOT an object', () => {
    const string = new FormControl('john');
    expect(isObject(string)).toMatchObject({isObject: 'value is not object'});
  });
});
