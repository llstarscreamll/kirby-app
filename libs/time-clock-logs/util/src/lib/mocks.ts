import * as faker from "faker";

import { createUser } from "@llstarscreamll/users/util";
import { createEmployee } from "@llstarscreamll/employees/util";
import { createNovelty } from "@llstarscreamll/novelties/utils";
import { TimeClockLogModel } from './time-clock-log.model';
import { WORK_SHIFT_MOCK, createWorkShift } from "@llstarscreamll/work-shifts/util";

const employee = createEmployee('E-1');
const registrarIn = createUser('R-1');
const registrarOut = createUser('R-2');

export const TIME_CLOCK_LOG_MOCK: TimeClockLogModel = TimeClockLogModel.fromJson({
  id: '1',
  employee_id: employee.id,
  employee: employee,
  work_shift_id: WORK_SHIFT_MOCK.id,
  work_shift: WORK_SHIFT_MOCK,
  checked_in_at: '1999-01-01 01:00:00',
  checked_out_at: '1999-01-01 02:00:00',
  checked_in_by_id: registrarIn.id,
  checked_in_by: registrarIn,
  checked_out_by_id: registrarOut.id,
  checked_out_by: registrarOut,
  created_at: '1999-01-01 01:00:00',
  updated_at: '1999-01-01 01:00:00',
  deleted_at: null
});

export function createTimeClockLog(id?: string, name: string = null): TimeClockLogModel {
  id = id || faker.random.uuid();
  let employee = createEmployee();
  const registrarIn = createUser();
  const registrarOut = createUser();
  const workShift = createWorkShift();
  const novelties = [
    createNovelty(null, { time_clock_log_id: id }),
    createNovelty(null, { time_clock_log_id: id }),
  ];

  return TimeClockLogModel.fromJson({
    id: id,
    employee_id: employee.id,
    employee: employee,
    work_shift_id: workShift.id,
    work_shift: workShift,
    checked_in_at: faker.date.past(),
    checked_out_at: faker.date.past(),
    checked_in_by_id: registrarIn.id,
    checked_in_by: registrarIn,
    checked_out_by_id: registrarOut.id,
    checked_out_by: registrarOut,
    novelties: novelties,
    novelties_count: novelties.length,
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  });
}