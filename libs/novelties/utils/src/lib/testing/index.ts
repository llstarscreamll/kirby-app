import * as faker from 'faker';
import { NoveltyModel } from '@kirby/novelties/data';

import { createEmployee } from '@kirby/employees/util';
import { createNoveltyType } from '@kirby/novelty-types/utils';
import { createTimeClockLog } from '@kirby/time-clock-logs/util';

export function createNovelty(id?: string, data: any = null): NoveltyModel {
  const employee = createEmployee();
  const noveltyType = createNoveltyType();

  return NoveltyModel.fromJson({
    id: id || faker.random.uuid(),
    time_clock_log_id: data ? data.time_clock_log_id : createTimeClockLog().id,
    employee_id: employee.id,
    novelty_type_id: noveltyType.id,
    novelty_type: noveltyType,
    total_time_in_minutes: faker.random.number,
    created_at: faker.date.past(),
    updated_at: faker.date.past()
  });
}
