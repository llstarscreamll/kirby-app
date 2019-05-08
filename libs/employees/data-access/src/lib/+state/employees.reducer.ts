import { EmployeesAction, EmployeesActionTypes } from './employees.actions';

export const EMPLOYEES_FEATURE_KEY = 'employees';

/**
 * Interface for the 'Employees' data used in
 *  - EmployeesState, and
 *  - employeesReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface EmployeesState {
  list: Entity[]; // list of Employees; analogous to a sql normalized table
  selectedId?: string | number; // which Employees record has been selected
  loaded: boolean; // has the Employees list been loaded
  error?: any; // last none error (if any)
}

export interface EmployeesPartialState {
  readonly [EMPLOYEES_FEATURE_KEY]: EmployeesState;
}

export const initialState: EmployeesState = {
  list: [],
  loaded: false
};

export function employeesReducer(
  state: EmployeesState = initialState,
  action: EmployeesAction
): EmployeesState {
  switch (action.type) {
    case EmployeesActionTypes.EmployeesLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}
