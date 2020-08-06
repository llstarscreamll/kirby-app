import {
  EMPLOYEES_FEATURE_KEY,
  EmployeesPartialState,
} from './employees.reducer';
import { emptyPagination, LoadStatuses } from '@kirby/shared';
import { employeesQuery } from './employees.selectors';
import { createEmployee } from '@kirby/employees/testing';

describe('Employees Selectors', () => {
  const ERROR_MSG = { message: 'Crap!!', ok: false };
  const employee = createEmployee('EMPLOYEE-AAA');
  let storeState: EmployeesPartialState;

  beforeEach(() => {
    storeState = {
      [EMPLOYEES_FEATURE_KEY]: {
        paginatedList: {
          ...emptyPagination(),
          data: [
            employee,
            createEmployee('EMPLOYEE-BBB'),
            createEmployee('EMPLOYEE-CCC'),
          ],
        },
        selected: employee,
        error: ERROR_MSG,
        paginatingStatus: LoadStatuses.Completed,
        selectingStatus: LoadStatuses.Completed,
        creatingStatus: null,
        updatingStatus: LoadStatuses.Completed,
      },
    };
  });

  describe('Employees Selectors', () => {
    it('getSelectedEmployee() should return the selected Entity', () => {
      const result = employeesQuery.getSelectedEmployee(storeState);

      expect(result).toEqual(employee);
    });

    it("getLoaded() should return the current 'loaded' status", () => {
      const result = employeesQuery.getPaginatingStatus(storeState);

      expect(result).toBe(LoadStatuses.Completed);
    });

    it("getError() should return the current 'error' storeState", () => {
      const result = employeesQuery.getError(storeState);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
