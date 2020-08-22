import { FormControl, FormGroup } from '@angular/forms';

import { isObject, sameAs } from '.';

describe('custom validators', () => {
  describe('isObject', () => {
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
      expect(isObject(string)).toMatchObject({
        isObject: 'value is not object',
      });
    });
  });

  describe('sameAs', () => {
    it('should return null when said fields are equal', () => {
      const formGroup = new FormGroup({
        password: new FormControl('123'),
        password_confirmation: new FormControl('123'),
      });

      expect(
        sameAs('password')(formGroup.get('password_confirmation'))
      ).toBeNull();
    });

    it('should return object with error when said fields are NOT equal', () => {
      const formGroup = new FormGroup({
        password: new FormControl('123'),
        password_confirmation: new FormControl('456'),
      });

      expect(
        sameAs('password')(formGroup.get('password_confirmation'))
      ).toMatchObject({ sameAs: 'those fields are not equal' });
    });

    it('should return object with error when comparison field does not exists', () => {
      const formGroup = new FormGroup({
        password_confirmation: new FormControl('456'),
      });

      expect(
        sameAs('password')(formGroup.get('password_confirmation'))
      ).toMatchObject({ sameAs: 'form control password does not exist' });
    });

    it('should return object with error when field does not have a parent form', () => {
      expect(sameAs('password')(new FormControl('456'))).toMatchObject({
        sameAs: 'control does not has parent form group',
      });
    });
  });
});
