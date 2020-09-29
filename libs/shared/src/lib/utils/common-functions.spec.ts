import {
  flatApiErrors,
  flatToOneLevelObject,
  deserializeJsonApi,
} from './common-functions';

describe('flatApiErrors', () => {
  it('should return array of errors if error.errors key exists', () => {
    const result = flatApiErrors({
      message: 'Invalid data!!',
      ok: false,
      error: {
        message: 'The give data is invalid',
        errors: {
          email: ['Email does not exists.', 'Email has no valid format.'],
          password: ['Password too short.'],
        },
      },
    });

    expect(result).toEqual([
      'Email does not exists.',
      'Email has no valid format.',
      'Password too short.',
    ]);
  });

  it("should return empty array if error.errors key doesn't exists", () => {
    const result = flatApiErrors({
      message: 'Invalid data!!',
      ok: false,
      error: {
        message: 'The give data is invalid',
        error: 'invalida credentials',
      },
    });

    expect(result).toEqual([]);
  });
});

describe('flatToOneLevelObject', () => {
  it('should map simple object', () => {
    const query = { search: 'foo', num: 1, bool: false };
    const result = flatToOneLevelObject(query);

    expect(result).toEqual({ search: 'foo', num: 1, bool: false });
  });

  it('should map one level nested object', () => {
    const query = { employee: { id: 'A1', name: 'John' } };
    const result = flatToOneLevelObject(query);

    expect(result).toEqual({
      'employee[id]': 'A1',
      'employee[name]': 'John',
    });
  });

  it('should map two level nested object', () => {
    const query = {
      post: { title: 'foo', body: 'bar', author: { id: 'A1', name: 'John' } },
    };
    const result = flatToOneLevelObject(query);

    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar',
      'post[author][id]': 'A1',
      'post[author][name]': 'John',
    });
  });

  it('should map object with array of strings value', () => {
    const query = {
      post: { title: 'foo', body: 'bar', comments: ['one', 'two', 'three'] }, // array of strings
    };
    const result = flatToOneLevelObject(query);

    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar',
      'post[comments][0]': 'one',
      'post[comments][1]': 'two',
      'post[comments][2]': 'three',
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
          { id: 2, body: 'two' },
        ],
      },
    };
    const result = flatToOneLevelObject(query);

    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar',
      'post[comments][0][id]': 1,
      'post[comments][0][body]': 'one',
      'post[comments][1][id]': 2,
      'post[comments][1][body]': 'two',
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
          { id: 2, body: 'two', likes: ['louis'] },
        ],
      },
    };
    const result = flatToOneLevelObject(query);

    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar',
      'post[comments][0][id]': 1,
      'post[comments][0][body]': 'one',
      'post[comments][0][likes][0]': 'john',
      'post[comments][0][likes][1]': 'jane',
      'post[comments][1][id]': 2,
      'post[comments][1][body]': 'two',
      'post[comments][1][likes][0]': 'louis',
    });
  });

  it('should not return values when array is empty', () => {
    const query = {
      post: {
        title: 'foo',
        body: 'bar',
        comments: [], // empty array
      },
    };
    const result = flatToOneLevelObject(query);

    // comments key is missing because of empty array
    expect(result).toEqual({
      'post[title]': 'foo',
      'post[body]': 'bar',
    });
  });

  it('should not return values when object key is empty', () => {
    const query = {
      post: {
        title: null,
        body: 'bar',
      },
    };
    const result = flatToOneLevelObject(query);

    // comments key is missing because of empty array
    expect(result).toEqual({
      'post[body]': 'bar',
    });
  });
});

describe('deserializeJsonApi', () => {
  const jsonApiResponse = {
    data: [
      {
        type: 'Category',
        id: '1',
        attributes: {
          name: 'Computers & Tablets',
          created_at: '2020-08-29T19:59:43.000000Z',
        },
        relationships: {
          firstTenProducts: {
            data: [
              { id: 'P-1', type: 'Product' },
              { id: 'P-2', type: 'Product' },
            ],
          },
        },
      },
      {
        type: 'Category',
        id: '2',
        attributes: {
          name: 'Cellphones',
          created_at: '2020-08-29T19:59:43.000000Z',
        },
        relationships: {
          firstTenProducts: {
            data: [],
          },
        },
      },
    ],
    meta: {
      pagination: {
        total: 3,
        count: 3,
        per_page: 10,
        current_page: 1,
        total_pages: 1,
      },
    },
    links: {
      self: 'http://localhost:8000/api/v1/categories?paginate=1',
      first: 'http://localhost:8000/api/v1/categories?paginate=1',
      last: 'http://localhost:8000/api/v1/categories?paginate=1',
    },
    included: [
      {
        id: 'P-1',
        type: 'Product',
        attributes: { name: 'product 1', created_at: '2020-01-01 00:00:00' },
      },
      {
        id: 'P-2',
        type: 'Product',
        attributes: { name: 'product 2', created_at: '2020-01-01 00:00:00' },
      },
    ],
  };

  it('should parse json:api resources collection', () => {
    const result = deserializeJsonApi(jsonApiResponse);

    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('meta');
    expect(result).toHaveProperty('links');
    expect(result).toHaveProperty('included');
    expect(result.data).toHaveLength(2);

    expect(result.data[0]).toEqual({
      id: '1',
      name: 'Computers & Tablets',
      created_at: '2020-08-29T19:59:43.000000Z',
      firstTenProducts: [
        {
          id: 'P-1',
          name: 'product 1',
          created_at: '2020-01-01 00:00:00',
        },
        {
          id: 'P-2',
          name: 'product 2',
          created_at: '2020-01-01 00:00:00',
        },
      ],
    });
    expect(result.data[1]).toEqual({
      id: '2',
      name: 'Cellphones',
      created_at: '2020-08-29T19:59:43.000000Z',
      firstTenProducts: [],
    });
  });

  it('should parse json:api single resource object', () => {
    const result = deserializeJsonApi({
      ...jsonApiResponse,
      data: jsonApiResponse.data[0],
    });

    expect(result.data).toEqual({
      id: '1',
      name: 'Computers & Tablets',
      created_at: '2020-08-29T19:59:43.000000Z',
      firstTenProducts: [
        {
          id: 'P-1',
          name: 'product 1',
          created_at: '2020-01-01 00:00:00',
        },
        {
          id: 'P-2',
          name: 'product 2',
          created_at: '2020-01-01 00:00:00',
        },
      ],
    });
  });
});
