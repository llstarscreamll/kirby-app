import * as faker from "faker";
import { WorkShiftInterface } from '@llstarscreamll/work-shifts/util';

export const WORK_SHIFT_MOCK: WorkShiftInterface = {
  id: '1',
  name: '2-10',
  start_time: '14:00',
  end_time: '22:00',
  grace_minutes_for_start_time: 10,
  grace_minutes_for_end_time: 15,
  meal_start_time: '14:00',
  meal_time_in_minutes: 45,
  min_minutes_required_to_discount_meal_time: 60 * 8,
  created_at: '1999-01-01 01:00:00',
  updated_at: '1999-01-01 01:00:00',
  deleted_at: null
};

export function createWorkShift(id: string, name: string = null): WorkShiftInterface {
  let start;
  let end;

  return {
    id,
    name: name || faker.random.word(),
    start_time: (start = faker.random.number(24)) + ':' + faker.random.number(60),
    end_time: (end = faker.random.number({ min: start, max: 24 })) + ':' + faker.random.number(60),
    grace_minutes_for_start_time: faker.random.number(30),
    grace_minutes_for_end_time: faker.random.number(30),
    meal_start_time: faker.random.number({ min: start, max: end }) + ':' + faker.random.number(60),
    meal_time_in_minutes: faker.random.number(60),
    min_minutes_required_to_discount_meal_time: faker.random.number(60 * 10),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  };
}