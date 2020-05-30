import * as faker from 'faker';
import { NoveltyTypeInterface, DayType } from '@kirby/novelty-types/data';

export function createNoveltyType(id?: string): NoveltyTypeInterface {
  const name = faker.random.word();
  let start = faker.random.number(12);
  let end = faker.random.number({ min: start, max: 23 });
  start = start
    .toString()
    .padStart(2, '0')
    .padEnd(5, ':00');
  end = end
    .toString()
    .padStart(2, '0')
    .padEnd(5, ':00');

  return {
    id: id || faker.random.uuid(),
    code: 'NT-' + name,
    name: name,
    context_type: faker.random.arrayElement(['logging_work_shift_time', null]),
    apply_on_days_of_type: faker.random.arrayElement(DayType),
    apply_on_time_slots: [{ start, end }],
    operator: null,
    requires_comment: faker.random.arrayElement([true, false]),
    created_at: faker.date.past(),
    updated_at: faker.date.past()
  };
}
