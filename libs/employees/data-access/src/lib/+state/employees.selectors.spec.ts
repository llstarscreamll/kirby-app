import {
  Entity,
  EmployeesState,
  EMPLOYEES_FEATURE_KEY,
  EmployeesPartialState
} from './employees.reducer';
import { employeesQuery } from './employees.selectors';
import { createEmployee } from '@kirby/employees/util';

describe('Employees Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEmployeesId = it => it['id'];
  const employee = createEmployee('EMPLOYEE-AAA');
  let storeState: EmployeesPartialState;

  beforeEach(() => {
    storeState = {
      [EMPLOYEES_FEATURE_KEY]: {
        paginatedList: {
          data: [
            employee,
            createEmployee('EMPLOYEE-BBB'),
            createEmployee('EMPLOYEE-CCC')
          ],
          meta: {}
        },
        selected: employee,
        error: ERROR_MSG,
        loaded: true
      }
    };
  });

  describe('Employees Selectors', () => {
    it('getSelectedEmployee() should return the selected Entity', () => {
      const result = employeesQuery.getSelectedEmployee(storeState);

      expect(result).toEqual(employee);
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = employeesQuery.getLoaded(storeState);

      expect(result).toBe(true);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = employeesQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
