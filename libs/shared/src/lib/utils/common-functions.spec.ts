import { flatApiErrors, oneLevelFlattenObject } from './common-functions';

describe('flatApiErrors', () => {
  it('should return array of errors if error.errors key exists', () => {
    const result = flatApiErrors({
      message: 'Invalid data!!',
      ok: false,
      error: {
        message: 'The give data is invalid',
        errors: {
          email: ['Email does not exists.', 'Email has no valid format.'],
          password: ['Password too short.']
        }
      }
    });

    expect(result).toEqual([
      'Email does not exists.',
      'Email has no valid format.',
      'Password too short.'
    ]);
  });

  it("should return empty array if error.errors key doesn't exists", () => {
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

describe('mapObjectToUrlQuery', () => {
  it('should map simple object', () => {
    const query = { search: 'foo', num: 1, bool: false };
    const result = oneLevelFlattenObject(query);

    expect(result).toEqual({ search: 'foo', num: 1, bool: false });
  });

  it('should map one level nested object', () => {
    const query = { employee: { id: 'A1', name: 'John' } };
    const result = oneLevelFlattenObject(query);

    expect(result).toEqual({
      'employee[id]': 'A1',
      'employee[name]': 'John'
    });
  });

  it('should map two level nested object', () => {
    const query = {
      post: { title: 'foo', body: 'bar', author: { id: 'A1', name: 'John' } }
    };
    const result = oneLevelFlattenObject(query);

    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar',
      'post[author][id]': 'A1',
      'post[author][name]': 'John'
    });
  });

  it('should map object with array of strings value', () => {
    const query = {
      post: { title: 'foo', body: 'bar', comments: ['one', 'two', 'three'] } // array of strings
    };
    const result = oneLevelFlattenObject(query);

    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar',
      'post[comments][0]': 'one',
      'post[comments][1]': 'two',
      'post[comments][2]': 'three'
    });
  });

  it('should map object with array of objects value', () => {
    const query = {
      post: {
        title: 'foo',
        body: 'bar',
        comments: [
          // array of objects
          { id: 1, body: 'one' },
          { id: 2, body: 'two' }
        ]
      }
    };
    const result = oneLevelFlattenObject(query);

    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar',
      'post[comments][0][id]': 1,
      'post[comments][0][body]': 'one',
      'post[comments][1][id]': 2,
      'post[comments][1][body]': 'two'
    });
  });

  it('should map object with nested array of string value', () => {
    const query = {
      post: {
        title: 'foo',
        body: 'bar',
        comments: [
          // array of objects
          { id: 1, body: 'one', likes: ['john', 'jane'] },
          { id: 2, body: 'two', likes: ['louis'] }
        ]
      }
    };
    const result = oneLevelFlattenObject(query);

    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar',
      'post[comments][0][id]': 1,
      'post[comments][0][body]': 'one',
      'post[comments][0][likes][0]': 'john',
      'post[comments][0][likes][1]': 'jane',
      'post[comments][1][id]': 2,
      'post[comments][1][body]': 'two',
      'post[comments][1][likes][0]': 'louis'
    });
  });

  it('should not return values when array is empty', () => {
    const query = {
      post: {
        title: 'foo',
        body: 'bar',
        comments: [] // empty array
      }
    };
    const result = oneLevelFlattenObject(query);

    // comments key is missing because of empty array
    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar'
    });
  });

  it('should not return values when object key is empty', () => {
    const query = {
      post: {
        title: null,
        body: 'bar',
      }
    };
    const result = oneLevelFlattenObject(query);    

    // comments key is missing because of empty array
    expect(result).toEqual({
      'post[body]': 'bar'
    });
  });
});
