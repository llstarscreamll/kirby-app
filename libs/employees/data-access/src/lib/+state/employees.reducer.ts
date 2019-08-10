import { EmployeesAction, EmployeesActionTypes } from './employees.actions';
import { ApiError, Pagination, LoadStatuses, emptyPagination } from '@llstarscreamll/shared';
import { EmployeeInterface } from '@llstarscreamll/employees/util';

export const EMPLOYEES_FEATURE_KEY = 'employees';

/* tslint:disable:no-empty-interface */
export interface Entity { id: string }

export interface EmployeesState {
  paginatedList: Pagination<EmployeeInterface>;
  selected?: Entity;
  loaded: boolean;
  error?: any;
}

export interface EmployeesPartialState {
  readonly [EMPLOYEES_FEATURE_KEY]: EmployeesState;
}

export const initialState: EmployeesState = {
  paginatedList: emptyPagination(),
  loaded: false
};

export function employeesReducer(state: EmployeesState = initialState, action: EmployeesAction): EmployeesState {
  switch (action.type) {
    case EmployeesActionTypes.SearchEmployeesOk: {
      state = { ...state, paginatedList: action.payload, loaded: true };
      break;
    }
  }
  return state;
}
