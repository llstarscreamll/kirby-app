import { SearchEmployeesOk } from './employees.actions';
import {
  EmployeesState,
  Entity,
  initialState,
  employeesReducer
} from './employees.reducer';

describe('Employees Reducer', () => {
  const getEmployeesId = it => it['id'];
  let createEmployees;

  beforeEach(() => {
    createEmployees = (id: string, name = ''): Entity => ({
      id,
      name: name || `name-${id}`
    });
  });

  describe('valid Employees actions ', () => {
    it('should return set the list of known Employees', () => {
      const employees = [
        createEmployees('PRODUCT-AAA'),
        createEmployees('PRODUCT-zzz')
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
