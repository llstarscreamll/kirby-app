import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EMPLOYEES_FEATURE_KEY, EmployeesState } from './employees.reducer';

const getEmployeesState = createFeatureSelector<EmployeesState>(
  EMPLOYEES_FEATURE_KEY
);
const getPaginated = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.paginatedList
);
const getPaginatingStatus = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.paginatingStatus
);
const getSelectedEmployee = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.selected
);
const getSelectingStatus = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.selectingStatus
);
const getUpdatingStatus = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.updatingStatus
);
const getError = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.error
);

export const employeesQuery = {
  getPaginated,
  getError,
  getSelectedEmployee,
  getPaginatingStatus,
  getSelectingStatus,
  getUpdatingStatus
};
