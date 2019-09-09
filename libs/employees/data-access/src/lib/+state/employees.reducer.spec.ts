import { SearchEmployeesOk } from './employees.actions';
import {
  EmployeesState,
  initialState,
  employeesReducer
} from './employees.reducer';
import { createEmployee } from '@llstarscreamll/employees/util';

describe('Employees Reducer', () => {
  const getEmployeesId = it => it['id'];

  beforeEach(() => {});

  describe('valid Employees actions ', () => {
    it('should return set the list of known Employees', () => {
      const employees = [
        createEmployee('PRODUCT-AAA'),
        createEmployee('PRODUCT-zzz')
      ];
      const action = new SearchEmployeesOk(employees);
      const result: EmployeesState = employeesReducer(initialState, action);
      const selId: string = getEmployeesId(result.paginatedList[1]);

      expect(result.loaded).toBe(true);
      expect(result.paginatedList.length).toBe(2);
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
