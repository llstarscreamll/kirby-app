import { get, toArray, isObject } from "lodash";
import { ApiError } from "../interfaces/api-error";
import { Pagination } from '../interfaces/pagination';

/**
 * Maps API errors (mainly validation errors) to flat string array.
 */
export function flatApiErrors(apiErrors: ApiError): string[] {
  const errors = [].concat(...toArray(get(apiErrors, 'error.errors')));

  return errors.map(error => isObject(error) ? error.detail : error);
}

/**
 * Create empty pagination object.
 */
export function emptyPagination(): Pagination<any> {
  return { data: [], meta: {} };
}