import * as faker from "faker";

import { createUser } from "@llstarscreamll/users/util";
import { createEmployee } from "@llstarscreamll/employees/util";
import { TimeClockLogInterface } from './time-clock-log.interface';
import { WORK_SHIFT_MOCK, createWorkShift } from "@llstarscreamll/work-shifts/util";

const employee = createEmployee('E-1');
const registrarIn = createUser('R-1');
const registrarOut = createUser('R-2');

export const TIME_CLOCK_LOG_MOCK: TimeClockLogInterface = {
  id: '1',
  employee_id: employee.id,
  employee: employee,
  work_shift_id: WORK_SHIFT_MOCK.id,
  work_shift: WORK_SHIFT_MOCK,
  checked_in_at: '1999-01-01 01:00:00',
  checked_out_at: '1999-01-01 02:00:00',
  checked_in_by_id: registrarIn.id,
  checkedInBy: registrarIn,
  checked_out_by_id: registrarOut.id,
  checkedOutBy: registrarOut,
  created_at: '1999-01-01 01:00:00',
  updated_at: '1999-01-01 01:00:00',
  deleted_at: null
};

export function createTimeClockLog(id?: string, name: string = null): TimeClockLogInterface {
  let employee = createEmployee();
  const registrarIn = createUser();
  const registrarOut = createUser();
  const workShift = createWorkShift();

  return {
    id: id || faker.random.uuid(),
    employee_id: employee.id,
    employee: employee,
    work_shift_id: workShift.id,
    work_shift: workShift,
    checked_in_at: faker.date.past(),
    checked_out_at: faker.date.past(),
    checked_in_by_id: registrarIn.id,
    checkedInBy: registrarIn,
    checked_out_by_id: registrarOut.id,
    checkedOutBy: registrarOut,
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  };
}