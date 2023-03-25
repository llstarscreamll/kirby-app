import { EmployeeInterface } from '@kirby/employees/util';
import { employeesActions as actions } from './employees.actions';
import { Pagination, emptyPagination, LoadStatus, ApiError } from '@kirby/shared';

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeesState {
  paginatedList: Pagination<EmployeeInterface>;
  paginatingStatus: LoadStatus | null;
  selected: EmployeeInterface | null;
  selectingStatus: LoadStatus;
  creatingStatus: LoadStatus;
  updatingStatus: LoadStatus;
  roles: { id: number; display_name: string }[];
  error: ApiError | null;
}

export interface EmployeesPartialState {
  readonly [EMPLOYEES_FEATURE_KEY]: EmployeesState;
}

export const initialState: EmployeesState = {
  paginatedList: emptyPagination(),
  paginatingStatus: null,
  selected: null,
  selectingStatus: null,
  updatingStatus: null,
  creatingStatus: null,
  roles: [],
  error: null,
};

export function employeesReducer(state: EmployeesState = initialState, action): EmployeesState {
  switch (action.type) {
    case actions.search.type: {
      state = {
        ...state,
        paginatingStatus: LoadStatus.Loading,
      };
      break;
    }

    case actions.searchOk.type: {
      state = {
        ...state,
        paginatedList: action.payload,
        paginatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case actions.searchError.type: {
      state = {
        ...state,
        paginatingStatus: LoadStatus.Error,
      };
      break;
    }

    case actions.get.type: {
      state = { ...state, selectingStatus: LoadStatus.Loading };
      break;
    }

    case actions.getOk.type: {
      state = {
        ...state,
        selected: action.payload,
        selectingStatus: LoadStatus.Completed,
      };
      break;
    }

    case actions.create.type: {
      state = {
        ...state,
        creatingStatus: LoadStatus.Loading,
      };
      break;
    }

    case actions.createOk.type: {
      state = {
        ...state,
        creatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case actions.createError.type: {
      state = {
        ...state,
        creatingStatus: LoadStatus.Error,
        error: action.payload,
      };
      break;
    }

    case actions.getError.type: {
      state = {
        ...state,
        error: action.payload,
        selectingStatus: LoadStatus.Error,
      };
      break;
    }

    case actions.update.type: {
      state = { ...state, updatingStatus: LoadStatus.Loading };
      break;
    }

    case actions.updateOk.type: {
      state = {
        ...state,
        selected: action.payload,
        updatingStatus: LoadStatus.Completed,
      };
      break;
    }

    case actions.updateError.type: {
      state = {
        ...state,
        error: action.payload,
        updatingStatus: LoadStatus.Error,
      };
      break;
    }

    case actions.searchRolesOk.type: {
      state = {
        ...state,
        roles: action.payload.data,
      };
      break;
    }

    case actions.searchRolesError.type: {
      state = {
        ...state,
        error: action.payload,
      };
      break;
    }
  }
  return state;
}
