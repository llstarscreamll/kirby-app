import { get, toArray } from "lodash";
import { ApiError } from "../interfaces/api-error";
import { Pagination } from '../interfaces/pagination';

/**
 * Maps API errors (mainly validation errors) to flat string array.
 */
export function flatApiErrors(apiErrors: ApiError): string[] {
  return [].concat(...toArray(get(apiErrors, 'error.errors')));
}

/**
 * Create empty pagination object.
 */
export function emptyPagination(): Pagination<any> {
  return { data: [], meta: {} };
}