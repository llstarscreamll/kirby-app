import { Action, createActionGroup, emptyProps } from '@ngrx/store';

import { Pagination, ApiError } from '@kirby/shared';
import { EmployeeInterface } from '@kirby/employees/util';

export const employeesActions = createActionGroup({
  source: 'Employees',
  events: {
    search: (payload: any = {}) => ({ payload }),
    'search ok': (payload: Pagination<EmployeeInterface>) => ({ payload }),
    'search error': (payload: any) => ({ payload }),

    get: (payload: string) => ({ payload }),
    'get ok': (payload: EmployeeInterface) => ({ payload }),
    'get error': (payload: ApiError) => ({ payload }),

    create: (payload: { employeeId: string; data: any }) => ({ payload }),
    'create ok': (payload: EmployeeInterface) => ({ payload }),
    'create error': (payload: ApiError) => ({ payload }),

    update: (payload: any) => ({ payload }),
    'update ok': (payload: EmployeeInterface) => ({ payload }),
    'update error': (payload: ApiError) => ({ payload }),

    'search roles': (payload: any = {}) => ({ payload }),
    'search roles ok': (payload: Pagination<any>) => ({ payload }),
    'search roles error': (payload: any) => ({ payload }),
  },
});
