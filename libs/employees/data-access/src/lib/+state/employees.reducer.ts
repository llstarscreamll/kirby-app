import { EmployeeInterface } from '@kirby/employees/util';
import { EmployeesAction, EmployeesActionTypes } from './employees.actions';
import {
  Pagination,
  emptyPagination,
  LoadStatuses,
  ApiError,
} from '@kirby/shared';

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeesState {
  paginatedList: Pagination<EmployeeInterface>;
  paginatingStatus: LoadStatuses;
  selected?: EmployeeInterface;
  selectingStatus: LoadStatuses;
  creatingStatus: LoadStatuses;
  updatingStatus: LoadStatuses;
  error?: ApiError;
}

export interface EmployeesPartialState {
  readonly [EMPLOYEES_FEATURE_KEY]: EmployeesState;
}

export const initialState: EmployeesState = {
  paginatedList: emptyPagination(),
  paginatingStatus: null,
  selectingStatus: null,
  updatingStatus: null,
  creatingStatus: null,
};

export function employeesReducer(
  state: EmployeesState = initialState,
  action: EmployeesAction
): EmployeesState {
  switch (action.type) {
    case EmployeesActionTypes.SearchEmployees: {
      state = {
        ...state,
        paginatingStatus: LoadStatuses.Loading,
      };
      break;
    }

    case EmployeesActionTypes.SearchEmployeesOk: {
      state = {
        ...state,
        paginatedList: action.payload,
        paginatingStatus: LoadStatuses.Completed,
      };
      break;
    }

    case EmployeesActionTypes.SearchEmployeesError: {
      state = {
        ...state,
        paginatingStatus: LoadStatuses.Error,
      };
      break;
    }

    case EmployeesActionTypes.GetEmployee: {
      state = { ...state, selectingStatus: LoadStatuses.Loading };
      break;
    }

    case EmployeesActionTypes.GetEmployeeOk: {
      state = {
        ...state,
        selected: action.payload,
        selectingStatus: LoadStatuses.Completed,
      };
      break;
    }

    case EmployeesActionTypes.CreateEmployee: {
      state = {
        ...state,
        creatingStatus: LoadStatuses.Loading,
      };
      break;
    }

    case EmployeesActionTypes.CreateEmployeeOk: {
      state = {
        ...state,
        creatingStatus: LoadStatuses.Completed,
      };
      break;
    }

    case EmployeesActionTypes.CreateEmployeeError: {
      state = {
        ...state,
        creatingStatus: LoadStatuses.Error,
        error: action.payload,
      };
      break;
    }

    case EmployeesActionTypes.GetEmployeeError: {
      state = {
        ...state,
        error: action.payload,
        selectingStatus: LoadStatuses.Error,
      };
      break;
    }

    case EmployeesActionTypes.UpdateEmployee: {
      state = { ...state, updatingStatus: LoadStatuses.Loading };
      break;
    }

    case EmployeesActionTypes.UpdateEmployeeOk: {
      state = {
        ...state,
        selected: action.payload,
        updatingStatus: LoadStatuses.Completed,
      };
      break;
    }

    case EmployeesActionTypes.UpdateEmployeeError: {
      state = {
        ...state,
        error: action.payload,
        updatingStatus: LoadStatuses.Error,
      };
      break;
    }
  }
  return state;
}
