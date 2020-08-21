import { get, toArray, isObject } from 'lodash-es';
import { ApiError } from '../interfaces/api-error';
import { Pagination } from '../interfaces/pagination';

/**
 * Maps API errors (mainly validation errors) to flat string array.
 */
export function flatApiErrors(apiErrors: ApiError|null): string[] {
  const errors: any[] = [].concat(...toArray(get(apiErrors, 'error.errors')));

  return errors.map(error => error?.detail ?? error);
}

/**
 * Create empty pagination object.
 */
export function emptyPagination(): Pagination<any> {
  return {
    data: [],
    links: { first: '', last: '', prev: '', next: '' },
    meta: {
      current_page: 0,
      from: 0,
      path: '',
      per_page: 0,
      to: 0
    }
  };
}

export function oneLevelFlattenObject(query: any) {
  let mappedQuery = {};

  const mapObj = (prefix: string, obj: any, acc: any) => {
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
