import { EmployeeInterface } from '@kirby/employees/util';
import { EmployeesAction, EmployeesActionTypes } from './employees.actions';
import {
  Pagination,
  emptyPagination,
  LoadStatus,
  ApiError,
} from '@kirby/shared';

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeesState {
  paginatedList: Pagination<EmployeeInterface>;
  paginatingStatus: LoadStatus;
  selected?: EmployeeInterface;
  selectingStatus: LoadStatus;
  creatingStatus: LoadStatus;
  updatingStatus: LoadStatus;
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
        paginatingStatus: LoadStatus.Loading,
      };
      break;
    }

    case EmployeesActionTypes.SearchEmployeesOk: {
      state = {
        ...state,
        paginatedList: action.payload,
        paginatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case EmployeesActionTypes.SearchEmployeesError: {
      state = {
        ...state,
        paginatingStatus: LoadStatus.Error,
      };
      break;
    }

    case EmployeesActionTypes.GetEmployee: {
      state = { ...state, selectingStatus: LoadStatus.Loading };
      break;
    }

    case EmployeesActionTypes.GetEmployeeOk: {
      state = {
        ...state,
        selected: action.payload,
        selectingStatus: LoadStatus.Completed,
      };
      break;
    }

    case EmployeesActionTypes.CreateEmployee: {
      state = {
        ...state,
        creatingStatus: LoadStatus.Loading,
      };
      break;
    }

    case EmployeesActionTypes.CreateEmployeeOk: {
      state = {
        ...state,
        creatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case EmployeesActionTypes.CreateEmployeeError: {
      state = {
        ...state,
        creatingStatus: LoadStatus.Error,
        error: action.payload,
      };
      break;
    }

    case EmployeesActionTypes.GetEmployeeError: {
      state = {
        ...state,
        error: action.payload,
        selectingStatus: LoadStatus.Error,
      };
      break;
    }

    case EmployeesActionTypes.UpdateEmployee: {
      state = { ...state, updatingStatus: LoadStatus.Loading };
      break;
    }

    case EmployeesActionTypes.UpdateEmployeeOk: {
      state = {
        ...state,
        selected: action.payload,
        updatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case EmployeesActionTypes.UpdateEmployeeError: {
      state = {
        ...state,
        error: action.payload,
        updatingStatus: LoadStatus.Error,
      };
      break;
    }
  }
  return state;
}
