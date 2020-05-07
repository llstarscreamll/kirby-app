import { FormControl } from '@angular/forms';
import { isObject } from '.';

describe('custom validators', () => {
  it('should return null when form field value is an object', () => {
    const control = new FormControl({ id: 1, name: 'John' });
    expect(isObject(control)).toBeNull;
  });
});
