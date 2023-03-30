import { emptyPagination, LoadStatus } from '@kirby/shared';
import { createEmployee } from '@kirby/employees/testing';

import { employeesActions as actions } from './employees.actions';
import { EmployeesState, initialState, employeesReducer } from './employees.reducer';

describe('Employees Reducer', () => {
  const getEmployeesId = (it) => it['id'];

  beforeEach(() => {});

  describe('valid Employees actions ', () => {
    it('should return set the list of known Employees', () => {
      const employees = [createEmployee('PRODUCT-AAA'), createEmployee('PRODUCT-zzz')];
      const action = actions.searchOk({
        ...emptyPagination(),
        data: employees,
      });
      const result: EmployeesState = employeesReducer(initialState, action);
      const selId: string = getEmployeesId(result.paginatedList.data[1]);

      expect(result.paginatingStatus).toBe(LoadStatus.Completed);
      expect(result.paginatedList.data.length).toBe(2);
      expect(selId).toBe('PRODUCT-zzz');
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;
      const result = employeesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
