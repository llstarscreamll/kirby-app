import {
  get,
  toArray,
  isObject,
  isArray,
  pick,
  indexOf,
  omit,
} from 'lodash-es';
import { ApiError } from '../interfaces/api-error';
import { Pagination } from '../interfaces/pagination';

/**
 * Maps API errors (mainly validation errors) to flat string array.
 */
export function flatApiErrors(apiErrors: ApiError | null): string[] {
  const errors: any[] = [].concat(...toArray(get(apiErrors, 'error.errors')));

  return errors.map((error) => error?.detail ?? error);
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
      to: 0,
    },
  };
}

/**
 * Flatten a nested object to a on level one:
 * ```json
 * {
 *    user: {
 *      id: 1,
 *      name: 'John',
 *      address: {'id': 'A1', name: 'home', revoked: true},
 *      nickname: '',
 *      roles: ['admin', 'guest', 'root']
 *    }
 * }
 * ```
 *
 * the result is:
 * ```json
 * {
 *    'user[id]': 1,
 *    'user[name]': 'John',
 *    'address[id]': 'A1',
 *    'address[name]': 'home',
 *    'address[revoked]': true,
 *    'roles[0]': 'admin',
 *    'roles[1]': 'guest',
 *    'roles[2]': 'root',
 * }
 * ```
 * Notice that nickname is no present on result because is an empty string.
 * See tests for more examples.
 */
export function flatToOneLevelObject(obj: any) {
  let mappedQuery = {};

  const mapObj = (prefix: string, obj: any, acc: any) => {
    Object.keys(obj).forEach(
      (k) =>
        (acc = isObject(obj[k])
          ? mapObj(`${prefix}[${k}]`, obj[k], acc)
          : obj[k] !== '' && obj[k] !== undefined && obj[k] !== null
          ? {
              ...acc,
              [`${prefix}[${k}]`]: obj[k],
            }
          : acc)
    );

    return acc;
  };

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

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

export function deserializeJsonApi(jsonApiResponse: any): any {
  const data = jsonApiResponse.data;
  const included = get(jsonApiResponse, 'included', []);
  let deserializedData = data;
  

  if (isArray(data)) {
    deserializedData = data.map((resource) =>
      deserializeJsonApiResource(resource, included)
    );
  }

  if (isObject(data) && data instanceof Array === false) {
    deserializedData = deserializeJsonApiResource(data, included);
  }

  return { ...jsonApiResponse, data: deserializedData };
}

function deserializeJsonApiResource(resource: any, includes = []): any {
  let relationShips = {};

  if (resource.relationships) {
    relationShips = mapRelationShips(resource, includes);
  }
  

  return {
    ...pick(resource, ['id']),
    ...get(resource, 'attributes'),
    ...relationShips,
  };
}

function mapRelationShips(resource: any, includes = []) {
  const resourceRelations = get(resource, 'relationships', {});

  const mappedRelations = Object.keys(resourceRelations).reduce((acc: any, item: any) => {
    acc[item] = mapRel(resourceRelations[item]['data'], includes);

    return acc;
  }, {});

  return mappedRelations;
}

function mapRel(relation: any, includes: any[]) {
  let mappedRelation = relation;

  if (isArray(relation)) {
    return relation
      .map(
        (item) =>
          includes.find(
            (include) => include.type === item.type && include.id === item.id
          ) || item
      )
      .map((item) => deserializeJsonApiResource(item));
  }

  if (isObject(relation) && relation instanceof Array === false) {
    mappedRelation = deserializeJsonApiResource(relation);
  }

  return mappedRelation;
}
