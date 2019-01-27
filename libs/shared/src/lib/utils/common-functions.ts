import { get, toArray } from "lodash";
import { ApiError } from "../interfaces/api-error";

/**
 * Maps API errors to flat string array.
 */
export function flatApiErrors(apiErrors: ApiError): string[] {
  return [].concat(...toArray(get(apiErrors, 'errors')));
}