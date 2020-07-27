import * as faker from 'faker';
import { NoveltyModel } from '@kirby/novelties/data';

import { createEmployee } from '@kirby/employees/testing';
import { createNoveltyType } from '@kirby/novelty-types/testing';

export function createNovelty(id?: string, data: any = null): NoveltyModel {
  const employee = createEmployee();
  const noveltyType = createNoveltyType();

  return NoveltyModel.fromJson({
    id: id || faker.random.uuid(),
    time_clock_log_id: null,
    employee_id: employee.id,
    novelty_type_id: noveltyType.id,
    novelty_type: noveltyType,
    start_at: '1999-01-01 01:00:00',
    end_at: '1999-01-01 02:00:00',
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
    ...data,
  });
}
