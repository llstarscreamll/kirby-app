import { get, toArray, isObject, isEmpty } from 'lodash';
import { ApiError } from '../interfaces/api-error';
import { Pagination } from '../interfaces/pagination';

/**
 * Maps API errors (mainly validation errors) to flat string array.
 */
export function flatApiErrors(apiErrors: ApiError): string[] {
  const errors = [].concat(...toArray(get(apiErrors, 'error.errors')));

  return errors.map(error => error?.detail ?? error);
}

/**
 * Create empty pagination object.
 */
export function emptyPagination(): Pagination<any> {
  return {
    data: [],
    links: { first: null, last: null, prev: null, next: null },
    meta: {
      current_page: null,
      from: null,
      path: null,
      per_page: null,
      to: null
    }
  };
}

export function oneLevelFlattenObject(query) {
  let mappedQuery = {};

  const mapObj = (prefix, obj, acc) => {
    Object.keys(obj).forEach(
      k =>
        (acc = isObject(obj[k])
          ? mapObj(`${prefix}[${k}]`, obj[k], acc)
          : obj[k] !== '' && obj[k] !== undefined && obj[k] !== null
          ? {
              ...acc,
              [`${prefix}[${k}]`]: obj[k]
            }
          : acc)
    );

    return acc;
  };

  Object.keys(query).forEach(key => {
    const value = query[key];

    if (isObject(value)) {
      mappedQuery = { ...mappedQuery, ...mapObj(key, value, mappedQuery) };

      return;
    }

    if (value !== '' && value !== undefined && value !== null) {
      mappedQuery = { ...mappedQuery, [key]: value };
    }
  });

  return mappedQuery;
}
