import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EMPLOYEES_FEATURE_KEY, EmployeesState } from './employees.reducer';

// Lookup the 'Employees' feature state managed by NgRx
const getEmployeesState = createFeatureSelector<EmployeesState>(
  EMPLOYEES_FEATURE_KEY
);

const getLoaded = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.loaded
);
const getError = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.error
);

const getAllEmployees = createSelector(
  getEmployeesState,
  getLoaded,
  (state: EmployeesState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.selectedId
);
const getSelectedEmployees = createSelector(
  getAllEmployees,
  getSelectedId,
  (employees, id) => {
    const result = employees.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const employeesQuery = {
  getLoaded,
  getError,
  getAllEmployees,
  getSelectedEmployees
};
