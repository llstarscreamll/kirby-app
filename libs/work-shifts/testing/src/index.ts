import * as faker from 'faker';
import { WorkShiftInterface } from '@kirby/work-shifts/util';

export const WORK_SHIFT_MOCK: WorkShiftInterface = {
  id: '1',
  name: '2-10',
  grace_minutes_before_start_times: 10,
  grace_minutes_after_start_times: 10,
  grace_minutes_before_end_times: 10,
  grace_minutes_after_end_times: 10,
  meal_time_in_minutes: 45,
  min_minutes_required_to_discount_meal_time: 60 * 8,
  time_zone: 'UTC',
  applies_on_days: [1, 2, 3, 4, 5],
  time_slots: [{ start: '14:00', end: '22:00' }],
  created_at: '1999-01-01 01:00:00',
  updated_at: '1999-01-01 01:00:00',
  deleted_at: null,
};

export function createWorkShift(id?: string, overrides: any = {}): WorkShiftInterface {
  let start = faker.random.number(23);
  let end = faker.random.number({ min: start, max: 24 });

  return {
    id: id || faker.random.uuid(),
    name: faker.random.word(),
    grace_minutes_before_start_times: 10,
    grace_minutes_after_start_times: 10,
    grace_minutes_before_end_times: 10,
    grace_minutes_after_end_times: 10,
    meal_time_in_minutes: faker.random.number(60),
    min_minutes_required_to_discount_meal_time: faker.random.number(60 * 10),
    applies_on_days: [1, 2, 3, 4, 5],
    time_zone: 'UTC',
    time_slots: [
      {
        start: start + ':' + faker.random.number(60),
        end: end + ':' + faker.random.number(60),
      },
    ],
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
    ...overrides,
  };
}
