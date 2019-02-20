import { flatApiErrors } from "./common-functions";

describe('flatApiErrors', () => {
  it('should return array of errors if error.errors key exists', () => {
    const result = flatApiErrors({
      message: 'Invalid data!!',
      ok: false,
      error: {
        message: 'The give data is invalid',
        errors: {
          email: [
            'Email does not exists.',
            'Email has no valid format.',
          ],
          password: ['Password too short.']
        },
      }
    });

    expect(result).toEqual([
      'Email does not exists.',
      'Email has no valid format.',
      'Password too short.'
    ]);
  });

  it('should return empty array if error.errors key doesn\'t exists', () => {
    const result = flatApiErrors({
      message: 'Invalid data!!',
      ok: false,
      error: {
        message: 'The give data is invalid',
        error: 'invalida credentials'
      }
    });

    expect(result).toEqual([]);
  });
});
