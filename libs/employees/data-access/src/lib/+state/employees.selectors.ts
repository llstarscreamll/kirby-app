import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EMPLOYEES_FEATURE_KEY, EmployeesState } from './employees.reducer';

const getEmployeesState = createFeatureSelector<EmployeesState>(EMPLOYEES_FEATURE_KEY);
const selectFeature = (state: any) => state[EMPLOYEES_FEATURE_KEY];
const getPaginated = createSelector(selectFeature, (state: EmployeesState) => state.paginatedList);
const getPaginatingStatus = createSelector(selectFeature, (state: EmployeesState) => state.paginatingStatus);
const getSelectedEmployee = createSelector(selectFeature, (state: EmployeesState) => state.selected);
const getSelectingStatus = createSelector(selectFeature, (state: EmployeesState) => state.selectingStatus);
const getUpdatingStatus = createSelector(selectFeature, (state: EmployeesState) => state.updatingStatus);
const getCreatingStatus = createSelector(selectFeature, (state: EmployeesState) => state.creatingStatus);
const getError = createSelector(selectFeature, (state: EmployeesState) => state.error);
const getRoles = createSelector(selectFeature, (state: EmployeesState) => state.roles);

export const employeesQuery = {
  getPaginated,
  getError,
  getRoles,
  getSelectedEmployee,
  getPaginatingStatus,
  getSelectingStatus,
  getCreatingStatus,
  getUpdatingStatus,
};
