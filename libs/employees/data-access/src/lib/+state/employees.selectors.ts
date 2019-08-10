import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EMPLOYEES_FEATURE_KEY, EmployeesState } from './employees.reducer';

const getEmployeesState = createFeatureSelector<EmployeesState>(EMPLOYEES_FEATURE_KEY);
const getPaginated = createSelector(getEmployeesState, (state: EmployeesState) => state.paginatedList);
const getSelectedEmployee = createSelector(getEmployeesState, (state: EmployeesState) => state.selected);
const getError = createSelector(getEmployeesState, (state: EmployeesState) => state.error);
const getLoaded = createSelector(getEmployeesState, (state: EmployeesState) => state.loaded);

export const employeesQuery = {
  getPaginated,
  getError,
  getSelectedEmployee,
  getLoaded,
};
